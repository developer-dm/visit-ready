import { CustomButton } from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTempStore } from "@/stores/tempStore";
import { ScrollView, StyleSheet, View } from "react-native";

export default function FinalResultsScreen() {
    const { tempCompletion } = useTempStore();
    const summary = tempCompletion.summary_for_provider

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.resultsSection}>
                <ThemedText style={styles.sectionTitle}>
                    Summary for your provider
                </ThemedText>

                <ThemedView style={styles.resultsCard}>
                    <ThemedText style={styles.resultsText} type="whitened">
                        {summary}
                    </ThemedText>

                    <CustomButton type="copy" copyText={summary} />
                </ThemedView>
            </View>
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
    },
    resultsSection: {
        paddingHorizontal: 24,
        marginBottom: 24,
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
        lineHeight: 22,
    },
});
