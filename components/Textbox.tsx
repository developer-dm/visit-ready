//Adds custom border/inside colors

import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";

export type TextboxProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
    lightBorder?: string;
    darkBorder?: string;
    type?: "default";
};

export function Textbox({
    style,
    lightColor,
    darkColor,
    lightBorder = "#d1d1d1ff",
    darkBorder = "#393939ff",
    type = "default",
    ...rest
}: TextboxProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
    const borderColor = useThemeColor({ light: lightBorder, dark: darkBorder }, "icon");

    return (
        <TextInput
            style={[
                { color, borderColor },
                type === "default" ? styles.default : undefined,
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
    },
});
