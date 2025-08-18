import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Textbox } from "@/components/Textbox";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/utils/userContext";
import { useRouter } from "expo-router";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback } from "react-native";

export default function OnboardingSecondScreen() {
  const router = useRouter()

  const { signup } = useUser();

  const handleNext = () => {
    Keyboard.dismiss();

    if (signup.firstName && signup.lastName) {
      router.push("/onboarding/modal/second");
    } else {
      Alert.alert("Error", "Invalid first or last name.");
    };
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <ThemedText type="title" style={styles.title}>Step 1</ThemedText>
        <ThemedText type="subtitle" style={styles.subtitle}>Please enter your name below</ThemedText>
        <ThemedView type="card">
          <ThemedText type="overhead">First Name</ThemedText>
          <Textbox
            placeholder="John"
            onChangeText={signup.setFirstName}
            value={signup.firstName}
            style={{ marginTop: 10 }}
          />
          <ThemedText type="overhead" style={{ marginTop: 10 }}>Last Name</ThemedText>
          <Textbox
            placeholder="Doe"
            onChangeText={signup.setLastName}
            value={signup.lastName}
            style={{ marginTop: 10 }}
          />
          <Button type={"dark"} onPress={handleNext} style={{ marginTop: 30 }}>
            <ThemedText type="default" style={{ color: "#ffffffff" }}>Next</ThemedText>
          </Button>
        </ThemedView>
        <Footer />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    position: "absolute",
    top: 40
  },
  subtitle: {
    position: "absolute",
    top: 100
  },
});
