import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { ThemedView } from "@/components/ThemedView";
import ROUTES from "@/constants/Routes";
import useTempStore from "@/stores/tempStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack, router, useSegments } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ResultsLayout() {
    const insets = useSafeAreaInsets();
    const segments = useSegments();
    const currentRoute = segments[segments.length - 1];
    const [debounce, setDebounce] = useState(false);
    const { resetTempContext } = useTempStore();

    const handleClose = () => {
        Alert.alert('Exit', 'Are you sure you want to exit?', [
            {
                text: 'Exit', style: "destructive",
                onPress: () => {
                    resetTempContext();
                    router.replace(ROUTES.DASHBOARD);
                },
            },
            { text: 'Cancel', style: 'cancel' },
        ]);
    };

    const handleBack = () => {
        if (debounce) return;
        setDebounce(true);

        router.back();

        setTimeout(() => { setDebounce(false) }, 500);
    };

    const handleNext = () => {
        if (debounce) return;
        setDebounce(true);

        switch (currentRoute) {
            case 'second':
                router.push(ROUTES.RESULTS_3);
                break;
            case 'third':
                router.push(ROUTES.RESULTS_4);
                break;
            case 'fourth':
                router.push(ROUTES.RESULTS_FINAL);
                break;
            case 'final':
                handleClose();
                break;
        }

        setTimeout(() => { setDebounce(false) }, 500);
    };

    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="second" options={{ headerShown: false }} />
                <Stack.Screen name="third" options={{ headerShown: false }} />
                <Stack.Screen name="fourth" options={{ headerShown: false }} />
                <Stack.Screen name="final" options={{ headerShown: false }} />
            </Stack>

            {currentRoute !== 'results' && (
                <ThemedView style={[styles.navigationSection, { paddingBottom: insets.bottom }]}>
                    <View style={[styles.buttonRow, currentRoute !== "second" ? { justifyContent: 'space-between' } : { justifyContent: 'center' }]}>
                        {currentRoute !== "second" && (
                            <Button
                                type="bordered"
                                style={styles.backButton}
                                onPress={handleBack}
                            >
                                <MaterialIcons
                                    name={'arrow-back'}
                                    size={20}
                                    color="#64748b"
                                />
                                <Text style={styles.backButtonText}>
                                    Back
                                </Text>
                            </Button>
                        )}

                        <Button
                            style={styles.primaryButton}
                            onPress={handleNext}
                        >
                            <Text style={styles.primaryButtonText}>
                                {currentRoute === "final" ? "Finish" : "Continue"}
                            </Text>
                            <View style={styles.buttonIcon}>
                                <MaterialIcons
                                    name={currentRoute === "final" ? "check" : "arrow-forward"}
                                    size={20}
                                    color={'#ffffff'}
                                />
                            </View>
                        </Button>
                    </View>

                    <Footer type="bottom" text="AI can make mistakes. This is not medical advice." />
                </ThemedView >
            )}
        </>
    );
}

const styles = StyleSheet.create({
    navigationSection: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: 16,
        paddingHorizontal: 24,
        borderTopWidth: 1,
    },
    buttonRow: {
        flexDirection: 'row',
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
