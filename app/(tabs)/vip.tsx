import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View } from "react-native";

export default function VipScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">
        VIP Screen
      </ThemedText>
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
