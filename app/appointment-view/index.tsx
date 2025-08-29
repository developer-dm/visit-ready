import { FormatDateString } from "@/components/DatePicker";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { RouteProp, useRoute } from '@react-navigation/native';
import { ScrollView, StyleSheet, View } from "react-native";

type RouteParams = {
    data: string;
};

export default function PrepFinalScreen() {
    const labels: Record<string, string> = {
        id: "Appointment ID",
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

    const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
    const appointment = route.params?.data ? JSON.parse(route.params.data) : null;

    if (!appointment) return (
        <View style={styles.container}>
            <ThemedText type="error">No Appointment Found.</ThemedText>
        </View>
    );

    return (
        <View style={styles.container}>
            <ThemedView type="card">
                <ThemedText type="subtitle" style={styles.subtitle}>Appointment Data</ThemedText>
                <ScrollView style={styles.scrollContainer}>
                    {Object.entries(appointment).map(([key, value]) => {
                        if (typeof value === "function" || key === "id") return null;

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
            </ThemedView>
            <ThemedView type="card" style={styles.questionsCard}>
                <ThemedText type="subtitle" style={styles.subtitle}>Personalized Questions</ThemedText>
                <ScrollView style={styles.questionScrollContainer}>

                </ScrollView>
            </ThemedView>
            <View style={styles.label}>
                <ThemedText style={styles.labelTitle}>Appointment ID: </ThemedText>
                <ThemedText style={styles.labelValue}>{appointment.id || "Error"}</ThemedText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    scrollContainer: {
        width: "100%",
        maxHeight: 350,
    },
    questionScrollContainer: {
        width: "100%",
        maxHeight: 150,
    },
    keyView: {
        width: "100%"
    },
    overhead: {
        marginBottom: 5,
    },
    questionsCard: {
        marginTop: 15,
    },
    default: {
        marginBottom: 5,
        textAlign: "left",
        color: "#0095ffff",
        width: "100%",
    },
    label: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        marginTop: 10,
    },
    labelTitle: {
        fontWeight: "600",
        fontSize: 7,
        textAlign: "left",
        color: "#FFFFFF",
    },
    labelValue: {
        fontSize: 8,
        fontWeight: "500",
        textAlign: "left",
        color: "#B0B0B0",
    },
});
