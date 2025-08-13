import { Button } from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function PrepFinalScreen() {
    const router = useRouter();

    const handleNext = () => {
        router.dismissTo("/(tabs)")
    };

    return (
        <View style={styles.container}>
            <ThemedText type="title" style={styles.title}>Questions</ThemedText>
            <ThemedText type="subtitle" style={styles.subtitle}>Generating questions...</ThemedText>
            <ThemedView type="card">
                <Button onPress={handleNext} type="dark" style={{ marginTop: 30 }}>
                    <ThemedText type="default" style={{ color: "#fff" }}>Finish</ThemedText>
                </Button>
            </ThemedView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    title: {
        position: "absolute",
        top: 40
    },
    subtitle: {
        position: "absolute",
        top: 100
    },
});
