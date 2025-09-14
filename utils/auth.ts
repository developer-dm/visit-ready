import * as LocalAuthentication from "expo-local-authentication";
import { useAuthStore } from "./authStore";

export async function authenticateWithBiometrics(): Promise<boolean> {
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

export function logOut() {
    useAuthStore.getState().logOut();
}
