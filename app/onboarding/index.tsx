import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AppInfo } from "@/types/app";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LandingScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.logoSection}>
                    <ThemedView style={styles.logoContainer} type="dusked">
                        <Image source={require("@/assets/images/favicon.png")} style={styles.icon} />
                    </ThemedView>
                    <ThemedText style={styles.title} type="whitened">{AppInfo.name}</ThemedText>
                    <ThemedText style={styles.slogan} type="greyed">{AppInfo.slogan}</ThemedText>
                </View>

                <View style={styles.featuresSection}>
                    <View style={styles.featureItem}>
                        <ThemedView style={styles.featureIconContainer} type="dusked">
                            <MaterialIcons name="calendar-today" size={24} color="#3b82f6" />
                        </ThemedView>
                        <View style={styles.featureContent}>
                            <ThemedText style={styles.featureTitle} type="whitened">Track your Appointments</ThemedText>
                            <ThemedText style={styles.featureDescription} type="greyed">
                                Keep a record of all your medical appointment dates and providers
                            </ThemedText>
                        </View>
                    </View>

                    <View style={styles.featureItem}>
                        <ThemedView style={styles.featureIconContainer} type="dusked">
                            <MaterialIcons name="check" size={24} color="#3b82f6" />
                        </ThemedView>
                        <View style={styles.featureContent}>
                            <ThemedText style={styles.featureTitle} type="whitened">Be prepared</ThemedText>
                            <ThemedText style={styles.featureDescription} type="greyed">
                                Get reminders on items to bring and questions to ask the provider
                            </ThemedText>
                        </View>
                    </View>
                </View>

                <View style={styles.startSection}>
                    <Link asChild push href="/onboarding/form">
                        <TouchableOpacity style={styles.startButton}>
                            <Text style={styles.startButtonText}>Start Setup</Text>
                            <View style={styles.buttonIcon}>
                                <MaterialIcons name="arrow-forward" size={20} color="#ffffff" />
                            </View>
                        </TouchableOpacity>
                    </Link>

                    <Footer text="Setup takes less than 2 minutes" hasSpacer={true} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 100,
        paddingBottom: 40,
        justifyContent: 'center',
    },
    logoSection: {
        alignItems: 'center',
        paddingTop: 40,
    },
    logoContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    icon: {
        width: 80,
        height: 80,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
    },
    slogan: {
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 24,
        maxWidth: 400,
    },
    featuresSection: {
        paddingVertical: 40,
        gap: 24,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    featureIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    featureContent: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    featureDescription: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
    },
    startSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    startButton: {
        backgroundColor: '#3b82f6',
        borderRadius: 10,
        paddingVertical: 18,
        paddingHorizontal: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#3b82f6',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        minWidth: 200,
        minHeight: 60,
        marginBottom: 16,
    },
    startButtonText: {
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
