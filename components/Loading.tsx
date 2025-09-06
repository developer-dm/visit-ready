import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CircleFade } from 'react-native-animated-spinkit';

type LoadingScreenProps = {
    message?: string;
    subMessage?: string;
    spinnerSize?: number;
    spinnerColor?: string;
};

export default function LoadingScreen({
    message = 'Loading...',
    subMessage,
    spinnerSize = 70,
    spinnerColor = '#3b82f6',
}: LoadingScreenProps) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <ThemedText style={styles.message} type="whitened">{message}</ThemedText>
                {subMessage && (
                    <ThemedText style={styles.subMessage} type="greyed">{subMessage}</ThemedText>
                )}

                <View style={styles.midSpacer} />

                <View style={styles.spinnerContainer}>
                    <CircleFade size={spinnerSize} color={spinnerColor} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        backgroundColor: '#000000',
        opacity: 0.9,
        zIndex: 9999,
    },
    content: {
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 32,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        maxWidth: 320,
        width: '100%',
    },
    message: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 8,
    },
    subMessage: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 24,
    },
    midSpacer: {
        height: 40,
    },
    spinnerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
