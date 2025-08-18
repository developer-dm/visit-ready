import { Button } from "@/components/Button";
import { DatePicker } from "@/components/DatePicker";
import { Divider } from "@/components/Divider";
import { Dropdown } from "@/components/Dropdown";
import { Textbox } from "@/components/Textbox";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/utils/userContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Platform, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ModalScreen() {
  const router = useRouter();

  const { prep } = useUser();

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'New Patient', value: 'new-patient' },
    { label: 'Follow-Up', value: 'follow-up' },
    { label: 'Annual Physical', value: 'annual-physical' },
    { label: 'Urgent Concern', value: 'urgent-concern' },
    { label: 'Other', value: 'other' },
  ]);

  const handleNext = () => {
    if (prep.appointmentType && prep.appointmentDate) {
      router.push("/prep/modal/second")
    } else {
      Alert.alert("Error", "Invalid appointment type or date");
    }
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="never">
      <TouchableWithoutFeedback onPress={() => { setOpen(false) }}>
        <View style={styles.container}>
          <ThemedView type="card">
            <MaterialIcons name="create" size={50} color={"#004678"} style={{ marginTop: 10 }} />
            <ThemedText type="title">Prep</ThemedText>
            <ThemedText type="subtitle">Please answer the questions below</ThemedText>
            <Divider top={20} bottom={30} />

            <ThemedText type="overhead">What type of appointment is this?</ThemedText>
            <Dropdown
              open={open}
              value={prep.appointmentType}
              items={items}
              setOpen={setOpen}
              setValue={prep.setAppointmentType}
              setItems={setItems}
            />

            <ThemedText type="overhead" style={{ marginVertical: 10 }}>When is your next appointment?</ThemedText>
            <DatePicker
              value={prep.appointmentDate}
              setValue={prep.setAppointmentDate}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
            />

            <ThemedText type="overhead" style={{ marginTop: 10 }}>Who is your provider? (optional)</ThemedText>
            <Textbox
              placeholder="e.g. Dr. Smith or City Medical Center"
              onChangeText={prep.setProvider}
              value={prep.provider}
              style={{ marginTop: 10 }}
            />

            <Button onPress={handleNext} type="dark" style={{ marginTop: 30 }}>
              <ThemedText type="default" style={{ color: "#fff" }}>Next</ThemedText>
            </Button>
          </ThemedView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  title: {
    marginBottom: -5
  },
  subtitle: {
    marginBottom: 50
  },
});
