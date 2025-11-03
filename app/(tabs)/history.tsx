import { AppointmentCard } from "@/components/AppointmentCard";
import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ROUTES from "@/constants/Routes";
import useDataStore from "@/stores/dataStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function HistoryScreen() {
    const { appointments } = useDataStore();
    const totalAppointments = Object.keys(appointments).length

    const handleVisitPrep = () => {
        router.push(ROUTES.PREP)
    };

    const renderAppointments = () => {
        if (!appointments || Object.keys(appointments).length === 0) { // No appointments exist
            return (
                <ThemedView style={styles.emptyState}>
                    <MaterialIcons size={48} name="event-available" color="#6b7280" />
                    <ThemedText style={styles.emptyStateTitle} type="whitened">No appointments yet</ThemedText>
                    <ThemedText style={styles.emptyStateText} type="greyed">
                        Go to the dashboard to create your first appointment
                    </ThemedText>
                </ThemedView>
            );
        }

        return Object.entries(appointments).map(([key, value]) => { // Check if appointments exists
            const handleAppointmentView = () => {
                router.push({
                    pathname: ROUTES.PAST_APPOINTMENT,
                    params: { id: key },
                });
            };

            return (
                <TouchableOpacity
                    key={key}
                    onPress={handleAppointmentView}
                >
                    <AppointmentCard appointment={value} />
                </TouchableOpacity>
            );
        })
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <ThemedText style={styles.title} type="whitened">My Visits</ThemedText>
                <ThemedText style={styles.subtitle} type="greyed">
                    Track and review your appointment history
                </ThemedText>
            </View>

            <ThemedView style={styles.statsCard}>
                <View style={styles.statsRowContainer}>
                    <ThemedText style={styles.statNumber}>{totalAppointments}</ThemedText>
                    <ThemedText style={styles.statLabel} type="greyed">Total Visits</ThemedText>
                </View>
                <Divider type="vertical" top={25} bottom={25} />
                <TouchableOpacity style={styles.statsRowContainer} onPress={handleVisitPrep}>
                    <ThemedView style={styles.addIconContainer} type="bordered">
                        <MaterialIcons
                            size={24}
                            name="add"
                            color="#3b82f6"
                        />
                    </ThemedView>
                    <ThemedText style={styles.addText} type="greyed">Add Visit</ThemedText>
                </TouchableOpacity>
            </ThemedView>

            <View style={styles.appointmentsSection}>
                <ThemedText style={styles.sectionTitle} type="whitened">Recent Appointments</ThemedText>
                <View style={styles.appointmentsContainer}>
                    {renderAppointments()}
                </View>
            </View>

            <Footer text={`Visit Ready does not book appointments\nIntended only for tracking purposes`} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 50,
        paddingHorizontal: 24,
    },
    header: {
        paddingTop: 40,
        paddingBottom: 30,
    },
    title: {
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
        padding: 24,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    statsRowContainer: {
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
    addIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    addText: {
        fontSize: 14,
        fontWeight: '500',
    },
    appointmentsSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: "left",
        marginBottom: 16,
    },
    appointmentsContainer: {
        gap: 6,
    },
    emptyState: {
        alignItems: 'center',
        padding: 30,
        borderRadius: 10,
    },
    emptyStateTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyStateText: {
        fontSize: 14,
        textAlign: 'center',
    },
});
