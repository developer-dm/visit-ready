import { Button } from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function PrepThirdScreen() {
    const router = useRouter()

    const handleNext = () => {
        router.push("/prep/modal/final")
    };

    return (
        <View style={styles.container}>
            <ThemedText type="title" style={styles.title}>Continued</ThemedText>
            <ThemedText type="subtitle" style={styles.subtitle}>Please answer the questions below</ThemedText>
            <ThemedView type="card">
                <ThemedText type="overhead">Is it constant or does it come and go?</ThemedText>
                <ThemedText type="overhead">Does anything make it better or worse?</ThemedText>
                <ThemedText type="overhead">Have you tried any treatments?</ThemedText>
                <Button onPress={handleNext} type="dark" style={{ marginTop: 30 }}>
                    <ThemedText type="default" style={{ color: "#fff" }}>Next</ThemedText>
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
        padding: 10,
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
