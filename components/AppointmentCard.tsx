import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { DataFormatterService } from "@/services/dataFormatter";
import { AppointmentData } from "@/types/models";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, View } from "react-native";

type AppointmentCardProps = {
    appointment: AppointmentData;
};

// Helper function to get appointment type icon
export const getAppointmentIcon = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes("new-patient")) {
        return "person-add";
    } else if (lowerType.includes("annual-physical")) {
        return "health-and-safety";
    } else if (lowerType.includes("follow-up")) {
        return "event-repeat";
    } else if (lowerType.includes("urgent-concern")) {
        return "report-problem";
    } else if (lowerType.includes("specialist") || lowerType.includes("consultation")) {
        return "psychology";
    } else if (lowerType.includes("no-response")) {
        return "question-mark";
    } else {
        return "event-note";
    }
};

export default function AppointmentCard({
    appointment,
}: AppointmentCardProps) {
    const date = appointment.appointmentDate ? new Date(appointment.appointmentDate) : new Date()

    return (
        <ThemedView type="bordered" style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
                <View style={styles.appointmentInfo}>
                    <ThemedText style={styles.doctorName} type="whitened">
                        {appointment.provider}
                    </ThemedText>
                    <ThemedText style={styles.specialty} type="greyed">
                        {DataFormatterService.toReadableString(appointment.appointmentType)}
                    </ThemedText>
                </View>
                {/* 
                <View style={styles.statusBadge}>
                    <MaterialIcons
                        size={14}
                        name="schedule"
                        color="#3b82f6"
                    />
                    <Text style={styles.statusText}>
                        Scheduled
                    </Text>
                </View>
                 */}
            </View>

            <View style={styles.appointmentDetails}>
                <View style={styles.detailRow}>
                    <MaterialIcons size={16} name="calendar-today" color="#6b7280" />
                    <ThemedText style={styles.detailText} type="greyed">
                        {DataFormatterService.FormatDateString(date)}
                    </ThemedText>
                </View>
                <View style={styles.detailRow}>
                    <MaterialIcons size={16} name="schedule" color="#6b7280" />
                    <ThemedText style={styles.detailText} type="greyed">
                        {DataFormatterService.FormatTimeString(date)}
                    </ThemedText>
                </View>
            </View>

            <View style={styles.itemSection}>
                <View style={styles.itemHeader}>
                    <MaterialIcons size={16} name="health-and-safety" color="#ef4444" />
                    <ThemedText style={styles.itemLabel} type="greyed">Main Concern:</ThemedText>
                </View>
                <ThemedText style={styles.itemText} type="whitened">
                    {appointment.mainConcern}
                </ThemedText>
            </View>

            <View style={styles.itemSection}>
                <View style={styles.itemHeader}>
                    <MaterialIcons size={16} name="flag" color="#3b82f6" />
                    <ThemedText style={styles.itemLabel} type="greyed">Goal:</ThemedText>
                </View>
                <ThemedText style={styles.itemText} type="whitened">
                    {DataFormatterService.toReadableString(appointment.visitGoal)}
                </ThemedText>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    appointmentCard: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    appointmentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    appointmentInfo: {
        flex: 1,
    },
    doctorName: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    specialty: {
        fontSize: 14,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        gap: 4,
        backgroundColor: '#3b82f622',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#3b82f6',
    },
    appointmentDetails: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#e5e7eb33',
        gap: 16,
        paddingBottom: 12,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    detailText: {
        fontSize: 14,
    },
    itemSection: {
        paddingTop: 6,
        marginTop: 4,
    },
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },
    itemLabel: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    itemText: {
        fontSize: 15,
        lineHeight: 20,
    },
    goalSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 8,
    },
    goalText: {
        fontSize: 13,
    },
});
