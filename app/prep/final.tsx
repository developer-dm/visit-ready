import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import DataFormatterService from "@/utils/dataFormatterService";
import { useUser } from "@/utils/userContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PrepFinalScreen() {
    const router = useRouter();
    const { prep } = useUser();

    const handleNext = () => {
        if (!prep) return;
        router.dismissTo("/(tabs)")
        router.replace({
            pathname: "/questions",
            params: {
                data: JSON.stringify(prep)
            },
        });
    };

    const handleBack = () => {
        router.back();
    };

    const userDataEntries = Object.entries(prep).filter(([key, value]) => {
        return typeof value !== "function" && key !== "id" && key!== "questions";
    });

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.content}>
                {/* Header Section */}
                <View style={styles.header}>
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <View style={styles.progressFill} />
                            <View style={styles.progressFill} />
                            <View style={styles.progressFill} />
                            <View style={styles.progressFill} />
                        </View>
                        <ThemedText style={styles.progressText} type="greyed">
                            Step 4 of 4
                        </ThemedText>
                    </View>
                </View>

                {/* Review Card */}
                <ThemedView style={styles.reviewCard}>
                    <View style={styles.cardContent}>
                        {/* Info Section */}
                        <View style={styles.infoSection}>
                            <ThemedView style={styles.infoIconContainer} type="dusked">
                                <MaterialIcons name="check-circle" size={24} color="#10b981" />
                            </ThemedView>
                            <ThemedText style={styles.infoTitle} type="whitened">
                                Confirm your information
                            </ThemedText>
                            <ThemedText style={styles.infoSubtitle} type="greyed">
                                All information is encrypted on your device
                            </ThemedText>
                        </View>

                        {/* User Details */}
                        <View style={styles.detailsSection}>
                            {userDataEntries.length > 0 ? (userDataEntries.map(([key, value]) => {
                                if (key === "appointmentDate" && typeof value === 'string') {
                                    value = new Date(value);
                                }
                                return (
                                    <ThemedView key={key} style={styles.detailItem}>
                                        <ThemedText style={styles.detailLabel} type="greyed">
                                            {DataFormatterService.toReadableString(key, 'label')}
                                        </ThemedText>
                                        <ThemedText style={styles.detailValue} type="whitened">
                                            {DataFormatterService.toReadableString(value)}
                                        </ThemedText>
                                    </ThemedView>
                                );
                            })
                            ) : (
                                <View style={styles.noDataContainer}>
                                    <ThemedText style={styles.noDataText} type="greyed">
                                        No information available
                                    </ThemedText>
                                </View>
                            )}
                        </View>
                    </View>
                </ThemedView>

                {/* Navigation Section */}
                <View style={styles.navigationSection}>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                            <MaterialIcons name="arrow-back" size={20} color="#64748b" />
                            <Text style={styles.backButtonText}>Back</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={handleNext}
                        >
                            <Text style={styles.primaryButtonText}>
                                Finish
                            </Text>
                            <View style={styles.buttonIcon}>
                                <MaterialIcons
                                    name="check"
                                    size={20}
                                    color="#ffffff"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <Footer hasSpacer={true} />
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
    content: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 20,
        alignItems: 'center',
    },
    progressContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    progressBar: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 8,
    },
    progressFill: {
        width: 24,
        height: 4,
        backgroundColor: '#3b82f6',
        borderRadius: 2,
    },
    progressText: {
        fontSize: 12,
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    reviewCard: {
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
    cardContent: {
        padding: 24,
    },
    infoSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    infoIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 8,
    },
    infoSubtitle: {
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 20,
        maxWidth: 280,
    },
    detailsSection: {
        gap: 12,
        marginBottom: 28,
    },
    detailItem: {
        paddingVertical: 12,
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
    termsSection: {
        width: '100%',
    },
    termsContainer: {
        borderRadius: 16,
        borderWidth: 1,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 20,
    },
    termsTextContainer: {
        flex: 1,
        marginLeft: 12,
    },
    termsText: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        flexWrap: "wrap"
    },
    termsLink: {
        fontWeight: '500',
        textDecorationLine: 'underline',
        flexWrap: "wrap"
    },
    navigationSection: {
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 16,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#d1d1d1ff',
        backgroundColor: '#f8fafc',
        minWidth: 100,
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
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#3b82f6',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        minWidth: 160,
        minHeight: 60,
    },
    primaryButtonDisabled: {
        backgroundColor: '#e2e8f0',
        shadowOpacity: 0,
    },
    primaryButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ffffff',
        marginRight: 12,
    },
    primaryButtonTextDisabled: {
        color: '#94a3b8',
    },
    buttonIcon: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#ffffff33',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

