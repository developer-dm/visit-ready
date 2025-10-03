import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Clipboard from 'expo-clipboard';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTempStore } from "@/stores/tempStore";

export default function SecondResultsScreen() {
    const router = useRouter();
    const [copied, setCopied] = useState(false);
    const { tempCompletion } = useTempStore();

    const questions = Array.isArray(tempCompletion.personalized_questions) ? tempCompletion.personalized_questions : [];

    //console.log(tempCompletion.personalized_questions);

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(
            questions.map(q => `- ${q.question}`).join('\n')
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    const handleNext = () => {
        router.push("/results/third");
    };

    const renderQuestions = () => {
        if (questions.length === 0) {
            return (
                <ThemedText style={styles.resultsText} type="whitened">
                    No information available
                </ThemedText>
            );
        }

        return questions.map((item) => (
            <React.Fragment key={item.question}>
                <ThemedText style={styles.resultsText} type="whitened">
                    {item.question}
                </ThemedText>
                <ThemedText style={styles.resultsText} type="greyed">
                    {item.why}
                </ThemedText>
                <ThemedText style={styles.resultsText} type="greyed">
                    {item.priority}
                </ThemedText>
            </React.Fragment>
        ));
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.resultsSection}>
                <ThemedText style={styles.sectionTitle}>
                    Questions to Ask Your Doctor
                </ThemedText>
                <ThemedView style={styles.resultsCard}>
                    <View style={styles.resultsContent}>
                        {renderQuestions()}
                    </View>
                </ThemedView>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    style={styles.actionButton}
                    type="bordered"
                    onPress={copyToClipboard}
                >
                    <MaterialIcons
                        name="content-copy"
                        size={20}
                        color={copied ? '#3b82f6' : '#64748b'}
                        style={styles.buttonIcon}
                    />
                    <Text style={[styles.copyButtonText, copied && styles.copiedText]}>
                        {copied ? 'Copied to Clipboard!' : 'Copy Items'}
                    </Text>
                </Button>

                <Button
                    style={[styles.actionButton, styles.primaryButton]}
                    onPress={handleNext}
                >
                    <MaterialIcons
                        name="arrow-forward"
                        size={20}
                        color="#ffffff"
                        style={styles.buttonIcon}
                    />
                    <Text style={styles.nextButtonText}>Next</Text>
                </Button>
            </View>

            <View style={styles.midSpacer} />

            <Footer text="AI can make mistakes. Check important info. This is not medical advice." hasSpacer={true} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 100,
    },
    resultsSection: {
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: "left",
        marginBottom: 16,
    },
    resultsCard: {
        marginBottom: 12,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,
    },
    resultsContent: {
        padding: 16,
        flexDirection: 'column',
        gap: 12,
    },
    resultsText: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'left',
        width: '100%',
    },
    buttonContainer: {
        paddingHorizontal: 24,
        gap: 12,
        marginTop: 16,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        minHeight: 60,
    },
    copyButtonText: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 8,
        color: '#64748b',
    },
    copiedText: {
        color: '#3b82f6',
    },
    primaryButton: {
        backgroundColor: '#3b82f6',
        shadowColor: '#3b82f6',
        shadowOpacity: 0.3,
    },
    nextButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
    midSpacer: {
        height: 40,
    },
    buttonIcon: {
        marginRight: 8,
    },
});
