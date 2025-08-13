import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function ModalScreen() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/prep/modal/second")
  };

  return (
    <View style={styles.container}>
      <ThemedView type="card">
        <MaterialIcons name="create" size={50} color={"#004678"} />
        <ThemedText type="title">Prep</ThemedText>
        <ThemedText type="subtitle">Please answer the questions below</ThemedText>
        <Divider top={20} bottom={30} />
        <ThemedText type="overhead">What type of appointment is this?</ThemedText>
        <ThemedText type="overhead">When is your next appointment?</ThemedText>
        <ThemedText type="overhead">Who is your provider?</ThemedText>
        <Button onPress={handleNext} type="dark" style={{ marginTop: 30 }}>
          <ThemedText type="default" style={{ color: "#fff" }}>Next</ThemedText>
        </Button>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
