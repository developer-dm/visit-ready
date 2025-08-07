import { StyleSheet, TextInput, type TextInputProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type TextboxProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
    type?: "default";
};

export function Textbox({
    style,
    lightColor,
    darkColor,
    type = "default",
    ...rest
}: TextboxProps) {
    return (
        <TextInput
            style={[
                type === "default" ? styles.default : undefined,
                { color: useThemeColor({ light: lightColor, dark: darkColor }, "text") },
                { borderColor: useThemeColor({ light: lightColor, dark: darkColor }, "border") },
                style,
            ]}
            placeholderTextColor={useThemeColor({ light: lightColor, dark: darkColor }, "placeholderText")}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        height: 40,
        width: "100%",
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
    },
});