import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Footer } from '@/components/Footer';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function about() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.background}>
                <Button type="return" onPress={() => { router.back() }} />
                <MaterialIcons size={125} name="info-outline" color={"#004678"} style={styles.icon} />
                <ThemedText type="title">About</ThemedText>
                <Divider />
                <ThemedView style={styles.card}>
                    <ThemedText type="subtitle" style={styles.subtitle}>What is Visit Ready?</ThemedText>
                    <ThemedText type="default" style={styles.default}>Visit Ready is a mobile app designed to help you prepare for medical appointments ahead of visits.</ThemedText>
                    <ThemedText type="subtitle" style={styles.subtitle}>Features</ThemedText>
                    <ThemedText type="default" style={styles.default}>
                        • Symptom Input: Easily enter and track current symptoms with guided prompts
                        {"\n"}• Question Generation: Get tailored questions to ask your doctor based on your symptoms
                        {"\n"}• Visit Summary: Create a concise, clinician-friendly summary of your health concerns
                        {"\n"}• Secure Sharing: Send your summary and questions securely to your healthcare provider before your appointment
                        {"\n"}• Appointment Reminders: Stay on track with notifications and prep tips
                    </ThemedText>
                    <ThemedText type="subtitle" style={styles.subtitle}>Credits</ThemedText>
                    <ThemedText type="default" style={styles.default}>By: Dakota M.</ThemedText>
                </ThemedView>
                <Footer />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    background: {
        height: "100%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
    },
    card: {
        width: "100%",
        height: "auto",
        borderRadius: 15,
        boxShadow: "0px 0px 10px #0000005c",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
    },
    icon: {
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "bold",
        margin: 10,
    },
    default: {
        fontSize: 12,
        textAlign: "left",
    },
});
