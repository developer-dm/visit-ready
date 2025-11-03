import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getAllNotifications } from "@/services/notifications";
import DataFormatter from "@/utils/dataFormatter";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { NotificationRequest } from "expo-notifications";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function NotificationsScreen() {
    const [notifications, setNotifications] = useState<NotificationRequest[]>();

    const fetchNotifications = async () => {
        const notifs = await getAllNotifications();
        setNotifications(notifs);
    };

    const renderNotifications = () => {
        if (!notifications || notifications.length === 0) {
            return (
                <ThemedView style={styles.emptyState}>
                    <MaterialIcons size={48} name="notifications-off" color="#6b7280" />
                    <ThemedText style={styles.emptyStateTitle} type="whitened">No Notifications yet</ThemedText>
                    <ThemedText style={styles.emptyStateText} type="greyed">
                        Create a new appointment to set a notification
                    </ThemedText>
                </ThemedView>
            )
        }

        return notifications.map((notif: NotificationRequest) => {
            const date = notif.content.data.date as string;
            const triggerDate = new Date(date);

            return (
                <ThemedView key={notif.identifier} style={styles.detailContainer}>
                    <ThemedText style={styles.detailTitle}>
                        {notif.content.title}
                    </ThemedText>
                    <ThemedText style={styles.detailSubtitle} type="greyed">
                        {notif.content.body}
                    </ThemedText>

                    <View style={styles.appointmentDetails}>
                        <View style={styles.detailRow}>
                            <MaterialIcons size={16} name="calendar-today" color="#6b7280" />
                            <ThemedText style={styles.detailValue} type="greyed">
                                {DataFormatter.FormatDateString(triggerDate)}
                            </ThemedText>
                        </View>
                        <View style={styles.detailRow}>
                            <MaterialIcons size={16} name="schedule" color="#6b7280" />
                            <ThemedText style={styles.detailValue} type="greyed">
                                {DataFormatter.FormatTimeString(triggerDate)}
                            </ThemedText>
                        </View>
                    </View>
                </ThemedView>
            );
        })
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <ThemedView type="container">
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <ThemedText style={styles.sectionTitle}>
                    Upcoming Notifications
                </ThemedText>
                {renderNotifications()}
            </ScrollView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 50,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: "center",
        paddingBottom: 50,
    },
    appointmentDetails: {
        flexDirection: 'row',
        gap: 16,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    detailContainer: {
        marginBottom: 12,
        padding: 16,
        borderRadius: 10,
        flexDirection: 'column',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    detailTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    detailSubtitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 14,
    },
    emptyState: {
        alignItems: 'center',
        padding: 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
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
