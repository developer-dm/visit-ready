import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { CircleFade } from 'react-native-animated-spinkit';

type LoadingScreenProps = {
    visible: boolean;
    message?: string;
    subMessage?: string;
    spinnerSize?: number;
    spinnerColor?: string;
};

export default function LoadingScreen({
    visible,
    message = 'Loading...',
    subMessage,
    spinnerSize = 70,
    spinnerColor = '#3b82f6',
}: LoadingScreenProps) {
    return (
        <Modal
            visible={visible}
            animationType={"fade"}
            statusBarTranslucent={true}
        >
            <View style={styles.overlay}>
                <View style={styles.content}>
                    <Text style={styles.message}>{message}</Text>
                    {subMessage && (
                        <Text style={styles.subMessage}>{subMessage}</Text>
                    )}
                    <View style={styles.midSpacer} />
                    <CircleFade size={spinnerSize} color={spinnerColor} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        backgroundColor: '#000000',
        zIndex: 10000,
        elevation: 10000,
    },
    content: {
        alignItems: 'center',
    },
    message: {
        color: '#ffffffff',
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 8,
    },
    subMessage: {
        color: '#858585ff',
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 24,
    },
    midSpacer: {
        height: 40,
    },
});
