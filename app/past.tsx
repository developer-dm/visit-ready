import { getAppointmentIcon } from "@/components/AppointmentCard";
import { CustomButton } from "@/components/CustomButton";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { DataFormatterService } from "@/services/dataFormatter";
import { useDataStore } from "@/stores/dataStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

type TabType = 'summary' | 'preparation';

export default function PrepFinalScreen() {
    const { appointments, completions } = useDataStore();
    const route = useRoute<RouteProp<{ params: { id: string } }, 'params'>>();
    const id = route.params?.id;
    const appointment = id ? appointments[id] : null;
    const completion = id ? completions[id] : null;
    const [activeTab, setActiveTab] = useState<TabType>('summary');

    if (!appointment) return null;

    const appointmentDate = appointment.appointmentDate
        ? DataFormatterService.FormatDateTimeString(new Date(appointment.appointmentDate))
        : "No Appointment Date";
    const appointmentType = appointment.appointmentType;

    const userDataEntries = Object.entries(appointment).filter(([key]) => {
        return key !== "id" &&
            key !== "appointmentType" &&
            key !== "appointmentDate";
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

    const renderQuestions = () => {
        if (!completion?.personalized_questions || completion.personalized_questions.length === 0) {
            return null;
        }

        return completion.personalized_questions.map((item, index) => (
            <ThemedView style={styles.questionContainer} key={index}>
                <View style={styles.questionHeader}>
                    <View style={styles.numberBadge}>
                        <ThemedText style={styles.numberText}>{index + 1}</ThemedText>
                    </View>
                    <ThemedText style={styles.questionText} type="whitened">
                        {item.question}
                    </ThemedText>
                    <CustomButton type="copy" copyText={item.question} />
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

    const renderArray = (array: string[]) => {
        if (array.length === 0) return null;

        return array.map((item, index) => (
            <ThemedView style={styles.detailContainer} key={index}>
                <View style={styles.numberBadge}>
                    <ThemedText style={styles.numberText}>{index + 1}</ThemedText>
                </View>
                <ThemedText style={styles.resultsText} type="whitened">
                    {item}
                </ThemedText>
                <CustomButton type="copy" copyText={item} />
            </ThemedView>
        ));
    };

    const renderTab = (tab: TabType, label: string) => (
        <TouchableOpacity
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
        >
            <ThemedText style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {label}
            </ThemedText>
        </TouchableOpacity>
    );

    return (
        <ThemedView type="container">
            <View style={styles.tabContainer}>
                {renderTab('summary', 'Summary')}
                {renderTab('preparation', 'Preparation')}
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
                                <MaterialIcons
                                    name={appointmentType ? getAppointmentIcon(appointmentType) : "event-note"}
                                    size={24}
                                    color="#3b82f6"
                                />
                            </ThemedView>
                            <View style={styles.profileInfo}>
                                <ThemedText style={styles.infoTitle} type="whitened">
                                    {DataFormatterService.toReadableString(appointmentType)}
                                </ThemedText>
                                <ThemedText style={styles.infoSubtitle} type="greyed">
                                    {appointmentDate}
                                </ThemedText>
                            </View>
                        </View>

                        {activeTab === 'summary' && (
                            <View style={styles.firstDetailsSection}>
                                {renderDetails()}
                            </View>
                        )}

                        {activeTab === 'preparation' && completion && (
                            <View style={styles.resultsContent}>
                                <ThemedText type="greyed" style={styles.detailLabel}>
                                    Questions for your provider:
                                </ThemedText>
                                {renderQuestions()}

                                <ThemedText type="greyed" style={styles.detailLabel}>
                                    What to expect at your appointment:
                                </ThemedText>
                                <ThemedView style={styles.summaryCard}>
                                    <ThemedText type="whitened" style={styles.summaryText}>
                                        {completion.what_to_expect.brief}
                                    </ThemedText>
                                    <CustomButton type="copy" copyText={completion.what_to_expect.brief} />
                                </ThemedView>
                                {renderArray(completion.what_to_expect.steps)}

                                <ThemedText type="greyed" style={styles.detailLabel}>
                                    What to bring to your appointment:
                                </ThemedText>
                                {renderArray(completion.what_to_bring)}

                                <ThemedText type="greyed" style={styles.detailLabel}>
                                    Summary for your provider:
                                </ThemedText>
                                <ThemedView style={styles.summaryCard}>
                                    <ThemedText type="whitened" style={styles.summaryText}>
                                        {completion.summary_for_provider}
                                    </ThemedText>
                                    <CustomButton type="copy" copyText={completion.summary_for_provider} />
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

                    <Footer text={`ID: ${DataFormatterService.toReadableString(id)}`} hasSpacer={true} />
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
    resultsContent: {
        flexDirection: 'column',
        gap: 12,
    },
    summaryCard: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        marginBottom: 12,
        borderRadius: 10,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    summaryText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
    },
    questionContainer: {
        marginBottom: 6,
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    questionHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
        gap: 12,
    },
    questionText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22,
    },
    detailContainer: {
        marginBottom: 12,
        padding: 16,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    numberBadge: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#3b82f6',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    numberText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ffffff',
    },
    firstDetailsSection: {
        gap: 6,
    },
    detailsSection: {
        gap: 12,
        paddingLeft: 20,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
    },
    detailText: {
        fontSize: 14,
        flex: 1,
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
