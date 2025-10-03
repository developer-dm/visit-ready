import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function WebScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.appTitle}>
                    Visit Ready
                </Text>

                <Text style={styles.tagline}>
                    Make the most of every visit
                </Text>

                <Text style={styles.description}>
                    Keep a record of all your medical appointment dates and providers
                    {'\n'}
                    Get reminders on items to bring and questions to ask the provider
                </Text>

                <Text style={styles.downloadTitle}>
                    Download the app on your mobile device
                </Text>

                <Text style={styles.platformText}>
                    Available on iOS and Android
                </Text>

                <Text style={styles.footerText}>
                    Built to improve healthcare experiences for everyone
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    content: {
        alignItems: 'center',
        maxWidth: 600,
    },
    appTitle: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 16,
    },
    tagline: {
        fontSize: 20,
        color: '#94a3b8',
        textAlign: 'center',
        fontWeight: '500',
        marginBottom: 32,
    },
    description: {
        fontSize: 18,
        color: '#94a3b8',
        textAlign: 'center',
        lineHeight: 26,
        marginBottom: 48,
    },
    downloadTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 16,
    },
    platformText: {
        fontSize: 18,
        color: '#3b82f6',
        textAlign: 'center',
        fontWeight: '500',
        marginBottom: 48,
    },
    footerText: {
        fontSize: 16,
        color: '#94a3b8',
        textAlign: 'center',
        fontStyle: 'italic',
    },
});
