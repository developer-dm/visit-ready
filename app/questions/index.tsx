import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useDataStore } from "@/utils/dataStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RouteProp, useRoute } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Flow } from 'react-native-animated-spinkit';

export default function FinalScreen() {
    type RouteParams = {
        data: string;
    };

    const router = useRouter();
    const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
    const prep = route.params?.data ? JSON.parse(route.params.data) : null;
    const [copied, setCopied] = useState(false);
    const [response, setResponse] = useState('test');
    const { addAppointment } = useDataStore();

    const handleGenerate = async () => {
        
    };

    useEffect(() => {
        handleGenerate();
    }, []);

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(response);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    const handleReturn = () => {
        addAppointment(prep);
        router.replace("/(tabs)");
    }

    useEffect(() => {
        if (prep) {
            console.log("received prep: " + prep.id)
        }
    }, []);

    return (
        <>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
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

                {/* Loading */}
                {!response && (
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
                            <Flow size={70} color="#3b82f6" />
                        </View>
                    </ThemedView>
                )}

                {/* Generated Questions */}
                {response && (
                    <View style={styles.questionsSection}>
                        <ThemedText style={styles.sectionTitle}>Questions to Ask Your Doctor</ThemedText>
                        <ThemedView style={styles.questionCard}>
                            <View style={styles.questionContent}>
                                <View style={styles.questionNumber}>
                                    <ThemedText style={styles.questionNumberText}>1</ThemedText>
                                </View>
                                <ThemedText style={styles.questionText} type="whitened">
                                    {response}
                                </ThemedText>
                            </View>
                        </ThemedView>
                    </View>
                )}

                {/* Action Buttons */}
                {response && (
                    <View style={styles.buttonContainer}>
                        <Button
                            style={styles.actionButton}
                            type="bordered"
                            onPress={copyToClipboard}
                        >
                            <MaterialIcons name="content-copy" size={20} color={copied ? '#3b82f6' : '#64748b'} style={styles.buttonIcon} />
                            <ThemedText style={[styles.copyButtonText, { color: copied ? '#3b82f6' : '#64748b' }]}>{copied ? 'Copied to Clipboard!' : 'Copy Questions'}</ThemedText>
                        </Button>

                        <Button
                            style={[styles.actionButton, styles.backButton]}
                            onPress={handleReturn}
                        >
                            <MaterialIcons name="save" size={20} color="#ffffffff" style={styles.buttonIcon} />
                            <Text style={styles.backButtonText}>Return & Save</Text>
                        </Button>
                    </View>
                )}
            </ScrollView>
            <Footer type="absolute" text="AI can make mistakes. Check important info." hasSpacer={true} />
        </>
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
        paddingTop: 160,
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
    questionsSection: {
        paddingHorizontal: 24,
        marginBottom: 24,
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
    copyButtonText: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 8,
    },
    backButton: {
        backgroundColor: '#3b82f6',
        shadowColor: '#3b82f6',
        shadowOpacity: 0.3,
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
    buttonIcon: {
        marginRight: 8,
    },
});
