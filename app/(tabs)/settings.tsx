import { Button } from "@/components/Button";
import { FormatDateString } from "@/components/DatePicker";
import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { logOut } from "@/utils/auth";
import { useAuthStore } from "@/utils/authStore";
import { getData, removeData } from "@/utils/dataStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

export default function SettingsScreen() {
  const { resetOnboarding } = useAuthStore();
  const [userSignup, setUserSignup] = useState(null);

  const labels: Record<string, string> = {
    firstName: "First Name",
    lastName: "Last Name",
    DOB: "Date of Birth",
    sex: "Sex",
    acceptedTerms: "Accepted Terms",
  };

  const clearData = () => {
    removeData("user:signup");
    removeData("user:appointments");
    resetOnboarding();
    logOut();
  };

  const handleDeletion = () => {
    Alert.alert('Delete account', 'Are you sure you want to delete your account? This action CANNOT be reversed once initiated.', [
      {
        text: 'Delete Account',
        onPress: () => clearData(),
        style: "destructive",
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout of your account?', [
      {
        text: 'Logout',
        onPress: () => logOut(),
        style: "destructive",
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  useEffect(() => {
    (async () => {
      const storedUser = await getData("user:signup");
      if (storedUser) setUserSignup(storedUser);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ThemedText type="title">Settings</ThemedText>
      <ThemedText type="subtitle">Edit and delete your account</ThemedText>
      <Divider />

      <Button type="light" onPress={handleLogout} style={styles.button}>
        <MaterialIcons size={30} name="logout" color={"#323232ff"} style={styles.buttonIcon} />
        <ThemedText type="default" style={{ color: "#323232ff" }}>Log out</ThemedText>
      </Button>
      <Button type="light" onPress={handleDeletion} style={{ borderColor: "#ff0000ff", marginTop: 10 }}>
        <MaterialIcons size={30} name="person-remove" color={"#ff0000ff"} style={styles.buttonIcon} />
        <ThemedText type="default" style={{ color: "#ff0000ff" }}>Delete Account</ThemedText>
      </Button>
      <ThemedView type="card" style={{ marginTop: 20 }}>
        <ThemedText type="subtitle" style={styles.subtitle}>Signup Data</ThemedText>
        <ScrollView style={styles.scrollContainer}>
          {Object.entries(userSignup ? userSignup : {}).map(([key, value]) => {
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
      </ThemedView>

      <Footer />
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
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollContainer: {
    width: "100%",
    maxHeight: 200,
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
  button: {
    margin: 10,
  },
  buttonIcon: {
    position: "absolute",
    left: 10,
  },
});
