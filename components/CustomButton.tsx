import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Checkbox } from "expo-checkbox";
import * as Clipboard from 'expo-clipboard';
import { useState } from "react";
import { StyleSheet, TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { Button } from "./Button";
import { ThemedText } from "./ThemedText";

export type ButtonProps = TouchableOpacityProps & {
    value?: any;
    setValue?: (value: any) => void;
    placeholderText?: string;
    copyText?: string;
    type: "copy" | 'checker';
};

export function CustomButton({
    value,
    setValue,
    placeholderText,
    copyText,
    type,
}: ButtonProps) {
    const [color, setColor] = useState('#64748b');

    // Copy Button Actions
    const copyToClipboard = async () => {
        if (copyText) await Clipboard.setStringAsync(copyText);
    };

    const copyColor = () => {
        setColor('#3b82f6');
        setTimeout(() => setColor('#64748b'), 500);
    };

    if (type === "copy") return (
        <TouchableOpacity
            style={styles.copyButton}
            activeOpacity={0.3}
            onPress={() => {
                copyToClipboard();
                copyColor();
            }}
        >
            <MaterialIcons name="content-copy" size={15} color={color} />
        </TouchableOpacity>
    );

    if (type === "checker") return (
        <Button
            type="bordered"
            style={styles.settingsContainer}
            onPress={setValue}
            activeOpacity={0.7}
        >
            <Checkbox
                value={value}
                onValueChange={setValue}
                color={value ? "#3b82f6" : undefined}
            />
            <ThemedText style={styles.termsText} type="whitened">
                {placeholderText}
            </ThemedText>
        </Button>
    );
}

const styles = StyleSheet.create({
    copyButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 6,
        opacity: 0.5,
    },
    settingsContainer: {
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 18,
        paddingVertical: 14,
        gap: 10,
    },
    termsText: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        flexWrap: "wrap",
    },
});
