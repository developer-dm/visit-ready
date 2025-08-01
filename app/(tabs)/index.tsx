import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function index() {
  const router = useRouter();

  const newVisitScreen = () => {

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Prepare for your next visit</Text>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.button} onPress={newVisitScreen}>
          <MaterialIcons size={30} name="create" color={"#ffffffff"} style={styles.icon} />
          <Text style={styles.text}>Prep for your next visit</Text>
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
    marginRight: 5,
  },
  button: {
    flexDirection: "row",
    height: 75,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#004678",
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
