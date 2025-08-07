import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Textbox } from "@/components/Textbox";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function signup() {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");

    const handleNext = () => {
        if (firstName && lastName) {
            setError("")
            router.push("/2")
        } else {
            setError("Invalid first or last name")
        };
    };

    return (
        <ThemedView type="container">
            <ThemedText type="title" style={styles.title}>Step 1</ThemedText>
            <ThemedText type="subtitle" style={styles.subtitle}>Please enter your name below</ThemedText>
            <ThemedView type="card">
                <ThemedText type="overhead">First Name</ThemedText>
                <Textbox
                    placeholder="John"
                    onChangeText={setFirstName}
                    style={{ marginTop: 10 }}
                />
                <ThemedText type="overhead" style={{ marginTop: 10 }}>Last Name</ThemedText>
                <Textbox
                    placeholder="Doe"
                    onChangeText={setLastName}
                    style={{ marginTop: 10 }}
                />
                {error ? <ThemedText type="error" style={{ marginTop: 10 }}>{error}</ThemedText> : null}
                <Button type={"dark"} onPress={handleNext} style={{ marginTop: 30 }}>
                    <ThemedText type="default" style={{ color: "#ffffffff" }}>Next</ThemedText>
                </Button>
            </ThemedView>
            <Footer />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    title: {
        position: "absolute",
        top: 50
    },
    subtitle: {
        position: "absolute",
        top: 105
    },
});
