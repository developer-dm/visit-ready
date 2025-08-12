import { StyleSheet, View, type ViewProps } from "react-native";

export type DividerProps = ViewProps & {
    top?: number;
    bottom?: number;
};

export function Divider({
    style,
    top,
    bottom,
    ...otherProps
}: DividerProps) {
    return (
        <View
            style={[
                top ? { marginTop: top } : { marginTop: 20 },
                bottom ? { marginBottom: bottom } : { marginBottom: 20 },
                styles.divider,
                style,
            ]}
            {...otherProps}
        />
    );
}

const styles = StyleSheet.create({
    divider: {
        backgroundColor: "#ccc",
        height: 1,
        width: "100%",
    },
});
