import useAuthStore from '@/stores/authStore';
import * as LocalAuthentication from "expo-local-authentication";

// Authenticate User
const authenticateWithBiometrics = async () => {
    try {
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Authenticate to continue",
            fallbackLabel: "Use Passcode",
            disableDeviceFallback: false,
        });

        if (result.success) {
            useAuthStore.getState().logIn();
            return true;
        }

        return false;
    } catch (error) {
        console.error("Biometric auth error:", error);
        return false;
    }
}

// Check authentication methods
const checkAuthenticationCapabilities = async () => {
    try {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();

        if (!hasHardware) {
            return 'none'
        }

        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (isEnrolled) {
            const authTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

            if ( // Has biometrics
                authTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT) ||
                authTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION) ||
                authTypes.includes(LocalAuthentication.AuthenticationType.IRIS)) {
                return 'biometric'
            } else {
                return 'passcode'
            }
        } else {
            const securityLevel = await LocalAuthentication.getEnrolledLevelAsync();

            if (securityLevel === LocalAuthentication.SecurityLevel.SECRET) { // Has password
                return 'passcode'
            } else { // No auth method
                return 'none'
            }
        }
    } catch (error) {
        console.error('Error checking authentication capabilities:', error);
        return 'none'
    }
};

const logOut = () => {
    useAuthStore.getState().logOut();
}

export { authenticateWithBiometrics, checkAuthenticationCapabilities, logOut };

