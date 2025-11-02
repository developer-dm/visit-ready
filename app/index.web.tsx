import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function WebScreen() {
    const iconSource = require("../assets/images/favicon.png");

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <img
                    src={iconSource.uri}
                    alt="Visit Ready Logo"
                    style={styles.icon}
                />
            </View>
            <Text style={styles.appTitle}>Visit Ready</Text>
            <Text style={styles.tagline}>Make the most of every visit</Text>
            <Text style={styles.description}>
                Keep all your medical appointments in one place
                {'\n'}
                Generate discussion questions and goals based on your symptoms and priorities
            </Text>
            <Text style={styles.downloadTitle}>Download the app on your mobile device</Text>
            <Text style={styles.footerText}>Built to improve healthcare experiences for everyone</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: "10%",
    },
    logoContainer: {
        width: 250,
        height: 250,
        borderRadius: 40,
        backgroundColor: '#dededeff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    icon: {
        width: 250,
        height: 250,
        objectFit: 'contain'
    },
    appTitle: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#212e43',
        textAlign: 'center',
        marginBottom: 16,
    },
    tagline: {
        fontSize: 20,
        color: '#64748b',
        textAlign: 'center',
        fontWeight: '500',
        marginBottom: 32,
    },
    description: {
        fontSize: 20,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 26,
        marginBottom: 48,
    },
    downloadTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#212e43',
        textAlign: 'center',
        marginBottom: 16,
    },
    footerText: {
        fontSize: 20,
        color: '#64748b',
        textAlign: 'center',
        fontStyle: 'italic',
    },
});
