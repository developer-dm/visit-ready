import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/constants/UserContext";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, StyleSheet, } from "react-native";

export default function Step3() {
    const router = useRouter();
    
    const { authMethod, setAuthMethod } = useUser();
    const [error, setError] = useState("");

    const handleSelection = (method: string) => {
        setAuthMethod(method);
        setError("");
    };

    const handleNext = () => {
        if (authMethod) {
            router.push("/4");
        } else {
            setError("Please select an authentication method");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ThemedView type="container">
                <Button type="return" onPress={() => { router.back() }} />
                <MaterialIcons size={125} name="security" color={"#004678"} style={styles.icon} />
                <ThemedText type="title">Step 3</ThemedText>
                <ThemedText type="subtitle">Select your authentication method</ThemedText>
                <Divider />
                <ThemedView type="card">
                    <ThemedText type="overhead">Option 1</ThemedText>
                    <Button
                        type={authMethod === "faceID" ? "selection" : "light"}
                        onPress={() => handleSelection("faceID")}
                        style={{ marginTop: 10, height: 40 }}
                    >
                        <MaterialIcons size={25} name="face" color={authMethod === "faceID" ? "#fff" : "#323232ff"} style={styles.buttonIcon} />
                        <ThemedText type="default" style={{ color: authMethod === "faceID" ? "#fff" : "#323232ff" }}>Face ID</ThemedText>
                    </Button>
                    <ThemedText type="overhead" style={{ marginTop: 10 }}>Option 2</ThemedText>
                    <Button
                        type={authMethod === "passcode" ? "selection" : "light"}
                        onPress={() => handleSelection("passcode")}
                        style={{ marginTop: 10, height: 40 }}
                    >
                        <MaterialIcons size={25} name="dialpad" color={authMethod === "passcode" ? "#fff" : "#323232ff"} style={styles.buttonIcon} />
                        <ThemedText type="default" style={{ color: authMethod === "passcode" ? "#fff" : "#323232ff" }}>Passcode</ThemedText>
                    </Button>
                </ThemedView>
                {authMethod ? <ThemedText type="default" style={{ marginTop: 10 }}>{"Selected method: " + (authMethod === "faceID" ? "Face ID" : "Passcode")}</ThemedText> : null}
                {error ? <ThemedText type="error" style={{ marginTop: 10 }}>{error}</ThemedText> : null}
                <Button type={"dark"} onPress={handleNext} style={{ marginTop: 30 }}>
                    <ThemedText type="default" style={{ color: "#ffffffff" }}>Next</ThemedText>
                </Button>
                <Footer />
            </ThemedView>
        </SafeAreaView>
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
