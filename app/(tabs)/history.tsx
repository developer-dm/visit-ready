import AppointmentCard from "@/components/AppointmentCard";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useDataStore } from "@/utils/dataStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function HistoryScreen() {
    const router = useRouter();
    const { appointments, resetAppointments } = useDataStore();

    const clearVisits = () => {
        Alert.alert('Clear Visits', 'Are you sure you want to clear all visits? This action CANNOT be reversed.', [
            {
                text: 'Confirm',
                onPress: () => resetAppointments(),
                style: "destructive",
            },
            {
                text: 'Cancel',
                style: 'cancel',
            },
        ]);
    }

    const handleAppointmentView = (appointment: object) => {
        if (!appointment) return;
        router.push({
            pathname: "/past",
            params: {
                data: JSON.stringify(appointment)
            },
        });
    };

    const handleVisitPrep = () => {
        router.push("/prep")
    };

    return (
        <>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                {/* Header Section */}
                <View style={styles.header}>
                    <ThemedText style={styles.pageTitle} type="whitened">My Visits</ThemedText>
                    <ThemedText style={styles.subtitle} type="greyed">
                        Track and review your appointment history
                    </ThemedText>
                </View>

                {/* Stats Card */}
                <ThemedView style={styles.statsCard}>
                    <View style={styles.cardContent}>
                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <ThemedText style={styles.statNumber}>{Object.keys(appointments).length}</ThemedText>
                                <ThemedText style={styles.statLabel} type="greyed">
                                    Total Visits
                                </ThemedText>
                            </View>
                            <View style={styles.statDivider} />
                            <TouchableOpacity style={styles.addContainer} onPress={handleVisitPrep}>
                                <ThemedView style={styles.addIconContainer} type="dusked">
                                    <MaterialIcons
                                        size={24}
                                        name="add"
                                        color="#3b82f6"
                                    />
                                </ThemedView>
                                <ThemedText style={styles.addText} type="greyed">
                                    Add Visit
                                </ThemedText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ThemedView>

                {/* Appointments Section */}
                <View style={styles.appointmentsSection}>
                    <ThemedText style={styles.sectionTitle} type="whitened">
                        Recent Appointments
                    </ThemedText>

                    <ThemedView style={styles.appointmentsContainer}>
                        {appointments && Object.keys(appointments).length > 0 ? (
                            <ScrollView style={styles.appointmentsList} contentContainerStyle={styles.appointmentsContentList}>
                                {Object.entries(appointments).map(([key, value]) => {
                                    return (
                                        <TouchableOpacity
                                            key={value.id}
                                            onPress={() => handleAppointmentView(value)}
                                        >
                                            <AppointmentCard
                                                appointmentType={value.appointmentType ? value.appointmentType : "other"}
                                                appointmentDate={value.appointmentDate ? new Date(value.appointmentDate) : new Date()}
                                                provider={value.provider}
                                                mainConcern={value.mainConcern}
                                                id={value.id}
                                            />
                                        </TouchableOpacity>
                                    );
                                })}
                            </ScrollView>
                        ) : (
                            <View style={styles.emptyState}>
                                <ThemedView style={styles.emptyIconContainer} type="dusked">
                                    <MaterialIcons
                                        size={48}
                                        name="event-note"
                                        color="#94a3b8"
                                    />
                                </ThemedView>
                                <ThemedText style={styles.emptyTitle} type="whitened">
                                    No appointments yet
                                </ThemedText>
                                <ThemedText style={styles.emptySubtitle} type="greyed">
                                    Go to the dashboard to create your first appointment
                                </ThemedText>
                            </View>
                        )}
                    </ThemedView>
                </View>

                {/* Actions Section */}
                {appointments && Object.keys(appointments).length > 0 && (
                    <View style={styles.actionsSection}>
                        <TouchableOpacity style={styles.deleteButton} onPress={clearVisits}>
                            <MaterialIcons size={20} name="delete-outline" color="#ef4444" />
                            <ThemedText style={styles.deleteButtonText}>Delete all visits</ThemedText>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Disclaimer */}
                <View style={styles.disclaimerSection}>
                    <ThemedText style={styles.disclaimer} type="greyed">
                        Disclaimer: This service does not schedule appointments for you; it is intended only for tracking purposes.
                    </ThemedText>
                </View>
            </ScrollView>
            <Footer />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 30,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 30,
    },
    pageTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: "left",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: "left",
    },
    statsCard: {
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
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        fontSize: 32,
        fontWeight: '700',
        color: '#3b82f6',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: '#e2e8f0',
        marginHorizontal: 20,
    },
    addContainer: {
        alignItems: 'center',
        flex: 1,
    },
    addIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    addText: {
        fontSize: 14,
        fontWeight: '500',
    },
    appointmentsSection: {
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: "left",
        marginBottom: 16,
    },
    appointmentsContainer: {
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
    },
    appointmentsList: {
        minHeight: 100,
        padding: 16,
    },
    appointmentsContentList: {
        gap: 16,
        marginBottom: 16,
    },
    emptyState: {
        alignItems: 'center',
        padding: 48,
    },
    emptyIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
    actionsSection: {
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffdbdbff',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ef4444',
    },
    deleteButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ef4444',
        marginLeft: 8,
    },
    disclaimerSection: {
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    disclaimer: {
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 16,
        fontStyle: 'italic',
    },
});
