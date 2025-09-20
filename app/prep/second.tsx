import { Dropdown } from "@/components/Dropdown";
import { Footer } from "@/components/Footer";
import { Textbox } from "@/components/Textbox";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { DataTypes } from "@/utils/dataFormatterService";
import { useUser } from "@/utils/userContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function PrepSecondScreen() {
    const router = useRouter();
    const { prep } = useUser();
    const [concernStartItems] = useState(DataTypes.concernStartItems);
    const [concernSeverityItems] = useState(DataTypes.concernSeverityItems);

    const handleNext = () => {
        if (prep.mainConcern) {
            router.push("/prep/third")
        } else {
            Alert.alert("Error", "Please add a main health concern.");
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
            enableResetScrollToCoords={false}
            extraScrollHeight={5}
        >
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <View style={styles.progressFill} />
                            <View style={styles.progressFill} />
                            <View style={styles.progressEmpty} />
                            <View style={styles.progressEmpty} />
                        </View>
                        <ThemedText style={styles.progressText} type="greyed">Step 2 of 4</ThemedText>
                    </View>
                </View>

                {/* Form Card */}
                <ThemedView style={styles.formCard}>
                    <View style={styles.cardContent}>
                        {/* Welcome Message */}
                        <View style={styles.welcomeSection}>
                            <ThemedView style={styles.welcomeIconContainer} type="dusked">
                                <MaterialIcons name="favorite" size={32} color="#3b82f6" />
                            </ThemedView>
                            <ThemedText style={styles.welcomeTitle} type="whitened">Appointment Focus</ThemedText>
                            <ThemedText style={styles.welcomeSubtitle} type="greyed">All information is encrypted on your device</ThemedText>
                        </View>

                        {/* Form Fields */}
                        <View style={styles.formFields}>
                            <View style={styles.fieldGroup}>
                                <ThemedText type="overheader">What are the main health concerns of your appointment?</ThemedText>
                                <Textbox
                                    placeholder="Required"
                                    onChangeText={prep.setMainConcern}
                                    value={prep.mainConcern}
                                />
                            </View>

                            <View style={styles.fieldGroup}>
                                <ThemedText type="overheader">
                                    When did your concerns begin?
                                </ThemedText>
                                <Dropdown
                                    items={concernStartItems}
                                    value={prep.concernStart}
                                    setValue={prep.setConcernStart}
                                />
                            </View>

                            <View style={styles.fieldGroup}>
                                <ThemedText type="overheader">
                                    How would you rate the severity of your concerns 1-10?
                                </ThemedText>
                                <Dropdown
                                    items={concernSeverityItems}
                                    value={prep.concernSeverity}
                                    setValue={prep.setConcernSeverity}
                                />
                            </View>

                            <View style={styles.fieldGroup}>
                                <ThemedText type="overheader">Have you tried any treatments or remedies?</ThemedText>
                                <Textbox
                                    onChangeText={prep.setRemedies}
                                    value={prep.remedies}
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
                </View>

                <Footer hasSpacer={true} />
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
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
        zIndex: 2000,
        elevation: 2000,
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
    navigationSection: {
        paddingHorizontal: 24,
        alignItems: 'center',
        zIndex: 1000,
        elevation: 1000,
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
});
