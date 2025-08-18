import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, View } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <ThemedView type="card">
        <MaterialIcons name="info-outline" size={125} color={"#004678"} />
        <ThemedText type="title" style={styles.title}>About</ThemedText>
        <ThemedText type="overhead" style={styles.overhead}>What is Visit Ready?</ThemedText>
        <ThemedText type="default" style={styles.default}>
          Visit Ready is a mobile app designed to help you prepare for medical appointments ahead of visits.
        </ThemedText>
        <ThemedText type="overhead" style={styles.overhead}>Features</ThemedText>
        <ThemedText type="default" style={styles.default}>
          • Symptom Input: Easily enter and track current symptoms with guided prompts
          {"\n"}• Question Generation: Get tailored questions to ask your doctor based on your symptoms
          {"\n"}• Visit Summary: Create a concise, clinician-friendly summary of your health concerns
          {"\n"}• Secure Sharing: Send your summary and questions securely to your healthcare provider before your appointment
          {"\n"}• Appointment Reminders: Stay on track with notifications and prep tips
        </ThemedText>
        <ThemedText type="overhead" style={styles.overhead}>Credits</ThemedText>
        <ThemedText type="default" style={styles.default}>By: Dakota M.</ThemedText>
      </ThemedView>
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
  title: {
    marginBottom: 20,
  },
  overhead: {
    fontSize: 16,
  },
  default: {
    fontSize: 12,
    textAlign: "left",
    width: "100%",
    margin: 10,
  },
});
