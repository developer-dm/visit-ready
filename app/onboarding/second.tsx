import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Textbox } from "@/components/TextBox";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

export default function OnboardingSecondScreen() {
  const router = useRouter()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const handleNext = () => {
    Keyboard.dismiss();

    if (firstName && lastName) {
      router.push("/onboarding/third");
    } else {
      Alert.alert("Error", "Invalid first or last name.");
    };
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ThemedText type="title" style={styles.title}>Step 1</ThemedText>
        <ThemedText type="subtitle" style={styles.subtitle}>Please enter your name below</ThemedText>
        <ThemedView type="card">
          <ThemedText type="overhead">First Name</ThemedText>
          <Textbox
            placeholder="John"
            onChangeText={setFirstName}
            value={firstName}
            style={{ marginTop: 10 }}
          />
          <ThemedText type="overhead" style={{ marginTop: 10 }}>Last Name</ThemedText>
          <Textbox
            placeholder="Doe"
            onChangeText={setLastName}
            value={lastName}
            style={{ marginTop: 10 }}
          />
          <Button type={"dark"} onPress={handleNext} style={{ marginTop: 30 }}>
            <ThemedText type="default" style={{ color: "#ffffffff" }}>Next</ThemedText>
          </Button>
        </ThemedView>
        <Footer />
      </View>
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  title: {
    position: "absolute",
    top: 50
  },
  subtitle: {
    position: "absolute",
    top: 110
  },
});
