import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { ThemedView } from "@/components/ThemedView";
import { useTempStore } from "@/stores/tempStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack, useRouter, useSegments } from "expo-router";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AppointmentPrepLayout() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const segments = useSegments();
    const currentRoute = segments[segments.length - 1];
    const { appointment, clearUserContext } = useTempStore();

    const handleClose = () => {
        Alert.alert('Close Form', 'Are you sure you want to discard this form?', [
            {
                text: 'Discard',
                onPress: () => {
                    router.dismiss();
                    clearUserContext();
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
        if (currentRoute === "prep") {
            handleClose();
        } else {
            router.dismiss();
        };
    };

    const handleNext = () => {
        switch (currentRoute) {
            case 'prep':
                router.push('/prep/second');
                break;
            case 'second':
                router.push('/prep/third');
                break;
            case 'third':
                router.push('/prep/final');
                break;
            case 'final':
                router.dismissTo("/(tabs)")
                router.replace("/questions")
                break;
        }
    };

    const checkRequirements = () => {
        switch (currentRoute) {
            case 'prep':
                if (appointment.appointmentType) return true;
                break;
            case 'second':
                if (appointment.mainConcern) return true;
                break;
            case 'third':
                if (appointment.visitGoal) return true;
                break;
            case 'final':
                return true;
        }
    };

    const meetsRequirements = checkRequirements();

    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="second" options={{ headerShown: false }} />
                <Stack.Screen name="third" options={{ headerShown: false }} />
                <Stack.Screen name="final" options={{ headerShown: false }} />
            </Stack>

            <ThemedView style={[styles.navigationSection, { paddingBottom: insets.bottom }]}>
                <View style={styles.buttonRow}>
                    <Button type="bordered" style={styles.backButton} onPress={handleBack}>
                        <MaterialIcons
                            name={currentRoute === "prep" ? 'close' : 'arrow-back'}
                            size={20}
                            color="#64748b"
                        />
                        <Text style={styles.backButtonText}>
                            {currentRoute === "prep" ? 'Exit' : 'Back'}
                        </Text>
                    </Button>

                    <Button
                        style={[styles.primaryButton, !meetsRequirements && styles.primaryButtonDisabled]}
                        disabled={!meetsRequirements}
                        onPress={handleNext}
                    >
                        <Text style={[styles.primaryButtonText, !meetsRequirements && styles.primaryButtonTextDisabled]}>
                            {currentRoute === "final" ? 'Finish' : 'Continue'}
                        </Text>
                        <View style={styles.buttonIcon}>
                            <MaterialIcons
                                name={currentRoute === "final" ? 'check' : 'arrow-forward'}
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
