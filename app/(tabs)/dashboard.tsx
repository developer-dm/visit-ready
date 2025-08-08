import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function index() {
  const router = useRouter();

  const newVisitScreen = () => {

  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView type="container">
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
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    maxHeight: "40%",
    width: "100%",
    backgroundColor: "#ffffff",
  },
  icon: {
    marginRight: 5,
  },
});
