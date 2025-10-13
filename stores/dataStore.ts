import { AppointmentData, CompletionData, SignupData, UserDataStore } from "@/types/models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const isWeb = Platform.OS === "web";

/*
// Production Storage

import { Buffer } from 'buffer';
import crypto from "react-native-quick-crypto";

// Production
class EncryptionService {
    private static ENCRYPTION_KEY = "app_encryption_key";
    private static IV_LENGTH = 16;
    private static TAG_LENGTH = 16;

    static async getOrCreateEncryptionKey(): Promise<Buffer> {
        try {
            let key = await SecureStore.getItemAsync(this.ENCRYPTION_KEY);
            if (!key) {
                const randomBytes = crypto.randomBytes(32);
                key = randomBytes.toString('hex');
                await SecureStore.setItemAsync(this.ENCRYPTION_KEY, key);
            }
            return Buffer.from(key, 'hex');
        } catch (error) {
            console.error("Error managing encryption key:", error);
            throw error;
        }
    }

    static async encrypt(data: string): Promise<string> {
        try {
            const key = await this.getOrCreateEncryptionKey();
            const result = await this.aesEncrypt(data, key);
            return result;
        } catch (error) {
            console.error("Error encrypting data:", error);
            throw error;
        }
    }

    static async decrypt(encryptedData: string): Promise<string> {
        try {
            const key = await this.getOrCreateEncryptionKey();
            const result = await this.aesDecrypt(encryptedData, key);
            return result;
        } catch (error) {
            console.error("Error decrypting data:", error);
            throw error;
        }
    }

    private static async aesEncrypt(data: string, key: Buffer): Promise<string> {
        const iv = crypto.randomBytes(this.IV_LENGTH);
        const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

        let encrypted = cipher.update(data, 'utf8');
        encrypted = Buffer.concat([encrypted, cipher.final()]);

        const authTag = cipher.getAuthTag();

        const result = Buffer.concat([iv, encrypted, authTag]).toString('hex');

        return result;
    }

    private static async aesDecrypt(encryptedHex: string, key: Buffer): Promise<string> {
        const encryptedBuffer = Buffer.from(encryptedHex, 'hex');

        const iv = encryptedBuffer.subarray(0, this.IV_LENGTH);
        const authTag = encryptedBuffer.subarray(-this.TAG_LENGTH);
        const encryptedData = encryptedBuffer.subarray(this.IV_LENGTH, -this.TAG_LENGTH);

        const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(encryptedData);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString('utf8');
    }
}

// Production
const createEncryptedAsyncStorage = () => ({
    setItem: async (key: string, value: string) => {
        try {
            const encryptedValue = await EncryptionService.encrypt(value);
            await AsyncStorage.setItem(key, encryptedValue);
        } catch (error) {
            console.error("Error setting encrypted item:", error);
            throw error;
        }
    },
    getItem: async (key: string) => {
        try {
            const encryptedValue = await AsyncStorage.getItem(key);
            if (!encryptedValue) return null;
            return await EncryptionService.decrypt(encryptedValue);
        } catch (error) {
            console.error("Error getting encrypted item:", error);
            return null;
        }
    },
    removeItem: async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error("Error removing encrypted item:", error);
            throw error;
        }
    },
});
*/

// Development Use
const createEncryptedAsyncStorage = () => ({
    setItem: (key: string, value: string) => AsyncStorage.setItem(key, value),
    getItem: (key: string) => AsyncStorage.getItem(key),
    removeItem: (key: string) => AsyncStorage.removeItem(key),
});

export const useDataStore = create(
    persist<UserDataStore>(
        (set) => ({
            signup: null,
            appointments: {},
            completions: {},
            _dataHasHydrated: false,
            _hasHydrated: false,

            // Signup Actions
            addSignupData: (data: SignupData) =>
                set({
                    signup: data
                }),
            resetSignup: () =>
                set({
                    signup: null
                }),

            // Appointment Actions
            addAppointment: (appointment: AppointmentData, id: string) =>
                set((state) => ({
                    appointments: { ...state.appointments, [id]: appointment },
                })),
            resetAppointments: () =>
                set({
                    appointments: {}
                }),

            // Completion Actions
            addCompletion: (data: CompletionData, id: string) =>
                set((state) => ({
                    completions: { ...state.completions, [id]: data }
                })),
            resetCompletions: () =>
                set({
                    completions: {}
                }),

            // Utility Actions
            resetAll: () =>
                set({
                    completions: {}, appointments: {}, signup: null
                }),
            setDataHasHydrated: (value: boolean) =>
                set({
                    _dataHasHydrated: value
                }),
        }),
        {
            name: "data-store",
            storage: isWeb
                ? createJSONStorage(() => localStorage)
                : createJSONStorage(() => createEncryptedAsyncStorage()),
            onRehydrateStorage: () => {
                return (state) => {
                    state?.setDataHasHydrated(true);
                };
            },
        },
    ),
);
