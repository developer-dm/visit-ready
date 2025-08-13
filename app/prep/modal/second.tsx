import { Button } from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function PrepSecondScreen() {
    const router = useRouter();

    const handleNext = () => {
        router.push("/prep/modal/third")
    };

    return (
        <View style={styles.container}>
            <ThemedText type="title" style={styles.title}>Concerns</ThemedText>
            <ThemedText type="subtitle" style={styles.subtitle}>Please answer the questions below</ThemedText>
            <ThemedView type="card">
                <ThemedText type="overhead">What's the main health issue or concern you'd like to discuss?</ThemedText>
                <ThemedText type="overhead">When did this start?</ThemedText>
                <ThemedText type="overhead">How would you rate the severity from 1-10?</ThemedText>
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
