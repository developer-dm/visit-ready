import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";

import { useRouter } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  const router = useRouter();

  const loginScreen = () => {
    router.push("/login")
  };

  const signupScreen = () => {
    router.push("/signup")
  };

  const aboutScreen = () => {
    router.push("/about")
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <Image source={require("@/assets/images/favicon.png")} style={styles.icon} />
        <ThemedText type="title">Visit Ready</ThemedText>
        <ThemedText type="subtitle">Make the most of every medical visit</ThemedText>
        <Divider />
        <Button type={"dark"} onPress={loginScreen}>
          <ThemedText type="default" style={{ color: "#ffffffff" }}>Log In</ThemedText>
        </Button>
        <Button type={"dark"} onPress={signupScreen}>
          <ThemedText type="default" style={{ color: "#ffffffff" }}>Create Account</ThemedText>
        </Button>
        <Button type={"light"} onPress={aboutScreen}>
          <ThemedText type="default" style={{ color: "#323232ff" }}>About & Credits</ThemedText>
        </Button>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});
