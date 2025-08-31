import AppointmentCard from "@/components/AppointmentCard";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getAppointments, removeData } from "@/utils/dataStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function HistoryScreen() {
    type Appointment = {
        id: string;
        appointmentType: string;
        appointmentDate: Date;
        provider: string;
        mainConcern: string;
    };

    const router = useRouter();
    const [appointments, setAppointments] = useState<Record<string, Appointment> | null>(null);

    const clearVisits = () => {
        Alert.alert('Clear Visits', 'Are you sure you want to clear all visits? This action CANNOT be reversed.', [
            {
                text: 'Confirm',
                onPress: () => { removeData("user:appointments"); refreshAppointments(); },
                style: "destructive",
            },
            {
                text: 'Cancel',
                style: 'cancel',
            },
        ]);
    }

    const refreshAppointments = async () => {
        setAppointments(null)
        const storedUser = await getAppointments();
        if (storedUser) setAppointments(storedUser);
    };

    const expandAppointment = (id: string) => {
        if (!appointments) return;
        const appointment = Object.values(appointments).find(a => a.id === id);
        if (!appointment) return;
        router.push({
            pathname: "/appointment-view",
            params: {
                data: JSON.stringify(appointment)
            }
        });
    };

    useEffect(() => {
        refreshAppointments();
    }, []);

    const appointmentCount = appointments ? Object.keys(appointments).length : 0;

    return (
        <>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                {/* Header Section */}
                <View style={styles.header}>
                    <ThemedText style={styles.pageTitle} lightColor='#000000ff' darkColor='#ffffffff'>My Visits</ThemedText>
                    <ThemedText style={styles.subtitle} lightColor='#64748b' darkColor='#858585ff'>
                        Track and review your appointment history
                    </ThemedText>
                </View>

                {/* Stats Card */}
                <ThemedView style={styles.statsCard}>
                    <View style={styles.cardContent}>
                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <ThemedText style={styles.statNumber}>{appointmentCount}</ThemedText>
                                <ThemedText style={styles.statLabel} lightColor='#64748b' darkColor='#858585ff'>
                                    Total Visits
                                </ThemedText>
                            </View>
                            <View style={styles.statDivider} />
                            <TouchableOpacity style={styles.refreshContainer} onPress={() => refreshAppointments()}>
                                <ThemedView style={styles.refreshIconContainer} lightColor='#f1f5f9' darkColor='#1d1d1dff'>
                                    <MaterialIcons
                                        size={24}
                                        name="refresh"
                                        color="#3b82f6"
                                    />
                                </ThemedView>
                                <ThemedText style={styles.refreshText} lightColor='#64748b' darkColor='#858585ff'>
                                    Refresh
                                </ThemedText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ThemedView>

                {/* Appointments Section */}
                <View style={styles.appointmentsSection}>
                    <ThemedText style={styles.sectionTitle} lightColor='#1e293b' darkColor='#ffffffff'>
                        Recent Appointments
                    </ThemedText>

                    <ThemedView style={styles.appointmentsContainer}>
                        {appointments && Object.keys(appointments).length > 0 ? (
                            <ScrollView style={styles.appointmentsList} contentContainerStyle={styles.appointmentsContentList}>
                                {Object.entries(appointments).map(([key, value]) => {
                                    return (
                                        <TouchableOpacity
                                            key={value.id}
                                            onPress={() => expandAppointment(value.id)}
                                        >
                                            <AppointmentCard
                                                appointmentType={value.appointmentType}
                                                appointmentDate={new Date(value.appointmentDate)}
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
                                <ThemedView style={styles.emptyIconContainer} lightColor='#f1f5f9' darkColor='#1d1d1dff'>
                                    <MaterialIcons
                                        size={48}
                                        name="event-note"
                                        color="#94a3b8"
                                    />
                                </ThemedView>
                                <ThemedText style={styles.emptyTitle} lightColor='#1e293b' darkColor='#ffffffff'>
                                    No appointments yet
                                </ThemedText>
                                <ThemedText style={styles.emptySubtitle} lightColor='#64748b' darkColor='#858585ff'>
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
                    <ThemedText style={styles.disclaimer} lightColor='#64748b' darkColor='#858585ff'>
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
        elevation: 8,
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
    refreshContainer: {
        alignItems: 'center',
        flex: 1,
    },
    refreshIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    refreshText: {
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
        backgroundColor: '#fef2f2',
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
