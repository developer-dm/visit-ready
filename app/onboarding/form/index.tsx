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
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function OnboardingFirstScreen() {
  const router = useRouter()
  const { signup } = useUser();

  // Dropdown state
  const [sexItems] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ]);

  const handleNext = () => {
    Keyboard.dismiss();
    router.push("/onboarding/form/second");

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
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
              <View style={styles.progressEmpty} />
              <View style={styles.progressEmpty} />
            </View>
            <ThemedText style={styles.progressText} type="greyed">Step 1 of 3</ThemedText>
          </View>
        </View>

        {/* Form */}
        <ThemedView style={styles.formCard}>
          <View style={styles.cardContent}>
            <View style={styles.welcomeSection}>
              <ThemedView style={styles.welcomeIconContainer} type="dusked">
                <MaterialIcons name="person-add" size={32} color="#3b82f6" />
              </ThemedView>
              <ThemedText style={styles.welcomeTitle} type="whitened">Create Your Profile</ThemedText>
              <ThemedText style={styles.welcomeSubtitle} type="greyed">We'll use this information to customize your appointment preparation</ThemedText>
            </View>

            <View style={styles.formFields}>
              <View style={styles.fieldGroup}>
                <ThemedText type="overheader">First Name</ThemedText>
                <Textbox
                  onChangeText={signup.setFirstName}
                  value={signup.firstName}
                />
              </View>

              <View style={styles.fieldGroup}>
                <ThemedText type="overheader">Last Name</ThemedText>
                <Textbox
                  onChangeText={signup.setLastName}
                  value={signup.lastName}
                />
              </View>

              <View style={styles.fieldGroup}>
                <ThemedText type="overheader">Date of Birth</ThemedText>
                <DatePicker
                  mode="date"
                  display="spinner"
                  value={signup.DOB}
                  setValue={signup.setDOB}
                />
              </View>

              <View style={styles.fieldGroup}>
                <ThemedText type="overheader">Sex at Birth</ThemedText>
                <Dropdown
                  items={sexItems}
                  value={signup.sex}
                  setValue={signup.setSex}
                />
              </View>
            </View>
          </View>
        </ThemedView>

        {/* Navigation */}
        <View style={styles.navigationSection}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
            <Text style={styles.primaryButtonText}>Continue</Text>
            <View style={styles.buttonIcon}>
              <MaterialIcons name="arrow-forward" size={20} color="#ffffff" />
            </View>
          </TouchableOpacity>

          <Footer hasSpacer={true} />
        </View>
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
    zIndex: 1000,
    elevation: 1000,
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
  navigationSection: {
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
