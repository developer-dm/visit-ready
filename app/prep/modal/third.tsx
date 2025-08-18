import { Button } from "@/components/Button";
import { Textbox } from "@/components/Textbox";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/utils/userContext";
import { useRouter } from "expo-router";
import { Alert, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView, } from "react-native-keyboard-aware-scroll-view";

export default function PrepThirdScreen() {
    const router = useRouter()

    const { prep } = useUser();

    const handleNext = () => {
        if (prep.visitGoal && prep.specificWorries) {
            router.push("/prep/modal/final")
        } else {
            Alert.alert("Error", "Invalid answer");
        }
    };

    return (
        <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="never">
            <View style={styles.container}>
                <ThemedText type="title" style={styles.title}>Concerns</ThemedText>
                <ThemedText type="subtitle" style={styles.subtitle}>Please answer the questions below</ThemedText>
                <ThemedView type="card">
                    <ThemedText type="overhead">What do you hope to get out of this visit?</ThemedText>
                    <Textbox
                        placeholder="e.g. relief from pain"
                        onChangeText={prep.setVisitGoal}
                        value={prep.visitGoal}
                        style={{ marginTop: 10 }}
                    />
                    <ThemedText type="overhead" style={{ marginTop: 10 }}>Do you have any specific worries?</ThemedText>
                    <Textbox
                        placeholder="e.g. side effects of medication"
                        onChangeText={prep.setSpecificWorries}
                        value={prep.specificWorries}
                        style={{ marginTop: 10 }}
                    />
                    <ThemedText type="overhead" style={{ marginTop: 10 }}>Anything else you want to discuss? (optional)</ThemedText>
                    <Textbox
                        placeholder="e.g. lifestyle changes"
                        onChangeText={prep.setMiscDiscussion}
                        value={prep.miscDiscussion}
                        style={{ marginTop: 10 }}
                    />
                    <Button onPress={handleNext} type="dark" style={{ marginTop: 30 }}>
                        <ThemedText type="default" style={{ color: "#fff" }}>Next</ThemedText>
                    </Button>
                </ThemedView>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 10,
    },
    title: {
        marginBottom: -5
    },
    subtitle: {
        marginBottom: 50
    },
});
