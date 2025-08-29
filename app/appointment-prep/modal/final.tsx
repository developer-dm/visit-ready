import { Button } from "@/components/Button";
import { FormatDateString } from "@/components/DatePicker";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { saveAppointment } from "@/utils/dataStore";
import { useUser } from "@/utils/userContext";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export default function PrepFinalScreen() {
    const router = useRouter();
    const { prep, clearUserContext } = useUser();

    const labels: Record<string, string> = {
        appointmentType: "Appointment Type",
        appointmentDate: "Appointment Date",
        provider: "Provider",
        mainConcern: "Main Concern",
        concernStart: "Concern Start Date",
        concernSeverity: "Severity",
        visitGoal: "Appointment Goal",
        specificWorries: "Specific Worries",
        miscDiscussion: "Other Information",
    };

    const handleNext = () => {
        saveAppointment(prep);
        clearUserContext();
        router.dismissTo("/(tabs)");
        router.replace("/question-generator");
    };

    return (
        <View style={styles.container}>
            <ThemedText type="title" style={styles.title}>Confirm</ThemedText>
            <ThemedText type="subtitle" style={styles.subtitle}>Confirm your responses below</ThemedText>
            <ThemedView type="card">
                <ScrollView style={styles.scrollContainer}>
                    {Object.entries(prep).map(([key, value]) => {
                        if (typeof value === "function") return null;

                        //special case: date
                        if (key === "appointmentDate") {
                            return (
                                <View key={key} style={styles.keyView}>
                                    <ThemedText type="overhead" style={styles.overhead}>{labels[key]}</ThemedText>
                                    <ThemedText type="default" style={styles.default}>{value ? FormatDateString(value as Date) : "Not Provided"}</ThemedText>
                                </View>
                            );
                        }

                        //default case
                        return (
                            <View key={key} style={styles.keyView}>
                                <ThemedText type="overhead" style={styles.overhead}>{labels[key]}</ThemedText>
                                <ThemedText type="default" style={styles.default}>{value as string || "Not Provided"}</ThemedText>
                            </View>
                        );
                    })}
                </ScrollView>

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
        justifyContent: "center",
        padding: 10,
    },
    scrollContainer: {
        width: "100%",
        height: 350,
    },
    keyView: {
        width: "100%"
    },
    overhead: {
        marginBottom: 5,
    },
    default: {
        marginBottom: 5,
        textAlign: "left",
        color: "#0095ffff",
        width: "100%",
    },
    title: {
        marginBottom: -5
    },
    subtitle: {
        marginBottom: 50
    },
});
