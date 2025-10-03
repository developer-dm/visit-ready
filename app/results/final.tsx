import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTempStore } from "@/stores/tempStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Clipboard from 'expo-clipboard';
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

export default function FinalResultsScreen() {
    const router = useRouter();
    const [copied, setCopied] = useState(false);
    const { tempCompletion, clearUserContext } = useTempStore();
    const summary = tempCompletion.summary_for_provider

    //console.log(tempCompletion.summary_for_provider)

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(summary);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    }

    const handleReturn = () => {
        Alert.alert('Exit', 'Are you sure you want to exit?', [
            {
                text: 'Exit',
                onPress: () => {
                    clearUserContext();
                    router.replace("/(tabs)");
                },
                style: "destructive",
            },
            {
                text: 'Cancel',
                style: 'cancel',
            },
        ]);
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.resultsSection}>
                <ThemedText style={styles.sectionTitle}>Summary for your provider</ThemedText>
                <ThemedView style={styles.resultsCard}>
                    <View style={styles.resultsContent}>
                        <ThemedText style={styles.resultsText} type="whitened">
                            {summary}
                        </ThemedText>
                    </View>
                </ThemedView>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    style={styles.actionButton}
                    type="bordered"
                    onPress={copyToClipboard}
                >
                    <MaterialIcons name="content-copy" size={20} color={copied ? '#3b82f6' : '#64748b'} style={styles.buttonIcon} />
                    <Text style={[styles.copyButtonText, { color: copied ? '#3b82f6' : '#64748b' }]}>{copied ? 'Copied to Clipboard!' : 'Copy Items'}</Text>
                </Button>

                <Button
                    style={[styles.actionButton, styles.primaryButton]}
                    onPress={handleReturn}
                >
                    <MaterialIcons name="check" size={20} color="#ffffffff" style={styles.buttonIcon} />
                    <Text style={styles.nextButtonText}>Finish</Text>
                </Button>
            </View>
            <View style={styles.midSpacer} />
            <Footer text="AI can make mistakes. Check important info. This is not medical advice." hasSpacer={true} />
        </ScrollView>
    )
};

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
        color: '#64748b'
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
