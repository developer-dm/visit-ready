import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function index() {
  const router = useRouter();

  const newVisitScreen = () => {

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <ThemedText type="title">Dashboard</ThemedText>
        <ThemedText type="subtitle">Prepare for your next visit</ThemedText>
        <Divider />
        <Button type="dark" onPress={newVisitScreen}>
          <MaterialIcons size={30} name="create" color={"#ffffffff"} style={styles.icon} />
          <ThemedText type="default" style={{ color: "#ffffffff" }}>Prep for your next visit</ThemedText>
        </Button>
        <Footer />
        <ScrollView style={styles.scroll}>
          
        </ScrollView>
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
  scroll: {
    maxHeight: "40%",
    width: "100%",
    backgroundColor: "#ffffff",
  },
  icon: {
    marginRight: 5,
  },
});
