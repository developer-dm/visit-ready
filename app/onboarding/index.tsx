import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PrepInitialScreen() {
    return (
        <View style={styles.container}>
            {/* Main Content */}
            <View style={styles.content}>
                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <ThemedView style={styles.logoContainer}>
                        <Image source={require("@/assets/images/favicon.png")} style={styles.icon} />
                    </ThemedView>

                    <ThemedText style={styles.appTitle} lightColor='#1e293b' darkColor='#ffffffff'>
                        Visit Ready
                    </ThemedText>

                    <ThemedText style={styles.tagline} lightColor='#64748b' darkColor='#858585ff'>
                        Make the most of every medical visit
                    </ThemedText>
                </View>

                {/* Features Section */}
                <View style={styles.featuresSection}>
                    <View style={styles.featureItem}>
                        <ThemedView style={styles.featureIconContainer} lightColor='#f1f5f9' darkColor='#1d1d1dff'>
                            <MaterialIcons name="assignment" size={24} color="#3b82f6" />
                        </ThemedView>
                        <View style={styles.featureContent}>
                            <ThemedText style={styles.featureTitle} lightColor='#1e293b' darkColor='#ffffffff'>
                                Personalized Questions
                            </ThemedText>
                            <ThemedText style={styles.featureDescription} lightColor='#64748b' darkColor='#858585ff'>
                                Get tailored questions for your doctor based on your concerns
                            </ThemedText>
                        </View>
                    </View>

                    <View style={styles.featureItem}>
                        <ThemedView style={styles.featureIconContainer} lightColor='#f1f5f9' darkColor='#1d1d1dff'>
                            <MaterialIcons name="history" size={24} color="#3b82f6" />
                        </ThemedView>
                        <View style={styles.featureContent}>
                            <ThemedText style={styles.featureTitle} lightColor='#1e293b' darkColor='#ffffffff'>
                                Track Your Visits
                            </ThemedText>
                            <ThemedText style={styles.featureDescription} lightColor='#64748b' darkColor='#858585ff'>
                                Keep a record of all your appointments and progress
                            </ThemedText>
                        </View>
                    </View>

                    <View style={styles.featureItem}>
                        <ThemedView style={styles.featureIconContainer} lightColor='#f1f5f9' darkColor='#1d1d1dff'>
                            <MaterialIcons name="lightbulb" size={24} color="#3b82f6" />
                        </ThemedView>
                        <View style={styles.featureContent}>
                            <ThemedText style={styles.featureTitle} lightColor='#1e293b' darkColor='#ffffffff'>
                                Be Prepared
                            </ThemedText>
                            <ThemedText style={styles.featureDescription} lightColor='#64748b' darkColor='#858585ff'>
                                Never forget important questions or concerns again
                            </ThemedText>
                        </View>
                    </View>
                </View>

                {/* CTA Section */}
                <View style={styles.ctaSection}>
                    <Link asChild push href="/onboarding/modal">
                        <TouchableOpacity style={styles.primaryButton}>
                            <Text style={styles.primaryButtonText}>Get Started</Text>
                            <View style={styles.buttonIcon}>
                                <MaterialIcons name="arrow-forward" size={20} color="#ffffff" />
                            </View>
                        </TouchableOpacity>
                    </Link>

                    <ThemedText style={styles.ctaSubtext} lightColor='#64748b' darkColor='#858585ff'>
                        Setup takes less than 2 minutes
                    </ThemedText>
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
        paddingTop: 60,
        paddingBottom: 40,
        justifyContent: 'space-between',
    },
    heroSection: {
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
        shadowOpacity: 0.15,
        shadowRadius: 20,
    },
    icon: {
        width: 80,
        height: 80,
    },
    appTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
        letterSpacing: -0.5,
    },
    tagline: {
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 24,
        maxWidth: 280,
    },
    featuresSection: {
        paddingVertical: 20,
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
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.15,
        shadowRadius: 20,
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
    ctaSection: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    primaryButton: {
        backgroundColor: '#3b82f6',
        borderRadius: 20,
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
        shadowRadius: 16,
        minWidth: 200,
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
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ctaSubtext: {
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 16,
    },
});
