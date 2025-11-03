import React from 'react';
import { Modal, StyleSheet } from 'react-native';
import { CircleFade } from 'react-native-animated-spinkit';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

type LoadingScreenProps = {
    visible: boolean;
    message?: string;
    subMessage?: string;
    spinnerSize?: number;
    spinnerColor?: string;
};

const LoadingScreen = ({
    visible,
    message = 'Loading...',
    subMessage,
    spinnerSize = 70,
    spinnerColor = '#3b82f6',
}: LoadingScreenProps) => {
    return (
        <Modal
            visible={visible}
            animationType={"fade"}
            statusBarTranslucent={true}
        >
            <ThemedView style={styles.overlay}>
                <ThemedText type="whitened" style={styles.message}>{message}</ThemedText>
                {subMessage && (
                    <ThemedText type="greyed" style={styles.subMessage}>{subMessage}</ThemedText>
                )}
                <CircleFade style={styles.loader} size={spinnerSize} color={spinnerColor} />
            </ThemedView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        zIndex: 1000,
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
    loader: {
        marginTop: 40,
    },
});

export { LoadingScreen, LoadingScreenProps };

