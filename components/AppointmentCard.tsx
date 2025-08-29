import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, View } from "react-native";
import { FormatDateString } from "./DatePicker";

type AppointmentCardProps = {
    appointmentType: string;
    appointmentDate: Date;
    provider: string;
    mainConcern: string;
    id: string;
};

export default function AppointmentCard({
    appointmentType,
    appointmentDate,
    provider,
    mainConcern,
    id,
}: AppointmentCardProps) {
    return (
        <ThemedView type="appointmentCard">
            <View style={styles.headerRow}>
                <ThemedText type="default" style={styles.appointmentType}>
                    {appointmentType || "Appointment"}
                </ThemedText>
                <MaterialIcons name="event-note" size={22} color="#0095ffff" />
            </View>

            <View style={styles.label}>
                <ThemedText style={styles.labelTitle}>Date: </ThemedText>
                <ThemedText style={styles.labelValue}>{appointmentDate ? FormatDateString(appointmentDate) : "Not Provided"}</ThemedText>
            </View>

            <View style={styles.label}>
                <ThemedText style={styles.labelTitle}>Provider: </ThemedText>
                <ThemedText style={styles.labelValue}>{provider || "Not Provided"}</ThemedText>
            </View>

            <View style={styles.label}>
                <ThemedText style={styles.labelTitle}>Main Concern: </ThemedText>
                <ThemedText style={styles.labelValue}>{mainConcern || "Not Provided"}</ThemedText>
            </View>

            <ThemedText type="default" style={styles.idText}>
                ID: {id || "Error Loading ID"}
            </ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    appointmentType: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0095ffff",
        marginRight: 10,
    },
    label: {
        flexDirection: "row",
        width: "100%",
        marginBottom: 8,
    },
    labelTitle: {
        fontWeight: "600",
        fontSize: 14,
        textAlign: "left",
        color: "#B0B0B0",
    },
    labelValue: {
        fontSize: 15,
        fontWeight: "500",
        textAlign: "left",
        color: "#FFFFFF",
    },
    idText: {
        marginTop: 14,
        fontSize: 8,
        color: "#888",
        fontStyle: "italic",
        textAlign: "left",
        width: "100%",
        alignSelf: "flex-end",
    },
});
