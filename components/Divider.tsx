import { StyleSheet, View } from "react-native";

export function Divider() {
    return (
        <View style={styles.divider} />
    );
}

const styles = StyleSheet.create({
    divider: {
        backgroundColor: "#ccc",
        height: 1,
        width: "100%",
        marginTop: 20,
        marginBottom: 30,
    },
});