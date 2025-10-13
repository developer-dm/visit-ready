import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { ThemedView } from "@/components/ThemedView";
import { DataFormatterService } from "@/services/dataFormatter";
import { scheduleNotification } from "@/services/notifications";
import { useDataStore } from "@/stores/dataStore";
import { useTempStore } from "@/stores/tempStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack, router, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AppointmentPrepLayout() {
    const insets = useSafeAreaInsets();
    const { signup, addAppointment } = useDataStore();
    const segments = useSegments();
    const currentRoute = segments[segments.length - 1];
    const [debounce, setDebounce] = useState(false);

    const { id, appointment, resetTempContext, assignNewId } = useTempStore();

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

        if (currentRoute === "prep") {
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
                addAppointment(appointment, id);
                if (signup?.notifications && appointment.appointmentDate) {
                    scheduleNotification(
                        appointment.provider,
                        DataFormatterService.toReadableString(appointment.appointmentType),
                        appointment.appointmentDate,
                    )
                };
                router.dismissTo("/(tabs)");
                router.replace("/results");
                break;
        }

        setTimeout(() => { setDebounce(false) }, 500);
    };

    const checkRequirements = () => {
        switch (currentRoute) {
            case 'prep':
                if (appointment.appointmentType && appointment.appointmentDate && appointment.provider) return true;
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

    useEffect(() => {
        if (id === "") {
            assignNewId();
        };
    })

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
        minWidth: 160,
        minHeight: 60,
    },
    primaryButtonDisabled: {
        backgroundColor: '#b4b6bcff',
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
