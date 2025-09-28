import { Button } from "@/components/Button";
import { DatePicker } from "@/components/DatePicker";
import { Dropdown } from "@/components/Dropdown";
import { Footer } from "@/components/Footer";
import { Textbox } from "@/components/Textbox";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTempStore } from "@/stores/tempStore";
import { DropdownValues } from "@/types/dropdown";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Alert, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function OnboardingFirstScreen() {
  const router = useRouter()
  const { signup, setFirstName, setLastName, setDOB, setSex, setLanguage, clearUserContext } = useTempStore();

  const handleClose = () => {
    Alert.alert('Close Form', 'Are you sure you want to discard this form?', [
      {
        text: 'Discard',
        onPress: () => {
          router.dismissAll();
          clearUserContext();
        },
        style: "destructive",
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const handleNext = () => {
    router.push("/onboarding/form/second");
  };

  return (
    <ThemedView type="container">
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="never"
        showsVerticalScrollIndicator={false}
        enableResetScrollToCoords={false}
        extraScrollHeight={10}
      >
        <View style={styles.content}>
          {/* Form */}
          <View style={styles.cardContent}>
            <View style={styles.welcomeSection}>
              <ThemedView style={styles.welcomeIconContainer} type="dusked">
                <MaterialIcons name="person-add" size={32} color="#3b82f6" />
              </ThemedView>
              <ThemedText style={styles.welcomeTitle} type="whitened">Create Your Profile</ThemedText>
              <ThemedText style={styles.welcomeSubtitle} type="greyed">Tell us a little bit about yourself so we can personalize your experience</ThemedText>
            </View>

            <View style={styles.formFields}>
              <View style={styles.fieldGroup}>
                <ThemedText type="overheader">First Name</ThemedText>
                <Textbox
                  onChangeText={setFirstName}
                  value={signup.firstName}
                />
              </View>

              <View style={styles.fieldGroup}>
                <ThemedText type="overheader">Last Name</ThemedText>
                <Textbox
                  onChangeText={setLastName}
                  value={signup.lastName}
                />
              </View>

              <View style={styles.fieldGroup}>
                <ThemedText type="overheader">Date of Birth</ThemedText>
                <DatePicker
                  mode="date"
                  display="spinner"
                  value={signup.DOB}
                  setValue={setDOB}
                />
              </View>

              <View style={styles.fieldGroup}>
                <ThemedText type="overheader">Sex at Birth</ThemedText>
                <Dropdown
                  items={DropdownValues.sex}
                  value={signup.sex}
                  setValue={setSex}
                />
              </View>

              <View style={styles.fieldGroup}>
                <ThemedText type="overheader">Primary language spoken</ThemedText>
                <Dropdown
                  placeholder="Required"
                  items={DropdownValues.language}
                  value={signup.language}
                  setValue={setLanguage}
                />
              </View>
            </View>
          </View>

          {/* Navigation */}
          <View style={styles.navigationSection}>
            <View style={styles.buttonRow}>
              <Button type="bordered" style={styles.backButton} onPress={handleClose}>
                <MaterialIcons name="close" size={20} color="#64748b" />
                <Text style={styles.backButtonText}>Exit</Text>
              </Button>

              <Button
                style={[styles.primaryButton, !signup.language && styles.primaryButtonDisabled]}
                onPress={handleNext}
                disabled={!signup.language}
              >
                <Text style={[styles.primaryButtonText, !signup.language && styles.primaryButtonTextDisabled]}>
                  Continue
                </Text>
                <View style={styles.buttonIcon}>
                  <MaterialIcons
                    name="arrow-forward"
                    size={20}
                    color={signup.language ? "#ffffff" : "#94a3b8"}
                  />
                </View>
              </Button>
            </View>
          </View>

          <Footer hasSpacer={true} text="Your information is encrypted and stored on your device" />
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
    paddingVertical: 30,
  },
  cardContent: {
    padding: 24,
    marginBottom: 24,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    minWidth: 100,
    minHeight: 60,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748b',
    marginLeft: 8,
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
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
    shadowRadius: 10,
    minWidth: 160,
    minHeight: 60,
  },
  primaryButtonDisabled: {
    backgroundColor: '#e2e8f0',
    shadowOpacity: 0,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginRight: 12,
  },
  primaryButtonTextDisabled: {
    color: '#94a3b8',
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
