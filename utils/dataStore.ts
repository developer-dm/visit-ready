/*
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buffer } from 'buffer';
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import crypto from "react-native-quick-crypto";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const isWeb = Platform.OS === "web";

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

type SignupData = {
    firstName: string;
    lastName: string;
    DOB: Date | null;
    sex: string | null;
    acceptedTerms: boolean;
};

type Appointment = {
    id: string;
    appointmentType: string | null;
    appointmentDate: Date | null;
    provider: string;
    mainConcern: string;
    concernStart: string | null;
    concernSeverity: string | null;
    visitGoal: string;
    specificWorries: string;
    miscDiscussion: string;
};

type UserState = {
    signup: SignupData | null;
    appointments: Appointment[];

    _hasHydrated: boolean;
    _dataHasHydrated: boolean;

    addSignupData: (data: SignupData) => void;
    resetSignup: () => void;
    addAppointment: (appointment: Appointment) => void;
    resetAppointments: () => void;
    setDataHasHydrated: (value: boolean) => void;
};

export const useDataStore = create(
    persist<Pick<UserState, 'signup' | 'appointments' | '_dataHasHydrated' | 'addSignupData' | 'resetSignup' | 'addAppointment' | 'resetAppointments' | 'setDataHasHydrated'>>(
        (set, get) => ({
            signup: null,
            appointments: [],
            _dataHasHydrated: false,

            addSignupData: (data: SignupData) => set({ signup: data }),
            resetSignup: () => set({ signup: null }),

            addAppointment: (appointment: Appointment) =>
                set({ appointments: [...get().appointments, appointment] }),

            resetAppointments: () => set({ appointments: [] }),

            setDataHasHydrated: (value: boolean) => set({ _dataHasHydrated: value }),
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

export const useUserStore = () => {
    const data = useDataStore();

    return {
        signup: data.signup,
        appointments: data.appointments,
        _dataHasHydrated: data._dataHasHydrated,

        addSignupData: data.addSignupData,
        resetSignup: data.resetSignup,
        addAppointment: data.addAppointment,
        resetAppointments: data.resetAppointments,
        setDataHasHydrated: data.setDataHasHydrated,
    };
};
*/

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const isWeb = Platform.OS === "web";

class EncryptionService {
    private static ENCRYPTION_KEY = "app_encryption_key";

    static async getOrCreateEncryptionKey(): Promise<string> {
        try {
            let key = await SecureStore.getItemAsync(this.ENCRYPTION_KEY);
            if (!key) {
                const randomBytes = await Crypto.getRandomBytesAsync(32);
                key = Array.from(randomBytes, byte => byte.toString(16).padStart(2, '0')).join('');
                await SecureStore.setItemAsync(this.ENCRYPTION_KEY, key);
            }
            return key;
        } catch (error) {
            console.error("Error managing encryption key:", error);
            throw error;
        }
    }

    static async encrypt(data: string): Promise<string> {
        try {
            const key = await this.getOrCreateEncryptionKey();
            const result = await this.simpleEncrypt(data, key);
            return result;
        } catch (error) {
            console.error("Error encrypting data:", error);
            throw error;
        }
    }

    static async decrypt(encryptedData: string): Promise<string> {
        try {
            const key = await this.getOrCreateEncryptionKey();
            const result = await this.simpleDecrypt(encryptedData, key);
            return result;
        } catch (error) {
            console.error("Error decrypting data:", error);
            throw error;
        }
    }

    private static async simpleEncrypt(data: string, key: string): Promise<string> {
        const dataBytes = new TextEncoder().encode(data);
        const keyBytes = new TextEncoder().encode(key);
        const encrypted = new Uint8Array(dataBytes.length);

        for (let i = 0; i < dataBytes.length; i++) {
            encrypted[i] = dataBytes[i] ^ keyBytes[i % keyBytes.length];
        }

        return Array.from(encrypted, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    private static async simpleDecrypt(encryptedHex: string, key: string): Promise<string> {
        const encryptedBytes = new Uint8Array(encryptedHex.match(/.{2}/g)!.map(byte => parseInt(byte, 16)));
        const keyBytes = new TextEncoder().encode(key);
        const decrypted = new Uint8Array(encryptedBytes.length);

        for (let i = 0; i < encryptedBytes.length; i++) {
            decrypted[i] = encryptedBytes[i] ^ keyBytes[i % keyBytes.length];
        }

        return new TextDecoder().decode(decrypted);
    }
}

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

// Types
type SignupData = {
    firstName: string;
    lastName: string;
    DOB: Date | null;
    sex: string;
    language: string;
    notifications: boolean;
    acceptedTerms: boolean;
};

type Appointment = {
    id: string;
    appointmentType: string;
    appointmentDate: Date | null;
    provider: string;
    mainConcern: string;
    concernStart: string;
    concernSeverity: string;
    remedies: string;
    visitGoal: string;
    specificWorries: string;
    miscDiscussion: string;
    question: string;
};

// Combined User State
type UserState = {
    // App data
    signup: SignupData | null;
    appointments: Appointment[];

    // Hydration
    _hasHydrated: boolean;
    _dataHasHydrated: boolean;

    // App data actions
    addSignupData: (data: SignupData) => void;
    resetSignup: () => void;
    addAppointment: (appointment: Appointment) => void;
    resetAppointments: () => void;
    setDataHasHydrated: (value: boolean) => void;
};

// App data store
export const useDataStore = create(
    persist<Pick<UserState, 'signup' | 'appointments' | '_dataHasHydrated' | 'addSignupData' | 'resetSignup' | 'addAppointment' | 'resetAppointments' | 'setDataHasHydrated'>>(
        (set, get) => ({
            signup: null,
            appointments: [],
            _dataHasHydrated: false,

            addSignupData: (data: SignupData) => set({ signup: data }),
            resetSignup: () => set({ signup: null }),

            addAppointment: (appointment: Appointment) =>
                set({ appointments: [...get().appointments, appointment] }),

            resetAppointments: () => set({ appointments: [] }),

            setDataHasHydrated: (value: boolean) => set({ _dataHasHydrated: value }),
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

// Combined hook
export const useUserStore = () => {
    const data = useDataStore();

    return {
        // App data
        signup: data.signup,
        appointments: data.appointments,
        _dataHasHydrated: data._dataHasHydrated,

        // Data actions
        addSignupData: data.addSignupData,
        resetSignup: data.resetSignup,
        addAppointment: data.addAppointment,
        resetAppointments: data.resetAppointments,
        setDataHasHydrated: data.setDataHasHydrated,
    };
};