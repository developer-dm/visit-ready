import { CopyButton } from "@/components/Copy";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useTempStore from "@/stores/tempStore";
import { ScrollView, StyleSheet } from "react-native";

export default function FinalResultsScreen() {
    const { tempCompletion } = useTempStore();
    const summary = tempCompletion.summary_for_provider

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <ThemedText style={styles.sectionTitle}>
                Summary for your provider
            </ThemedText>

            <ThemedView style={styles.resultsCard}>
                <ThemedText style={styles.resultsText} type="whitened">
                    {summary}
                </ThemedText>

                <CopyButton textToCopy={summary} />
            </ThemedView>
        </ScrollView>
    )
};

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
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        marginBottom: 12,
        borderRadius: 10,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    resultsText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
    },
});
