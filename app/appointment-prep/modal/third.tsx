import { Textbox } from "@/components/Textbox";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/utils/userContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function PrepThirdScreen() {
    const router = useRouter();
    const { prep } = useUser();

    const handleNext = () => {
        if (prep.visitGoal && prep.specificWorries) {
            router.push("/appointment-prep/modal/final")
        } else {
            Alert.alert("Error", "Invalid answer");
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="never"
            showsVerticalScrollIndicator={false}
        >
            <View style={{ flex: 1 }}>
                {/* Header Section */}
                <View style={styles.header}>
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <View style={styles.progressFill} />
                            <View style={styles.progressFill} />
                            <View style={styles.progressFill} />
                            <View style={styles.progressEmpty} />
                        </View>
                        <ThemedText style={styles.progressText} type="greyed">
                            Step 3 of 4
                        </ThemedText>
                    </View>

                    <ThemedText style={styles.pageTitle} type="whitened">
                        Visit Goals
                    </ThemedText>

                    <ThemedText style={styles.pageSubtitle} type="greyed">
                        Help us understand what you hope to achieve from this appointment
                    </ThemedText>
                </View>

                {/* Form Card */}
                <ThemedView style={styles.formCard}>
                    <View style={styles.cardContent}>
                        {/* Welcome Message */}
                        <View style={styles.welcomeSection}>
                            <ThemedView style={styles.welcomeIconContainer} type="dusked">
                                <MaterialIcons name="track-changes" size={32} color="#3b82f6" />
                            </ThemedView>
                            <ThemedText style={styles.welcomeTitle} type="whitened">
                                Your Expectations
                            </ThemedText>
                            <ThemedText style={styles.welcomeSubtitle} type="greyed">
                                Share your goals and concerns to help your provider better understand your needs
                            </ThemedText>
                        </View>

                        {/* Form Fields */}
                        <View style={styles.formFields}>
                            <View style={styles.fieldGroup}>
                                <ThemedText style={styles.fieldLabel} type="whitened">
                                    What do you hope to get out of this visit?
                                </ThemedText>
                                <Textbox
                                    placeholder="e.g. relief from pain"
                                    onChangeText={prep.setVisitGoal}
                                    value={prep.visitGoal}
                                />
                            </View>

                            <View style={styles.fieldGroup}>
                                <ThemedText style={styles.fieldLabel} type="whitened">
                                    Do you have any specific worries?
                                </ThemedText>
                                <Textbox
                                    placeholder="e.g. side effects of medication"
                                    onChangeText={prep.setSpecificWorries}
                                    value={prep.specificWorries}
                                />
                            </View>

                            <View style={styles.fieldGroup}>
                                <ThemedText style={styles.fieldLabel} type="whitened">
                                    Anything else you want to discuss? <ThemedText style={styles.optionalText} type="dusked">(optional)</ThemedText>
                                </ThemedText>
                                <Textbox
                                    placeholder="e.g. lifestyle changes"
                                    onChangeText={prep.setMiscDiscussion}
                                    value={prep.miscDiscussion}
                                />
                            </View>
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

                        <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
                            <Text style={styles.primaryButtonText}>Continue</Text>
                            <View style={styles.buttonIcon}>
                                <MaterialIcons name="arrow-forward" size={20} color="#ffffff" />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <ThemedText style={styles.privacyText} type="greyed">
                        Your responses help create a personalized preparation checklist
                    </ThemedText>
                </View>

                {/* Bottom Spacer */}
                <View style={styles.bottomSpacer} />
            </View>
        </KeyboardAwareScrollView>
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
    progressEmpty: {
        width: 24,
        height: 4,
        backgroundColor: '#e2e8f0',
        borderRadius: 2,
    },
    progressText: {
        fontSize: 12,
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    pageSubtitle: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 22,
        maxWidth: 300,
    },
    formCard: {
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
    welcomeSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    welcomeIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    welcomeTitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 8,
    },
    welcomeSubtitle: {
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 20,
        maxWidth: 280,
    },
    formFields: {
        gap: 24,
    },
    fieldGroup: {
        width: '100%',
    },
    fieldLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    optionalText: {
        fontWeight: '400',
        fontSize: 14,
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
    primaryButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ffffff',
        marginRight: 12,
    },
    buttonIcon: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#ffffff33',
        alignItems: 'center',
        justifyContent: 'center',
    },
    privacyText: {
        fontSize: 12,
        fontWeight: '400',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    bottomSpacer: {
        height: 40,
    },
});
