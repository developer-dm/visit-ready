import { Button } from "@/components/Button";
import { FormatDateString } from "@/components/DatePicker";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuthStore } from "@/utils/authStore";
import { useUser } from "@/utils/userContext";
import Checkbox from "expo-checkbox";
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function OnboardingFinalScreen() {
  const { completeOnboarding } = useAuthStore();

  const { signup, clearUserContext } = useUser();

  const labels: Record<string, string> = {
    firstName: "First Name",
    lastName: "Last Name",
    DOB: "Date of Birth",
    sex: "Sex",
    acceptedTerms: "Accepted Terms",
  };

  const handleNext = () => {
    if (signup.acceptedTerms) {
      //Add permanent storage of userContext
      completeOnboarding();
      clearUserContext();
    } else {
      Alert.alert("Error", "Please accept the terms and conditions.");
    };
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Step 3
      </ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>
        Confirm your information below
      </ThemedText>

      <ThemedView type="card">
        <ScrollView style={styles.scrollContainer}>
          {Object.entries(signup).map(([key, value]) => {
            if (typeof value === "function" || key === "acceptedTerms") return null;

            //special case: date
            if (key === "DOB") {
              return (
                <View key={key} style={styles.keyView}>
                  <ThemedText type="overhead" style={styles.overhead}>{labels[key]}</ThemedText>
                  <ThemedText type="default" style={styles.default}>{value ? FormatDateString(value as Date) : "Not Provided"}</ThemedText>
                </View>
              );
            }

            //default case
            return (
              <View key={key} style={styles.keyView}>
                <ThemedText type="overhead" style={styles.overhead}>{labels[key]}</ThemedText>
                <ThemedText type="default" style={styles.default}>{value as string || "Not Provided"}</ThemedText>
              </View>
            );
          })}
        </ScrollView>

        <TouchableOpacity style={styles.checkboxList} onPress={() => signup.setAcceptedTerms(!signup.acceptedTerms)}>
          <Checkbox value={signup.acceptedTerms} onValueChange={signup.setAcceptedTerms} />
          <ThemedText type="default" style={{ marginLeft: 10, fontSize: 10, textAlign: "left" }}>I have read and agree to the Terms and Conditions.</ThemedText>
        </TouchableOpacity>

        <Button type="dark" onPress={handleNext} style={{ marginTop: 30 }}>
          <ThemedText type="default" style={{ color: "#ffffffff" }}>Finish</ThemedText>
        </Button>
      </ThemedView>
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
  scrollContainer: {
    width: "100%",
    height: 200,
  },
  keyView: {
    width: "100%"
  },
  overhead: {
    marginBottom: 5,
  },
  default: {
    marginBottom: 5,
    textAlign: "left",
    color: "#0095ffff",
    width: "100%",
  },
  checkboxList: {
    width: "100%",
    height: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});