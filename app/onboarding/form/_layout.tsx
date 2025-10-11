import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { ThemedView } from "@/components/ThemedView";
import { useDataStore } from "@/stores/dataStore";
import { useTempStore } from "@/stores/tempStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack, useRouter, useSegments } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ModalLayout() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const segments = useSegments();
    const currentRoute = segments[segments.length - 1];
    const { addSignupData } = useDataStore();
    const [debounce, setDebounce] = useState(false);
    const { signup, resetTempContext } = useTempStore();

    const handleClose = () => {
        Alert.alert('Close Form', 'Are you sure you want to discard this form?', [
            {
                text: 'Discard',
                onPress: () => {
                    resetTempContext();
                    router.dismiss();
                },
                style: "destructive",
            },
            {
                text: 'Cancel',
                style: 'cancel',
            },
        ]);
    };

    const handleBack = () => {
        if (debounce) return;
        setDebounce(true);

        if (currentRoute === "form") {
            handleClose();
        } else {
            router.back();
        };

        setTimeout(() => { setDebounce(false) }, 500);
    };

    const handleNext = () => {
        if (debounce) return;
        setDebounce(true);

        switch (currentRoute) {
            case 'form':
                router.push('/onboarding/form/second');
                break;
            case 'second':
                addSignupData(signup);
                router.dismissTo("/onboarding")
                router.replace("/onboarding/sign-in")
                resetTempContext();
                break;
        }

        setTimeout(() => { setDebounce(false) }, 500);
    };

    const checkRequirements = () => {
        switch (currentRoute) {
            case 'form':
                if (signup.DOB && signup.sex && signup.language) return true;
                break;
            case 'second':
                if (signup.acceptedTerms) return true;
                break;
        }
    };

    const meetsRequirements = checkRequirements();

    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="second" options={{ headerShown: false }} />
            </Stack>

            <ThemedView style={[styles.navigationSection, { paddingBottom: insets.bottom }]}>
                <View style={styles.buttonRow}>
                    <Button type="bordered" style={styles.backButton} onPress={handleBack}>
                        <MaterialIcons
                            name={currentRoute === "form" ? 'close' : 'arrow-back'}
                            size={20}
                            color="#64748b"
                        />
                        <Text style={styles.backButtonText}>
                            {currentRoute === "form" ? 'Exit' : 'Back'}
                        </Text>
                    </Button>

                    <Button
                        style={[styles.primaryButton, !meetsRequirements && styles.primaryButtonDisabled]}
                        disabled={!meetsRequirements}
                        onPress={handleNext}
                    >
                        <Text style={[styles.primaryButtonText, !meetsRequirements && styles.primaryButtonTextDisabled]}>
                            {currentRoute === "second" ? 'Finish' : 'Continue'}
                        </Text>
                        <View style={styles.buttonIcon}>
                            <MaterialIcons
                                name={currentRoute === "second" ? 'check' : 'arrow-forward'}
                                size={20}
                                color={meetsRequirements ? '#ffffff' : "#94a3b8"}
                            />
                        </View>
                    </Button>
                </View>

                <Footer hasSpacer={false} text="Your information is encrypted and stored on your device" />
            </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
    navigationSection: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 24,
        paddingTop: 16,
        borderTopWidth: 1,
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
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
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
        borderRadius: 10,
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
        shadowRadius: 10,
        minWidth: 160,
        minHeight: 60,
    },
    primaryButtonDisabled: {
        backgroundColor: '#b4b6bcff',
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
