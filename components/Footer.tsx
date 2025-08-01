import { ThemedText } from "@/components/ThemedText";
import { version } from "@/package.json";
import { StyleSheet, View } from "react-native";

export function Footer() {
    return (
        <View style={styles.container}>
            <ThemedText type="footer">Visit Ready | {version}</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 5,
        width: "100%",
    },
});