import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";

type TextboxProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
    lightBorder?: string;
    darkBorder?: string;
    type?: "default";
};

const Textbox = ({
    style,
    lightColor,
    darkColor,
    lightBorder = "#d1d1d1ff",
    darkBorder = "#393939ff",
    type = "default",
    ...rest
}: TextboxProps) => {
    const placeholderColor = useThemeColor({}, "placeholderText");
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "card");
    const borderColor = useThemeColor({ light: lightBorder, dark: darkBorder }, "border");

    return (
        <TextInput
            style={[
                { color, borderColor, backgroundColor },
                type === "default" ? styles.default : undefined,
                style,
            ]}
            placeholder="Optional"
            placeholderTextColor={placeholderColor}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
    },
});

export { Textbox, TextboxProps };

