import * as LocalAuthentication from "expo-local-authentication";
import { useAuthStore } from "./authStore";

export const authenticateWithBiometrics = async (): Promise<boolean> => {
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

export const checkAuthenticationCapabilities = async () => {
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
            } else {
                return 'none'
            }
        }
    } catch (error) {
        console.error('Error checking authentication capabilities:', error);
        return 'none'
    }
};

export function logOut() {
    useAuthStore.getState().logOut();
}
