import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Clipboard from 'expo-clipboard';
import { useState } from "react";
import { TouchableOpacity, type TouchableOpacityProps } from "react-native";

export type ButtonProps = TouchableOpacityProps & {
    copyText?: string;
    type?: "copy";
};

export function CustomButton({
    copyText,
    type,
}: ButtonProps) {
    const [color, setColor] = useState('#64748b');

    const copyToClipboard = async () => {
        if (copyText) await Clipboard.setStringAsync(copyText);
    };

    const copyColor = () => {
        setColor('#3b82f6');
        setTimeout(() => setColor('#64748b'), 500);
    };

    if (type === "copy") return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
                copyToClipboard();
                copyColor();
            }}
        >
            <MaterialIcons name="content-copy" size={20} color={color} />
        </TouchableOpacity>
    );
}
