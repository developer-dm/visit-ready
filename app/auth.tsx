import { Button } from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/constants/UserContext";

import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";

export default function Step4() {
    const router = useRouter();

    const { authMethod } = useUser();
    const [error, setError] = useState("");

    const handleNext = () => {
        setError("")
        router.replace("/(tabs)/dashboard")
    };

    const tryAuthenticate = () => {

    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ThemedView type="container">
                {!error && (
                    <ThemedView type="card">
                        <ActivityIndicator size="large" color="#004678" />
                        <ThemedText type="default" style={styles.subtitle}>Authenticating...</ThemedText>
                    </ThemedView>
                )}
                {error && (
                    <ThemedView type="card">
                        <ThemedText type="error" style={{ marginTop: 10 }}>{error}</ThemedText>
                        <Button type={"dark"} onPress={tryAuthenticate} style={{ marginTop: 30 }}>
                            <ThemedText type="default" style={{ color: "#ffffffff" }}>Retry</ThemedText>
                        </Button>
                    </ThemedView>
                )}
            </ThemedView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    subtitle: {
        width: "100%",
        marginTop: 10,
    },
});
