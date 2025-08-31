import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View } from "react-native";

export default function CreateAccountScreen() {
  return (
    <View style={styles.container}>
      <ThemedText>Create Account Screen</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
