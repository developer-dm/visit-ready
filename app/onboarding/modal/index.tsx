import { Textbox } from "@/components/Textbox";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/utils/userContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Alert, Keyboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function OnboardingFirstScreen() {
  const router = useRouter()
  const { signup } = useUser();

  const handleNext = () => {
    Keyboard.dismiss();

    if (signup.firstName && signup.lastName) {
      router.push("/onboarding/modal/second");
    } else {
      Alert.alert("Error", "Invalid first or last name.");
    };
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="never"
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
            <View style={styles.progressEmpty} />
            <View style={styles.progressEmpty} />
          </View>
          <ThemedText style={styles.progressText} lightColor='#64748b' darkColor='#858585ff'>
            Step 1 of 3
          </ThemedText>
        </View>

        <ThemedText style={styles.pageTitle} lightColor='#1e293b' darkColor='#ffffffff'>
          Let's Get Started
        </ThemedText>

        <ThemedText style={styles.pageSubtitle} lightColor='#64748b' darkColor='#858585ff'>
          Tell us a bit about yourself to personalize your experience
        </ThemedText>
      </View>

      {/* Form Card */}
      <ThemedView style={styles.formCard}>
        <View style={styles.cardContent}>
          {/* Welcome Message */}
          <View style={styles.welcomeSection}>
            <ThemedView style={styles.welcomeIconContainer} lightColor='#f1f5f9' darkColor='#1d1d1dff'>
              <MaterialIcons name="person-add" size={32} color="#3b82f6" />
            </ThemedView>
            <ThemedText style={styles.welcomeTitle} lightColor='#1e293b' darkColor='#ffffffff'>
              Create Your Profile
            </ThemedText>
            <ThemedText style={styles.welcomeSubtitle} lightColor='#64748b' darkColor='#858585ff'>
              We'll use this information to customize your appointment preparation
            </ThemedText>
          </View>

          {/* Form Fields */}
          <View style={styles.formFields}>
            <View style={styles.fieldGroup}>
              <ThemedText style={styles.fieldLabel} lightColor='#1e293b' darkColor='#ffffffff'>
                First Name
              </ThemedText>
              <Textbox
                placeholder="Enter your first name"
                onChangeText={signup.setFirstName}
                value={signup.firstName}
              />
            </View>

            <View style={styles.fieldGroup}>
              <ThemedText style={styles.fieldLabel} lightColor='#1e293b' darkColor='#ffffffff'>
                Last Name
              </ThemedText>
              <Textbox
                placeholder="Enter your last name"
                onChangeText={signup.setLastName}
                value={signup.lastName}
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

        <ThemedText style={styles.helpText} lightColor='#64748b' darkColor='#858585ff'>
          Your information is stored securely on your device
        </ThemedText>
      </View>

      {/* Bottom Spacer */}
      <View style={styles.bottomSpacer} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
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
  helpText: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  bottomSpacer: {
    height: 40,
  },
});
