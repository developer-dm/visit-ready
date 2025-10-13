import { CustomButton } from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTempStore } from "@/stores/tempStore";
import { ScrollView, StyleSheet, View } from "react-native";

export default function SecondResultsScreen() {
    const { tempCompletion } = useTempStore();
    const expectations = tempCompletion.what_to_expect
    const brief = expectations.brief
    const steps = expectations.steps

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
                <CustomButton type="copy" copyText={item} />
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
                What to Expect at Your Visit
            </ThemedText>

            <ThemedView style={styles.resultsCard}>
                <ThemedText style={styles.resultsText} type="whitened">
                    {brief}
                </ThemedText>
                <CustomButton type="copy" copyText={brief} />
            </ThemedView>

            {renderSteps()}
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
    numberBadge: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#3b82f6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    numberText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ffffff',
    },
    resultsCard: {
        marginBottom: 12,
        padding: 16,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
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
        textAlign: 'left',
    },
});
