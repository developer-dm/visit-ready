import { useRouter } from "expo-router";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
        <Text style={styles.title}>Visit Ready</Text>
        <Text style={styles.subtitle}>Make the most of every medical visit</Text>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.button} onPress={loginScreen}>
          <Text style={styles.text}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={signupScreen}>
          <Text style={styles.text}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.aboutButton} onPress={aboutScreen}>
          <Text style={styles.aboutText}>About & Credits</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Visit Ready | v1.0</Text>
        </View>
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
    padding: 30,
  },
  divider: {
    backgroundColor: "#ccc",
    height: 1,
    width: "100%",
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    fontFamily: "Sans-serif",
    textAlign: "center",
    color: "#004678",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Sans-serif",
    fontWeight: "medium",
    color: "#000000ff",
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  button: {
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#004678",
    borderRadius: 3,
    margin: 10,
  },
  aboutButton: {
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 3,
    margin: 10,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Sans-serif",
    fontWeight: "medium",
    color: "#ffffffff",
  },
  aboutText: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Sans-serif",
    fontWeight: "medium",
    color: "#323232ff",
  },
  footerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 4,
    width: "100%",
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Sans-serif",
    fontWeight: "medium",
    color: "#000000",
  },
});
