import { Button } from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function FinalScreen() {
    const router = useRouter();

    const handleReturn = () => {
        router.dismissTo("/(tabs)")
    }

    const generatedQuestions = [
        "What are the potential side effects of my current medication?",
        "Based on my symptoms, what lifestyle changes would you recommend?",
        "Should I be concerned about the frequency of my headaches?",
        "Are there any preventive measures I should take given my family history?",
        "What follow-up tests or appointments do you recommend?"
    ];

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            {/* Header Section */}
            <View style={styles.header}>
                <ThemedView style={styles.headerIconContainer} type="dusked">
                    <MaterialIcons name="psychology" size={32} color="#3b82f6" />
                </ThemedView>
                <ThemedText style={styles.headerTitle} type="whitened">
                    Your Personalized Questions
                </ThemedText>
                <ThemedText style={styles.headerSubtitle} type="greyed">
                    AI-generated questions tailored to your visit information
                </ThemedText>
            </View>

            {/* Loading State */}
            <ThemedView style={styles.loadingCard}>
                <View style={styles.loadingContent}>
                    <ThemedView style={styles.loadingIconContainer} type="dusked">
                        <MaterialIcons name="auto-awesome" size={24} color="#3b82f6" />
                    </ThemedView>
                    <ThemedText style={styles.loadingText} type="whitened">
                        Generating Questions...
                    </ThemedText>
                    <ThemedText style={styles.loadingSubtext} type="greyed">
                        Creating personalized questions based on your appointment details
                    </ThemedText>

                    {/* Loading Animation Placeholder */}
                    <View style={styles.loadingAnimation}>
                        <View style={[styles.dot, styles.dot1]} />
                        <View style={[styles.dot, styles.dot2]} />
                        <View style={[styles.dot, styles.dot3]} />
                    </View>
                </View>
            </ThemedView>

            {/* Generated Questions Section (Hidden initially, shown after generation) */}
            <View style={styles.questionsSection}>
                <ThemedText style={styles.sectionTitle}>Questions to Ask Your Doctor</ThemedText>

                {generatedQuestions.map((question, index) => (
                    <ThemedView key={index} style={styles.questionCard}>
                        <View style={styles.questionContent}>
                            <View style={styles.questionNumber}>
                                <ThemedText style={styles.questionNumberText}>{index + 1}</ThemedText>
                            </View>
                            <ThemedText style={styles.questionText} type="whitened">
                                {question}
                            </ThemedText>
                        </View>
                    </ThemedView>
                ))}
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
                <Button
                    style={[styles.actionButton, styles.primaryButton]}
                    onPress={() => {}}
                >
                    <MaterialIcons name="content-copy" size={20} color="#ffffff" style={styles.buttonIcon} />
                    <ThemedText style={styles.primaryButtonText}>Copy Questions</ThemedText>
                </Button>

                <Button
                    style={styles.actionButton}
                    type="bordered"
                    onPress={handleReturn}
                >
                    <Text style={styles.backButtonText}>Back</Text>
                </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 30,
    },
    header: {
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 80,
        paddingBottom: 30,
    },
    headerIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 22,
        maxWidth: 300,
    },
    loadingCard: {
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
    },
    loadingContent: {
        padding: 32,
        alignItems: 'center',
    },
    loadingIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    loadingText: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 8,
    },
    loadingSubtext: {
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 24,
    },
    loadingAnimation: {
        flexDirection: 'row',
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#3b82f6',
        opacity: 0.4,
    },
    dot1: {
        opacity: 1,
    },
    dot2: {
        opacity: 0.7,
    },
    dot3: {
        opacity: 0.4,
    },
    questionsSection: {
        paddingHorizontal: 24,
        marginBottom: 24,
        display: 'none', //hide questions
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: "left",
        marginBottom: 16,
    },
    questionCard: {
        marginBottom: 12,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
    },
    questionContent: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    questionNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#3b82f6',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
    questionNumberText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#ffffff',
    },
    questionText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
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
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        minHeight: 60,
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#64748b',
        marginLeft: 8,
    },
    primaryButton: {
        backgroundColor: '#3b82f6',
        shadowColor: '#3b82f6',
        shadowOpacity: 0.3,
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
    buttonIcon: {
        marginRight: 8,
    },
});
