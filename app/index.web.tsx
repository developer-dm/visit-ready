import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function WebScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.appTitle}>Visit Ready</Text>
            <Text style={styles.tagline}>Make the most of every visit</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
});
