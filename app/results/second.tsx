import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTempStore } from "@/stores/tempStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Clipboard from 'expo-clipboard';
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function SecondResultsScreen() {
    const router = useRouter();
    const [copied, setCopied] = useState(false);
    const { tempCompletion } = useTempStore();

    const expectations = tempCompletion.what_to_expect
    const brief = expectations.brief
    const steps = expectations.steps

    //console.log(tempCompletion.what_to_expect)

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(
            expectations.brief
            + '\n'
            + steps.map(q => `- ${q}`).join('\n')
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    const renderSteps = () => {
        if (steps.length === 0) {
            return (
                <ThemedText style={styles.resultsText} type="whitened">
                    No information available
                </ThemedText>
            );
        }

        return steps.map((item, key) => (
            <ThemedView style={styles.resultsCard} key={key}>
                <View style={styles.numberBadge}>
                    <ThemedText style={styles.numberText}>{key + 1}</ThemedText>
                </View>
                <ThemedText key={key} style={styles.resultsText} type="whitened">
                    {item}
                </ThemedText>
            </ThemedView>
        ));
    };

    const handleNext = () => {
        router.push("/results/third");
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.resultsSection}>
                <ThemedText style={styles.sectionTitle}>What to Expect at Your Visit</ThemedText>
                <ThemedView style={styles.resultsCard}>
                    <ThemedText style={styles.resultsText} type="whitened">
                        {brief}
                    </ThemedText>
                </ThemedView>
                {renderSteps()}
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
                    onPress={handleNext}
                >
                    <MaterialIcons name="arrow-forward" size={20} color="#ffffffff" style={styles.buttonIcon} />
                    <Text style={styles.nextButtonText}>Next</Text>
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
        fontSize: 24,
        fontWeight: '600',
        textAlign: "center",
        paddingTop: 50,
        paddingBottom: 100,
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
        lineHeight: 20,
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
    resultsCard: {
        marginBottom: 12,
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
    resultsText: {
        flex: 1,
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
        shadowOpacity: 0.1,
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
