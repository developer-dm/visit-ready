import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export default function IndexScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">Dashboard</ThemedText>
      <ThemedText type="subtitle">Prepare for your next visit</ThemedText>
      <Divider />
      <Link asChild push href="/prep/modal">
        <Button type="dark" style={styles.button}>
          <MaterialIcons size={30} name="create" color={"#ffffffff"} style={styles.buttonIcon} />
          <ThemedText type="default" style={{ color: "#ffffffff" }}>Prep for your next visit</ThemedText>
        </Button>
      </Link>
      <Footer />
      <ScrollView style={styles.scroll}>

      </ScrollView>
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
  scroll: {
    maxHeight: "40%",
    width: "100%",
    backgroundColor: "#ff0000ff",
    marginTop: 10,
  },
});
