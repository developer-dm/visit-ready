import { DatePicker } from "@/components/DatePicker";
import { Dropdown } from "@/components/Dropdown";
import { Footer } from "@/components/Footer";
import { Textbox } from "@/components/Textbox";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/utils/userContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ModalScreen() {
  const router = useRouter();
  const { prep } = useUser();

  // Dropdown state
  const [appointmentTypeItems] = useState([
    { label: 'New Patient', value: 'new-patient' },
    { label: 'Follow-Up', value: 'follow-up' },
    { label: 'Annual Physical', value: 'annual-physical' },
    { label: 'Urgent Concern', value: 'urgent-concern' },
    { label: 'Other', value: 'other' },
  ]);

  const handleNext = () => {
    if (prep.appointmentType) {
      router.push("/prep/second")
    } else {
      Alert.alert("Error", "Please enter an appointment type.");
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="never"
      showsVerticalScrollIndicator={false}
      enableResetScrollToCoords={false}
      extraScrollHeight={5}
    >
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
              <View style={styles.progressEmpty} />
              <View style={styles.progressEmpty} />
              <View style={styles.progressEmpty} />
            </View>
            <ThemedText style={styles.progressText} type="greyed">Step 1 of 4</ThemedText>
          </View>
          <ThemedText style={styles.pageTitle} type="whitened">Appointment Details</ThemedText>
          <ThemedText style={styles.pageSubtitle} type="greyed">Let's gather information about your upcoming appointment</ThemedText>
        </View>

        {/* Form Card */}
        <ThemedView style={styles.formCard}>
          <View style={styles.cardContent}>
            {/* Welcome Message */}
            <View style={styles.welcomeSection}>
              <ThemedView style={styles.welcomeIconContainer} type="dusked">
                <MaterialIcons name="create" size={32} color="#3b82f6" />
              </ThemedView>
              <ThemedText style={styles.welcomeTitle} type="whitened">
                Preparation Details
              </ThemedText>
              <ThemedText style={styles.welcomeSubtitle} type="greyed">
                Help us prepare the most relevant questions and resources for your visit
              </ThemedText>
            </View>

            {/* Form Fields */}
            <View style={styles.formFields}>
              <View style={styles.fieldGroup}>
                <ThemedText type="overheader">
                  What type of appointment is this?
                </ThemedText>
                <Dropdown
                  placeholder="Required"
                  items={appointmentTypeItems}
                  value={prep.appointmentType}
                  setValue={prep.setAppointmentType}
                />
              </View>

              <View style={styles.fieldGroup}>
                <ThemedText type="overheader">
                  When is your next appointment?
                </ThemedText>
                <DatePicker
                  value={prep.appointmentDate}
                  setValue={prep.setAppointmentDate}
                  mode="date"
                  display={Platform.OS === "ios" ? "inline" : "default"}
                />
              </View>

              <View style={styles.fieldGroup}>
                <ThemedText type="overheader">
                  Who is your provider?
                </ThemedText>
                <Textbox
                  onChangeText={prep.setProvider}
                  value={prep.provider}
                />
              </View>
            </View>
          </View>
        </ThemedView>

        {/* Action Section */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
            <Text style={styles.primaryButtonText}>Continue</Text>
            <View style={styles.buttonIcon}>
              <MaterialIcons name="arrow-forward" size={20} color="#ffffff" />
            </View>
          </TouchableOpacity>
        </View>

        <Footer hasSpacer={true} />
      </View>
    </KeyboardAwareScrollView>
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
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  progressBar: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  progressFill: {
    width: 24,
    height: 4,
    backgroundColor: '#3b82f6',
    borderRadius: 2,
  },
  progressEmpty: {
    width: 24,
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 300,
  },
  formCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  cardContent: {
    padding: 24,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  welcomeIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
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
  fieldGroup: {
    width: '100%',
  },
  actionSection: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    minWidth: 200,
    minHeight: 60,
    marginBottom: 16,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginRight: 12,
  },
  buttonIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ffffff33',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
