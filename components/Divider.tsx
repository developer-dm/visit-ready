import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, View } from "react-native";

export type CustomDividerProps = {
    type: "horizontal" | "vertical";
    top?: number;
    bottom?: number;
    lightColor?: string;
    darkColor?: string;
};

export function Divider({
    type,
    top = 0,
    bottom = 0,
    lightColor,
    darkColor,
}: CustomDividerProps) {
    const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, "border");

    return (
        <View
            style={[
                type === "horizontal" ? { ...styles.horizontal, marginTop: top, marginBottom: bottom } : undefined,
                type === "vertical" ? { ...styles.vertical, marginLeft: top, marginRight: bottom } : undefined,
                { borderColor: borderColor },
            ]}
        />
    );
}

const styles = StyleSheet.create({
    horizontal: {
        width: '100%',
        borderBottomWidth: 1,
    },
    vertical: {
        height: '100%',
        borderLeftWidth: 1,
    },
});
