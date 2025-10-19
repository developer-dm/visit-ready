import { DatePicker } from "@/components/DatePicker";
import { Dropdown } from "@/components/Dropdown";
import { Textbox } from "@/components/Textbox";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuthStore } from "@/stores/authStore";
import { useTempStore } from "@/stores/tempStore";
import { DropdownValues } from "@/types/dropdown";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Platform, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function PrepFirstScreen() {
  const { appointment, updateAppointment } = useTempStore();
  const { notifications } = useAuthStore();

  return (
    <ThemedView type="container" style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="never"
        showsVerticalScrollIndicator={false}
        enableResetScrollToCoords={false}
        extraScrollHeight={10}
      >
        <View style={styles.welcomeSection}>
          <ThemedView style={styles.welcomeIconContainer} type="dusked">
            <MaterialIcons name="calendar-month" size={32} color="#3b82f6" />
          </ThemedView>
          <ThemedText style={styles.welcomeTitle} type="whitened">Appointment Details</ThemedText>
          <ThemedText style={styles.welcomeSubtitle} type="greyed">Tell us about your upcoming appointment</ThemedText>
        </View>

        <View style={styles.formFields}>
          <View>
            <ThemedText type="overheader">Type of Appointment</ThemedText>
            <Dropdown
              placeholder="Required"
              items={DropdownValues.appointmentType}
              value={appointment.appointmentType}
              setValue={(value) => updateAppointment({ appointmentType: value })}
            />
          </View>

          <View>
            <ThemedText type="overheader">Date of Appointment</ThemedText>
            <DatePicker
              placeholderText="Required"
              value={appointment.appointmentDate}
              setValue={(value) => updateAppointment({ appointmentDate: value })}
              mode="datetime"
              display={Platform.OS === "ios" ? "inline" : "default"}
            />
          </View>

          <View>
            <ThemedText type="overheader">Appointment Location</ThemedText>
            <Textbox
              onChangeText={(value) => updateAppointment({ address: value })}
              value={appointment.address}
            />
          </View>

          <View>
            <ThemedText type="overheader">Provider</ThemedText>
            <Textbox
              onChangeText={(value) => updateAppointment({ provider: value })}
              value={appointment.provider}
            />
          </View>

          {notifications && (
            <View>
              <ThemedText type="overheader">Notification</ThemedText>
              <Dropdown
                items={DropdownValues.notified}
                value={appointment.notified}
                setValue={(value) => updateAppointment({ notified: value })}
              />
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 300,
    paddingTop: 48,
    paddingHorizontal: 24,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  welcomeIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
  formFields: {
    gap: 24,
  },
});
