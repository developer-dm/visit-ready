import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  const router = useRouter();

  const loginScreen = () => {
    router.replace("/(setup)/1")
  };

  const aboutScreen = () => {
    router.push("/about")
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView type="container">
        <Image source={require("@/assets/images/favicon.png")} style={styles.icon} />
        <ThemedText type="title">Visit Ready</ThemedText>
        <ThemedText type="subtitle">Make the most of every medical visit</ThemedText>
        <Divider />
        <Button type={"dark"} onPress={loginScreen}>
          <MaterialIcons size={30} name="login" color={"#ffffffff"} style={styles.buttonIcon} />
          <ThemedText type="default" style={{ color: "#ffffffff" }}>Get Started</ThemedText>
        </Button>
        <Button type={"light"} onPress={aboutScreen} style={{ marginTop: 15 }}>
          <MaterialIcons size={30} name="info-outline" color={"#323232ff"} style={styles.buttonIcon} />
          <ThemedText type="default" style={{ color: "#323232ff" }}>About & Credits</ThemedText>
        </Button>
        <Footer />
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonIcon: {
    position: "absolute",
    left: 15,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});
