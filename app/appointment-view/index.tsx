import { getAppointmentIcon } from "@/components/AppointmentCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import DataFormatterService from "@/utils/dataFormatterService";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RouteProp, useRoute } from '@react-navigation/native';
import { ScrollView, StyleSheet, View } from "react-native";

export default function PrepFinalScreen() {
    type RouteParams = {
        data: string;
    };

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
    const appointmentType = appointment.appointmentType // For modal icon

    const userDataEntries = Object.entries(appointment).filter(([key, value]) => {
        return typeof value !== "function" && key !== "id";
    });

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.content}>
                {/* Review Card */}
                <ThemedView style={styles.reviewCard}>
                    <View style={styles.cardContent}>
                        {/* Info Section */}
                        <View style={styles.infoSection}>
                            <ThemedView style={styles.infoIconContainer} lightColor='#f1f5f9' darkColor='#1d1d1dff'>
                                <MaterialIcons name={appointmentType ? getAppointmentIcon(appointmentType) : "event-note"} size={24} color="#3b82f6" />
                            </ThemedView>
                            <ThemedText style={styles.infoTitle} lightColor='#1e293b' darkColor='#ffffffff'>
                                Your Visit Information
                            </ThemedText>
                            <ThemedText style={styles.infoSubtitle} lightColor='#64748b' darkColor='#858585ff'>
                                Review the details you've provided below
                            </ThemedText>
                        </View>

                        {/* User Details */}
                        <View style={styles.detailsSection}>
                            {userDataEntries.length > 0 ? (
                                userDataEntries.map(([key, value]) => {
                                    let formattedValue = value;
                                    if (key === "appointmentDate" && typeof value === 'string') {
                                        formattedValue = new Date(value);
                                    }

                                    return (
                                        <ThemedView key={key} style={styles.detailItem}>
                                            <ThemedText style={styles.detailLabel} lightColor='#64748b' darkColor='#858585ff'>
                                                {labels[key] || key}
                                            </ThemedText>
                                            <ThemedText style={styles.detailValue} lightColor='#1e293b' darkColor='#ffffffff'>
                                                {DataFormatterService.toReadableString(formattedValue)}
                                            </ThemedText>
                                        </ThemedView>
                                    );
                                })
                            ) : (
                                <View style={styles.noDataContainer}>
                                    <ThemedText style={styles.noDataText} lightColor='#64748b' darkColor='#858585ff'>
                                        No information available
                                    </ThemedText>
                                </View>
                            )}
                        </View>
                    </View>
                </ThemedView>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingTop: 40,
        paddingBottom: 30,
    },
    content: {
        flex: 1,
    },
    reviewCard: {
        marginHorizontal: 24,
        marginBottom: 24,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 20,
    },
    cardContent: {
        padding: 24,
    },
    infoSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    infoIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 8,
    },
    infoSubtitle: {
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 20,
        maxWidth: 280,
    },
    detailsSection: {
        gap: 12,
        marginBottom: 28,
    },
    detailItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    detailLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 16,
        fontWeight: '400',
    },
    noDataContainer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    noDataText: {
        fontSize: 16,
        fontStyle: 'italic',
    },
});

