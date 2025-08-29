import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from "expo-crypto";

export const saveData = async (key: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
        console.log(`Data saved under key: ${key}`);
    } catch (error) {
        console.error('Error saving data: ', error);
    }
};

export const getData = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error('Error reading data: ', error);
        return null;
    }
};

export const saveAppointment = async (newAppointment: Record<string, any>) => {
    try {
        const jsonValue = await AsyncStorage.getItem("user:appointments");
        const appointments = jsonValue ? JSON.parse(jsonValue) : [];

        appointments.push({ id: Crypto.randomUUID(), ...newAppointment });

        await AsyncStorage.setItem("user:appointments", JSON.stringify(appointments));
    } catch (e) {
        console.error("Error saving appointment", e);
    }
};

export const getAppointments = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem("user:appointments");
        return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Error loading appointments", e);
        return [];
    }
};

export const removeData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log(`Data removed for key: ${key}`);
    } catch (error) {
        console.error('Error removing data: ', error);
    }
};
