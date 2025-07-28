import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function about() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.background}>
                <Image source={require("@/assets/images/about.png")} style={styles.icon} />
                <Text style={styles.title}>About</Text>
                <View style={styles.divider} />
                <Text style={styles.subtitle}>What is Visit Ready?</Text>
                <Text style={styles.text}>
                    Visit Ready is a mobile app designed to help you prepare for medical appointments ahead of visits.
                </Text>
                <Text style={styles.subtitle}>Features</Text>
                <Text style={styles.text}>
                    • Symptom Input: Easily enter and track current symptoms with guided prompts
                    {"\n"}• Question Generation: Get tailored questions to ask your doctor based on your symptoms
                    {"\n"}• Visit Summary: Create a concise, clinician-friendly summary of your health concerns
                    {"\n"}• Secure Sharing: Send your summary and questions securely to your healthcare provider before your appointment
                    {"\n"}• Appointment Reminders: Stay on track with notifications and prep tips
                </Text>
                <Text style={styles.subtitle}>Credits</Text>
                <Text style={styles.creditText}>
                    By: Dakota M.
                </Text>
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>Visit Ready | v1.0</Text>
                </View>
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
    divider: {
        backgroundColor: "#ccc",
        height: 1,
        width: "100%",
        marginTop: 20,
        marginBottom: 30,
    },
    title: {
        fontSize: 48,
        fontWeight: "bold",
        fontFamily: "Sans-serif",
        textAlign: "center",
        color: "#004678",
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        fontFamily: "Sans-serif",
        fontWeight: "bold",
        color: "#000000ff",
        margin: 10,
    },
    icon: {
        width: 100,
        height: 100,
        marginBottom: 10,
        tintColor: "#004678"
    },
    text: {
        fontSize: 12,
        textAlign: "left",
        fontFamily: "Sans-serif",
        fontWeight: "semibold",
        color: "#323232ff",
    },
    creditText: {
        fontSize: 14,
        textAlign: "left",
        fontFamily: "Sans-serif",
        fontWeight: "bold",
        color: "#323232ff",
    },
    footerContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 4,
        width: "100%",
    },
    footerText: {
        fontSize: 12,
        textAlign: "center",
        fontFamily: "Sans-serif",
        fontWeight: "medium",
        color: "#000000",
    },
});
