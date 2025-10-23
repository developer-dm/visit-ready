import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { DataFormatterService } from "@/services/dataFormatter";
import { useTempStore } from "@/stores/tempStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ScrollView, StyleSheet, View } from "react-native";

export default function PrepFinalScreen() {
    const { appointment } = useTempStore();

    const userDataEntries = Object.entries(appointment).filter(([key]) => {
        return key;
    });

    const renderDetails = () => {
        if (userDataEntries.length === 0) {
            return (
                <View style={styles.noDataContainer}>
                    <ThemedText style={styles.noDataText} type="greyed">
                        No information available
                    </ThemedText>
                </View>
            );
        }

        return userDataEntries.map(([key, value]) => {
            if (!value) return;
            if (key === "appointmentDate" && value) value = DataFormatterService.FormatDateTimeString(value);

            return (
                <ThemedView type="list" key={key} style={styles.detailItem}>
                    <ThemedText style={styles.detailLabel} type="greyed">
                        {DataFormatterService.toReadableString(key, 'label')}
                    </ThemedText>
                    <ThemedText style={styles.detailValue} type="whitened">
                        {DataFormatterService.toReadableString(value)}
                    </ThemedText>
                </ThemedView>
            );
        });
    };

    return (
        <ThemedView type="container">
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerSection}>
                    <ThemedView style={styles.headerIconContainer} type="dusked">
                        <MaterialIcons name="check-circle" size={32} color="#10b981" />
                    </ThemedView>
                    <ThemedText style={styles.headerTitle} type="whitened">Review Your Information</ThemedText>
                    <ThemedText style={styles.headerSubtitle} type="greyed">Confirm your appointment details are correct</ThemedText>
                </View>

                <View style={styles.detailsSection}>
                    {renderDetails()}
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 300,
        paddingTop: 48,
        paddingHorizontal: 24,
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    headerIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 20,
        maxWidth: 280,
    },
    detailsSection: {
        gap: 24,
    },
    detailItem: {
        paddingBottom: 2,
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
