import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Clipboard from 'expo-clipboard';
import { useState } from "react";
import { StyleSheet, TouchableOpacity, type TouchableOpacityProps } from "react-native";

type CopyButtonProps = TouchableOpacityProps & {
    textToCopy: string;
};

const CopyButton = ({ textToCopy }: CopyButtonProps) => {
    const [color, setColor] = useState('#64748b');

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(textToCopy);
    };

    const copyColorChange = () => {
        setColor('#3b82f6');
        setTimeout(() => setColor('#64748b'), 500);
    };

    const handleCopy = () => {
        copyToClipboard();
        copyColorChange();
    };

    return (
        <TouchableOpacity
            style={styles.copyButton}
            activeOpacity={0.3}
            onPress={handleCopy}
        >
            <MaterialIcons
                name="content-copy"
                size={15}
                color={color}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    copyButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 6,
        opacity: 0.6,
    },
});

export { CopyButton, CopyButtonProps };

