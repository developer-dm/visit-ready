import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
//import * as LocalAuthentication from 'expo-local-authentication';
//import * as SecureStore from 'expo-secure-store';
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, } from "react-native";

export default function login() {
    const router = useRouter();
    const [authMethod, setAuthMethod] = useState("");
    const [error, setError] = useState("");

    const handleSelection = () => {

    };

    const handleNext = () => {
        if (authMethod) {
            router.replace("/(tabs)/dashboard")
        } else {
            setError("Please select an authentication method")
        };
    };

    return (
        <ThemedView type="container">
            <Button type="return" onPress={() => { router.back() }} />
            <MaterialIcons size={125} name="security" color={"#004678"} style={styles.icon} />
            <ThemedText type="title">Step 3</ThemedText>
            <ThemedText type="subtitle">Please select your authentication method</ThemedText>
            <Divider />
            <ThemedView type="card">
                <ThemedText type="overhead">Option 1</ThemedText>
                <Button type={"light"} onPress={handleSelection} style={{ marginTop: 10, height: 40 }}>
                    <MaterialIcons size={25} name="face" color={"#323232ff"} style={styles.buttonIcon} />
                    <ThemedText type="default" style={{ color: "#323232ff" }}>Face ID</ThemedText>
                </Button>
                <ThemedText type="overhead" style={{ marginTop: 10 }}>Option 2</ThemedText>
                <Button type={"light"} onPress={handleSelection} style={{ marginTop: 10, height: 40 }}>
                    <MaterialIcons size={25} name="dialpad" color={"#323232ff"} style={styles.buttonIcon} />
                    <ThemedText type="default" style={{ color: "#323232ff" }}>Passcode</ThemedText>
                </Button>
            </ThemedView>
            {error ? <ThemedText type="error" style={{ marginTop: 10 }}>{error}</ThemedText> : null}
            <Button type={"dark"} onPress={handleNext} style={{ marginTop: 30 }}>
                <ThemedText type="default" style={{ color: "#ffffffff" }}>Finish</ThemedText>
            </Button>
            <Footer />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    buttonIcon: {
        position: "absolute",
        left: 15,
    },
    icon: {
        marginBottom: 10,
    },
});
