import { getAppointmentIcon } from "@/components/AppointmentCard";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import DataFormatterService from "@/services/dataFormatter";
import { useDataStore } from "@/stores/dataStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function PrepFinalScreen() {
    const { appointments, completions } = useDataStore();
    const route = useRoute<RouteProp<{ params: { id: string } }, 'params'>>();
    const id = route.params?.id
    const appointment = id ? appointments[JSON.parse(id)] : null;
    const completion = id ? completions[JSON.parse(id)] : null;
    const [activeTab, setActiveTab] = useState<'summary' | 'preparation'>('summary');

    if (!appointment) return null;

    const appointmentDate = appointment.appointmentDate ? new Date(appointment.appointmentDate) : appointment.appointmentDate
    const appointmentType = appointment.appointmentType

    const userDataEntries = Object.entries(appointment).filter(([key, value]) => {
        return typeof value !== "function" && key !== "id" && key !== "appointmentType" && key !== "appointmentDate";
    });

    const renderDetails = () => {
        if (userDataEntries.length === 0) {
            return (
                <View style={styles.noDataContainer}>
                    <ThemedText style={styles.noDataText} type="greyed">
                        No information available
                    </ThemedText>
                </View>
            )
        }

        return (userDataEntries.map(([key, value]) => {
            if (key === "appointmentDate" && typeof value === 'string') {
                value = new Date(value);
            }
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
        })
        )
    };

    const renderQuestions = () => {
        if (completion?.personalized_questions) {
            if (completion.personalized_questions.length === 0) return null;

            return completion.personalized_questions.map((item, key) => (
                <ThemedView style={styles.questionContainer} key={key}>
                    <View style={styles.questionHeader}>
                        <View style={styles.numberBadge}>
                            <ThemedText style={styles.numberText}>{key + 1}</ThemedText>
                        </View>
                        <ThemedText style={styles.questionText} type="whitened">
                            {item.question}
                        </ThemedText>
                    </View>
                    <View style={styles.detailsSection}>
                        <View style={styles.detailRow}>
                            <MaterialIcons name="flag" size={16} color="#64748b" />
                            <ThemedText style={styles.detailText} type="greyed">
                                {DataFormatterService.toReadableString(item.priority, 'priority')}
                            </ThemedText>
                        </View>
                        <View style={styles.detailRow}>
                            <MaterialIcons name="info-outline" size={16} color="#64748b" />
                            <ThemedText style={styles.detailText} type="greyed">
                                {item.why}
                            </ThemedText>
                        </View>
                    </View>
                </ThemedView>
            ));
        };
    };

    const renderArray = (array: string[]) => {
        if (array.length === 0) {
            return null;
        }

        return array.map((item, key) => (
            <ThemedView style={styles.detailContainer} key={key}>
                <View style={styles.numberBadge}>
                    <ThemedText style={styles.numberText}>{key + 1}</ThemedText>
                </View>
                <ThemedText key={key} style={styles.resultsText} type="whitened">
                    {item}
                </ThemedText>
            </ThemedView>
        ));
    };

    return (
        <ThemedView type="container">
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'summary' && styles.activeTab]}
                    onPress={() => setActiveTab('summary')}
                >
                    <ThemedText style={[styles.tabText, activeTab === 'summary' && styles.activeTabText]}>
                        Summary
                    </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'preparation' && styles.activeTab]}
                    onPress={() => setActiveTab('preparation')}
                >
                    <ThemedText style={[styles.tabText, activeTab === 'preparation' && styles.activeTabText]}>
                        Preparation
                    </ThemedText>
                </TouchableOpacity>
            </View>

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

                        {activeTab === 'summary' && (
                            <View style={styles.firstDetailsSection}>
                                {renderDetails()}
                            </View>
                        )}

                        {activeTab === 'preparation' && completion && (
                            <View style={styles.resultsContent}>
                                <ThemedText type="greyed" style={styles.detailLabel}>Questions for your provider:</ThemedText>
                                {renderQuestions()}

                                <ThemedText type="greyed" style={styles.detailLabel}>What to expect at your appointment:</ThemedText>
                                <ThemedView style={styles.detailContainer}>
                                    <ThemedText type="whitened" style={styles.detailValue}>
                                        {completion.what_to_expect.brief}
                                    </ThemedText>
                                </ThemedView>
                                {renderArray(completion.what_to_expect.steps)}

                                <ThemedText type="greyed" style={styles.detailLabel}>What to bring to your appointment:</ThemedText>
                                {renderArray(completion.what_to_bring)}

                                <ThemedText type="greyed" style={styles.detailLabel}>Summary for your provider:</ThemedText>
                                <ThemedView style={styles.detailContainer}>
                                    <ThemedText type="whitened" style={styles.detailValue}>
                                        {completion.summary_for_provider}
                                    </ThemedText>
                                </ThemedView>
                            </View>
                        )}

                        {activeTab === 'preparation' && !completion && (
                            <View style={styles.noDataContainer}>
                                <ThemedText style={styles.noDataText} type="greyed">
                                    No preparation information available
                                </ThemedText>
                            </View>
                        )}
                    </View>

                    <Footer text={"ID: " + DataFormatterService.toReadableString(id)} hasSpacer={true} />
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
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingTop: 30,
        paddingBottom: 8,
        gap: 8,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    activeTab: {
        backgroundColor: '#3b82f6',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#64748b',
    },
    activeTabText: {
        color: '#ffffff',
        fontWeight: '600',
    },
    cardContent: {
        paddingHorizontal: 12,
        paddingVertical: 24,
    },
    infoSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
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
        flexDirection: 'column',
        gap: 12,
    },
    profileInfo: {
        flex: 1,
    },
    questionContainer: {
        marginBottom: 6,
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    detailContainer: {
        marginBottom: 6,
        padding: 16,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    questionHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
        gap: 12,
    },
    arrayQuestionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 12,
    },
    numberBadge: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#3b82f6',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#3b82f6',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    firstDetailsSection: {
        gap: 6,
    },
    detailsSection: {
        gap: 12,
        paddingLeft: 20,
    },
    numberText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ffffff',
    },
    questionText: {
        fontSize: 17,
        fontWeight: '600',
        flex: 1,
        lineHeight: 24,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
    },
    detailText: {
        fontSize: 14,
        flex: 1,
        lineHeight: 20,
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
    resultsText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'left',
        width: '100%',
    },
    detailItem: {
        paddingTop: 16,
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
