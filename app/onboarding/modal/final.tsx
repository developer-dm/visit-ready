import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuthStore } from "@/utils/authStore";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Main() {
  const { completeOnboarding } = useAuthStore();

  const [agreement, setAgreement] = useState(false);
  const firstName = "1";
  const lastName = "1";
  const DOB = "1";
  const sex = "1";

  const handleNext = () => {
    if (agreement) {
      completeOnboarding();
    } else {
      Alert.alert("Error", "Please accept the terms and conditions.");
    };
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>Step 3</ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>Confirm your information below</ThemedText>
      <ThemedView type="card">
        <ThemedText type="overhead" style={styles.overhead}>First Name:</ThemedText>
        <ThemedText type="default" style={styles.default}>{firstName}</ThemedText>
        <ThemedText type="overhead" style={styles.overhead}>Last Name:</ThemedText>
        <ThemedText type="default" style={styles.default}>{lastName}</ThemedText>
        <ThemedText type="overhead" style={styles.overhead}>Date of Birth:</ThemedText>
        <ThemedText type="default" style={styles.default}>{DOB}</ThemedText>
        <ThemedText type="overhead" style={styles.overhead}>Sex:</ThemedText>
        <ThemedText type="default" style={styles.default}>{sex}</ThemedText>
        <TouchableOpacity style={styles.checkboxList} onPress={() => setAgreement(!agreement)}>
          <Checkbox value={agreement} onValueChange={setAgreement} />
          <ThemedText type="default" style={{ marginLeft: 10, fontSize: 16 }}>I accept the terms and conditions</ThemedText>
        </TouchableOpacity>
        <Button type={"dark"} onPress={handleNext} style={{ marginTop: 30 }}>
          <ThemedText type="default" style={{ color: "#ffffffff" }}>Finish</ThemedText>
        </Button>
      </ThemedView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  title: {
    position: "absolute",
    top: 40
  },
  subtitle: {
    position: "absolute",
    top: 100
  },
  overhead: {
    marginBottom: 10,
  },
  default: {
    marginBottom: 10,
    textAlign: "left",
    color: "#0095ffff",
    width: "100%",
  },
  checkboxList: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});