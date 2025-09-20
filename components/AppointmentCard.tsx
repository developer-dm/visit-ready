import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import DataFormatterService from "@/utils/dataFormatterService";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, View } from "react-native";

type AppointmentCardProps = {
    appointmentType: string;
    appointmentDate: Date | string;
    provider: string;
    mainConcern: string;
    id: string;
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
    } else {
        return "event-note";
    }
};

export default function AppointmentCard({
    appointmentType,
    appointmentDate,
    provider,
    mainConcern,
    id,
}: AppointmentCardProps) {
    return (
        <ThemedView style={styles.card} type="bordered">
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <ThemedView style={styles.iconContainer} type="dusked">
                        <MaterialIcons
                            name={getAppointmentIcon(appointmentType)}
                            size={20}
                            color="#3b82f6"
                        />
                    </ThemedView>
                    <View style={styles.headerInfo}>
                        <ThemedText style={styles.appointmentType} type="whitened">
                            {DataFormatterService.toReadableString(appointmentType)}
                        </ThemedText>
                        <ThemedText style={styles.dateText} type="greyed">
                            {DataFormatterService.toReadableString(appointmentDate)}
                        </ThemedText>
                    </View>
                </View>
                <MaterialIcons
                    name="chevron-right"
                    size={20}
                    color="#94a3b8"
                />
            </View>

            {/* Details Section */}
            <View style={styles.details}>
                <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                        <MaterialIcons name="local-hospital" size={16} color="#64748b" style={styles.detailIcon} />
                        <View>
                            <ThemedText style={styles.detailLabel} type="greyed">
                                Provider
                            </ThemedText>
                            <ThemedText style={styles.detailValue} type="whitened">
                                {DataFormatterService.toReadableString(provider)}
                            </ThemedText>
                        </View>
                    </View>
                </View>

                <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                        <MaterialIcons name="description" size={16} color="#64748b" style={styles.detailIcon} />
                        <View style={styles.concernContainer}>
                            <ThemedText style={styles.detailLabel} type="greyed">
                                Main Concern
                            </ThemedText>
                            <ThemedText style={styles.detailValue} type="whitened" numberOfLines={2}>
                                {DataFormatterService.toReadableString(mainConcern)}
                            </ThemedText>
                        </View>
                    </View>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <ThemedText style={styles.idText} type="dusked">
                    ID: {DataFormatterService.toReadableString(id)}
                </ThemedText>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    headerInfo: {
        flex: 1,
    },
    appointmentType: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    dateText: {
        fontSize: 14,
        fontWeight: '400',
    },
    details: {
        gap: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
    },
    detailIcon: {
        marginRight: 8,
        marginTop: 2,
        opacity: 0.7,
    },
    detailLabel: {
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 2,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 18,
    },
    concernContainer: {
        flex: 1,
    },
    footer: {
        paddingTop: 12,
        alignItems: 'flex-start',
    },
    idText: {
        fontSize: 11,
        fontWeight: '400',
        fontStyle: 'italic',
        textAlign: "left",
    },
});
