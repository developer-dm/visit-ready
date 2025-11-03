import { CopyButton } from "@/components/Copy";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useTempStore from "@/stores/tempStore";
import DataFormatter from "@/utils/dataFormatter";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function FourthResultsScreen() {
    const { tempCompletion } = useTempStore();
    const questions = Array.isArray(tempCompletion.personalized_questions) ? tempCompletion.personalized_questions : [];

    const renderQuestions = () => {
        if (questions.length === 0) {
            return (
                <ThemedText style={styles.resultsText} type="whitened">
                    No information available
                </ThemedText>
            );
        }

        return questions.map((item, key) => (
            <ThemedView style={styles.resultsCard} key={key}>
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
                        <MaterialIcons
                            name="flag"
                            size={16}
                            color={item.priority === 'high' ? "#ef4444" : item.priority === 'medium' ? "#e6a313ff" : "#64748b"}
                        />
                        <ThemedText style={styles.detailText} type="greyed">
                            {DataFormatter.toReadableString(item.priority, 'priority')}
                        </ThemedText>
                    </View>

                    <View style={styles.detailRow}>
                        <MaterialIcons name="info-outline" size={16} color="#64748b" />
                        <ThemedText style={styles.detailText} type="greyed">
                            {item.why}
                        </ThemedText>
                    </View>
                </View>
                <CopyButton textToCopy={item.question} />
            </ThemedView>
        ));
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <ThemedText style={styles.sectionTitle}>
                Questions to Ask Your Doctor
            </ThemedText>
            {renderQuestions()}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 150,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: "center",
        paddingBottom: 100,
    },
    resultsCard: {
        marginBottom: 12,
        padding: 20,
        borderRadius: 10,
        gap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    resultsText: {
        fontSize: 16,
        fontWeight: '400',
    },
    questionHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
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
    numberText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ffffff',
    },
    questionText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22,
    },
});
