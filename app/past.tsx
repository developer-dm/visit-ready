import { getAppointmentIcon } from "@/components/AppointmentCard";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import DataFormatterService from "@/services/dataFormatter";
import { useDataStore } from "@/stores/dataStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RouteProp, useRoute } from '@react-navigation/native';
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function PrepFinalScreen() {
    const { appointments, completions } = useDataStore();
    const route = useRoute<RouteProp<{ params: { id: string } }, 'params'>>();
    const id = route.params?.id
    const appointment = id ? appointments[JSON.parse(id)] : null;
    const completion = id ? completions[JSON.parse(id)] : null;

    //console.log(appointments, completions)

    if (!appointment) return null;

    const appointmentDate = appointment.appointmentDate ? new Date(appointment.appointmentDate) : appointment.appointmentDate
    const appointmentType = appointment.appointmentType // For modal icon

    const userDataEntries = Object.entries(appointment).filter(([key, value]) => {
        return typeof value !== "function" && key !== "id" && key !== "appointmentType" && key !== "appointmentDate";
    });

    const renderQuestions = () => {
        if (completion?.personalized_questions) {
            if (completion.personalized_questions.length === 0) {
                return null;
            }

            return completion.personalized_questions.map((item) => (
                <React.Fragment key={item.question}>
                    <ThemedText style={styles.detailValue} type="whitened">
                        {item.question}
                    </ThemedText>
                    <ThemedText style={styles.detailValue} type="dusked">
                        {item.why}
                    </ThemedText>
                    <ThemedText style={styles.detailValue} type="dusked">
                        {item.priority}
                    </ThemedText>
                </React.Fragment>
            ));
        };
    };

    const renderArray = (array: string[]) => {
        if (array.length === 0) {
            return null;
        }

        return array.map((item, key) => (
            <ThemedText key={key} style={styles.detailValue} type="whitened">
                {item}
            </ThemedText>
        ));
    };

    return (
        <ThemedView type="container">
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    <View style={styles.cardContent}>
                        <View style={styles.infoSection}>
                            <ThemedView style={styles.infoIconContainer} type="dusked">
                                <MaterialIcons name={appointmentType ? getAppointmentIcon(appointmentType) : "event-note"} size={24} color="#3b82f6" />
                            </ThemedView>
                            <View style={styles.profileInfo}>
                                <ThemedText style={styles.infoTitle} type="whitened">{appointmentType ? DataFormatterService.toReadableString(appointmentType) + " Visit" : "Your Visit Information"}</ThemedText>
                                <ThemedText style={styles.infoSubtitle} type="greyed">{appointmentDate ? DataFormatterService.toReadableString(appointmentDate) : "Review the details you've provided below"}</ThemedText>
                            </View>
                        </View>

                        <View style={styles.detailsSection}>
                            {userDataEntries.length > 0 ? (
                                userDataEntries.map(([key, value]) => {
                                    if (key === "appointmentDate" && typeof value === 'string') {
                                        value = new Date(value);
                                    }
                                    return (
                                        <ThemedView key={key} style={styles.detailItem}>
                                            <ThemedText style={styles.detailLabel} type="greyed">
                                                {DataFormatterService.toReadableString(key, 'label')}
                                            </ThemedText>
                                            <ThemedText style={styles.detailValue} type="whitened">
                                                {DataFormatterService.toReadableString(value)}
                                            </ThemedText>
                                        </ThemedView>
                                    );
                                })
                            ) : (
                                <View style={styles.noDataContainer}>
                                    <ThemedText style={styles.noDataText} type="greyed">
                                        No information available
                                    </ThemedText>
                                </View>
                            )}
                        </View>

                        {completion && (
                            <View style={styles.resultsContent}>
                                <ThemedText type="greyed" style={styles.detailLabel}>Questions for your provider:</ThemedText>
                                {renderQuestions()}
                                <ThemedText type="greyed" style={styles.detailLabel}>What to expect at your appointment:</ThemedText>
                                <ThemedText type="whitened" style={styles.detailValue}>{completion.what_to_expect.brief}</ThemedText>
                                {renderArray(completion.what_to_expect.steps)}
                                <ThemedText type="greyed" style={styles.detailLabel}>What to bring to your appointment:</ThemedText>
                                {renderArray(completion.what_to_bring)}
                                <ThemedText type="greyed" style={styles.detailLabel}>Summary for your provider:</ThemedText>
                                <ThemedText type="whitened" style={styles.detailValue}>{completion.summary_for_provider}</ThemedText>
                            </View>
                        )}
                    </View>

                    <Footer text={"ID: " + DataFormatterService.toReadableString(appointment.id)} hasSpacer={true} />
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 30,
    },
    content: {
        paddingHorizontal: 24,
        flex: 1,
    },
    cardContent: {
        padding: 24,
    },
    infoSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    infoIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    resultsContent: {
        marginTop: 30,
        flexDirection: 'column',
        gap: 12,
    },
    profileInfo: {
        flex: 1,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    infoSubtitle: {
        fontSize: 14,
        fontWeight: '400',
    },
    detailsSection: {
        gap: 6,
    },
    detailItem: {
        paddingTop: 12,
        paddingBottom: 6,
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

