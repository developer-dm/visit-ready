import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { logOut } from "@/utils/auth";
import { useAuthStore } from "@/utils/authStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, View } from "react-native";

export default function SettingsScreen() {
  const { resetOnboarding } = useAuthStore();

  const handleDeletion = () => {
    resetOnboarding();
    logOut();
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title">Settings</ThemedText>
      <ThemedText type="subtitle">Edit and delete your account</ThemedText>
      <Divider />
      <Button type="light" onPress={logOut} style={styles.button}>
        <MaterialIcons size={30} name="logout" color={"#323232ff"} style={styles.buttonIcon} />
        <ThemedText type="default" style={{ color: "#323232ff" }}>Log out</ThemedText>
      </Button>
      <Button type="light" onPress={handleDeletion} style={{ borderColor: "#ff0000ff", margin: 10 }}>
        <MaterialIcons size={30} name="person-remove" color={"#ff0000ff"} style={styles.buttonIcon} />
        <ThemedText type="default" style={{ color: "#ff0000ff" }}>Delete Account</ThemedText>
      </Button>
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
  button: {
    margin: 10,
  },
  buttonIcon: {
    position: "absolute",
    left: 10,
  },
});
