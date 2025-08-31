import { DatePicker } from "@/components/DatePicker";
import { Dropdown } from "@/components/Dropdown";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/utils/userContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function OnboardingSecondScreen() {
    const router = useRouter();
    const { signup } = useUser();

    // Dropdown variables
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
    ]);

    const handleNext = () => {
        setOpen(false);

        if (signup.DOB && signup.sex) {
            router.push("/onboarding/modal/final");
        } else {
            Alert.alert("Error", "Invalid birthdate or sex.");
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
            <TouchableWithoutFeedback onPress={() => { setOpen(false); }}>
                <View style={styles.content}>
                    {/* Header Section */}
                    <View style={styles.header}>
                        <View style={styles.progressContainer}>
                            <View style={styles.progressBar}>
                                <View style={styles.progressFill} />
                                <View style={styles.progressFill} />
                                <View style={styles.progressEmpty} />
                            </View>
                            <ThemedText style={styles.progressText} lightColor='#64748b' darkColor='#858585ff'>
                                Step 2 of 3
                            </ThemedText>
                        </View>

                        <ThemedText style={styles.pageTitle} lightColor='#1e293b' darkColor='#ffffffff'>
                            Personal Details
                        </ThemedText>

                        <ThemedText style={styles.pageSubtitle} lightColor='#64748b' darkColor='#858585ff'>
                            This helps us provide more personalized health insights
                        </ThemedText>
                    </View>

                    {/* Form Card */}
                    <ThemedView style={styles.formCard}>
                        <View style={styles.cardContent}>
                            {/* Info Section */}
                            <View style={styles.infoSection}>
                                <ThemedView style={styles.infoIconContainer} lightColor='#f1f5f9' darkColor='#1d1d1dff'>
                                    <MaterialIcons name="info" size={24} color="#3b82f6" />
                                </ThemedView>
                                <ThemedText style={styles.infoTitle} lightColor='#1e293b' darkColor='#ffffffff'>
                                    Demographic Information
                                </ThemedText>
                                <ThemedText style={styles.infoSubtitle} lightColor='#64748b' darkColor='#858585ff'>
                                    Age and biological sex help us customize health recommendations
                                </ThemedText>
                            </View>

                            {/* Form Fields */}
                            <View style={styles.formFields}>
                                <View style={styles.fieldGroup}>
                                    <ThemedText style={styles.fieldLabel} lightColor='#1e293b' darkColor='#ffffffff'>
                                        Date of Birth
                                    </ThemedText>
                                    <ThemedText style={styles.fieldHint} lightColor='#64748b' darkColor='#858585ff'>
                                        Used to calculate age-appropriate health recommendations
                                    </ThemedText>
                                    <DatePicker
                                        mode="date"
                                        display="spinner"
                                        value={signup.DOB}
                                        setValue={signup.setDOB}
                                    />
                                </View>

                                <View style={styles.fieldGroup}>
                                    <ThemedText style={styles.fieldLabel} lightColor='#1e293b' darkColor='#ffffffff'>
                                        Sex at Birth
                                    </ThemedText>
                                    <ThemedText style={styles.fieldHint} lightColor='#64748b' darkColor='#858585ff'>
                                        Helps determine relevant health screening guidelines
                                    </ThemedText>
                                    <Dropdown
                                        open={open}
                                        value={signup.sex}
                                        items={items}
                                        setOpen={setOpen}
                                        setValue={signup.setSex}
                                        setItems={setItems}
                                        placeholder="Select your biological sex"
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

                        <ThemedText style={styles.privacyText} lightColor='#64748b' darkColor='#858585ff'>
                            Your information is stored securely on your device
                        </ThemedText>
                    </View>

                    {/* Bottom Spacer */}
                    <View style={styles.bottomSpacer} />
                </View>
            </TouchableWithoutFeedback>
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
    fieldLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    fieldHint: {
        fontSize: 13,
        fontWeight: '400',
        marginBottom: 12,
        lineHeight: 18,
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
