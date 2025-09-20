import { Button } from "@/components/Button";
import { Dropdown } from "@/components/Dropdown";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/utils/userContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function OnboardingSecondScreen() {
    const router = useRouter();
    const { signup } = useUser();

    // Dropdown states
    const [languageItems] = useState([
        { label: 'English', value: 'en' },
        { label: 'Spanish (Español)', value: 'es' },
        { label: 'Chinese (中文)', value: 'zh' },
        { label: 'Tagalog (Filipino)', value: 'tl' },
        { label: 'Vietnamese (Tiếng Việt)', value: 'vi' },
        { label: 'Arabic (العربية)', value: 'ar' },
        { label: 'French (Français)', value: 'fr' },
        { label: 'Haitian Creole (Kreyòl Ayisyen)', value: 'ht' },
        { label: 'Korean (한국어)', value: 'ko' },
        { label: 'Russian (Русский)', value: 'ru' },
    ]);


    const handleNext = () => {
        if (signup.language) {
            router.push("/onboarding/form/final");
        } else {
            Alert.alert("Error", "Please enter a preferred language.");
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
                        </View>
                        <ThemedText style={styles.progressText} type="greyed">Step 2 of 3</ThemedText>
                    </View>
                </View>

                {/* Form */}
                <ThemedView style={styles.formCard}>
                    <View style={styles.cardContent}>
                        <View style={styles.infoSection}>
                            <ThemedView style={styles.infoIconContainer} type="dusked">
                                <MaterialIcons name="question-answer" size={32} color="#3b82f6" />
                            </ThemedView>
                            <ThemedText style={styles.infoTitle} type="whitened">Preferences</ThemedText>
                            <ThemedText style={styles.infoSubtitle} type="greyed"> We'll use this information to personalize your appointment preparation</ThemedText>
                        </View>

                        <View style={styles.formFields}>
                            {/* Language */}
                            <View style={styles.fieldGroup}>
                                <ThemedText type="overheader">Primary language spoken</ThemedText>
                                <Dropdown
                                    placeholder="Required"
                                    items={languageItems}
                                    value={signup.language}
                                    setValue={signup.setLanguage}
                                />
                            </View>

                            {/* Notifications */}
                            <View style={styles.fieldGroup}>
                                <ThemedText type="overheader">Allow notifications</ThemedText>
                                <Button
                                    type="bordered"
                                    style={styles.notificationsContainer}
                                    onPress={() => signup.setNotifications(!signup.notifications)}
                                    activeOpacity={0.7}
                                >
                                    <Checkbox
                                        value={signup.notifications}
                                        onValueChange={signup.setNotifications}
                                        color={signup.notifications ? "#3b82f6" : undefined}
                                    />
                                    <View style={styles.notificationsTextContainer}>
                                        <ThemedText style={styles.notificationsText} type="greyed">
                                            I want to receive notifications
                                        </ThemedText>
                                    </View>
                                </Button>
                            </View>
                        </View>
                    </View>
                </ThemedView>

                {/* Navigation */}
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

                    <Footer hasSpacer={true} />
                </View>
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
        maxWidth: 320,
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
    formFields: {
        gap: 28,
    },
    fieldGroup: {
        width: '100%',
    },
    fieldHint: {
        fontSize: 13,
        fontWeight: '400',
        marginBottom: 12,
        lineHeight: 18,
    },
    notificationsContainer: {
        borderRadius: 16,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 16,
    },
    notificationsTextContainer: {
        flex: 1,
        marginLeft: 12,
    },
    notificationsText: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        flexWrap: "wrap",
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
