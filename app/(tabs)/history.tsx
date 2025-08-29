import AppointmentCard from "@/components/AppointmentCard";
import { Button } from "@/components/Button";
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

    return (
        <View style={styles.container}>
            <ThemedView type="card">
                <View style={styles.headerRow}>
                    <ThemedText type="title" style={styles.headerTitle}>My Visits</ThemedText>
                </View>
                <ScrollView style={styles.scrollContainer} contentContainerStyle={{ gap: "10" }}>
                    {appointments &&
                        Object.entries(appointments).map(([key, value]) => {
                            return (
                                <TouchableOpacity key={value.id} onPress={() => expandAppointment(value.id)}>
                                    <AppointmentCard
                                        appointmentType={value.appointmentType}
                                        appointmentDate={value.appointmentDate}
                                        provider={value.provider}
                                        mainConcern={value.mainConcern}
                                        id={value.id}
                                    />
                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView>
            </ThemedView>
            <Button type="light" style={styles.button} onPress={clearVisits}>
                <MaterialIcons size={30} name="delete-outline" color={"#ff0000ff"} style={styles.buttonIcon} />
                <ThemedText type="default" style={{ color: "#ff0000ff" }}>Delete all past visits</ThemedText>
            </Button>
            <ThemedText type="subtitle" style={styles.reminder}>Disclaimer: This service does not schedule appointments for you; it is intended only for tracking purposes.</ThemedText>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    button: {
        marginTop: 15,
    },
    buttonIcon: {
        position: "absolute",
        left: 10,
    },
    scrollContainer: {
        width: "100%",
        height: 400,
    },
    reminder: {
        marginTop: 15,
        fontSize: 5,
    },
});
