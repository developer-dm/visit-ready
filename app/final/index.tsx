import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View } from "react-native";

export default function FinalScreen() {
    return (
        <View style={styles.container}>
            <ThemedText type="subtitle">Generating Questions...</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
});
