/*
Future provider login:

const { logIn, logInAsVip } = useAuthStore();

<Button type="dark" onPress={logInAsVip} style={styles.button}>
  <ThemedText type="default">VIP Login</ThemedText>
</Button>
*/

import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { ThemedText } from "@/components/ThemedText";
import { authenticateWithBiometrics } from "@/utils/auth";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

export default function SignInScreen() {
  const handleLogin = async () => {
    await authenticateWithBiometrics();
  };

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/favicon.png")} style={styles.icon} />
      <ThemedText type="title">Visit Ready</ThemedText>
      <ThemedText type="subtitle">Make the most of every medical visit</ThemedText>
      <Divider top={20} bottom={30} />
      <Button type="dark" onPress={handleLogin} style={styles.button}>
        <MaterialIcons name="login" size={30} color={"#fff"} style={styles.buttonIcon} />
        <ThemedText type="default" style={{ color: "#fff" }}>Login</ThemedText>
      </Button>
      <Link asChild push href="/about">
        <Button type="light" style={styles.button}>
          <MaterialIcons name="info-outline" size={30} color={"#323232ff"} style={styles.buttonIcon} />
          <ThemedText type="default" style={{ color: "#323232ff" }}>About</ThemedText>
        </Button>
      </Link>
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
  icon: {
    width: 100,
    height: 100,
  },
  buttonIcon: {
    position: "absolute",
    left: 10,
  },
});
