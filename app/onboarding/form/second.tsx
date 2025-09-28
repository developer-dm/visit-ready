import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useDataStore } from "@/stores/dataStore";
import { useTempStore } from "@/stores/tempStore";
import { AppInfo } from "@/types/app";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function OnboardingFinalScreen() {
  const router = useRouter();
  const { signup, setAcceptedTerms, clearUserContext } = useTempStore();
  const { addSignupData } = useDataStore();

  const handleNext = () => {
    addSignupData(signup);
    router.dismissTo("/onboarding")
    router.replace("/onboarding/sign-in")
    clearUserContext();
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ThemedView type="container">
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.cardContent}>
            {/* Info Section */}
            <View style={styles.infoSection}>
              <ThemedView style={styles.infoIconContainer} type="dusked">
                <MaterialIcons name="check-circle" size={24} color="#10b981" />
              </ThemedView>
              <ThemedText style={styles.infoTitle} type="whitened">User Agreement</ThemedText>
              <ThemedText style={styles.infoSubtitle} type="greyed">Accept the Terms of Service and Privacy Policy to continue</ThemedText>
            </View>

            {/* Terms Section */}
            <View style={styles.termsSection}>
              <ThemedView type="bordered" style={styles.termsCard}>
                <ScrollView
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={true}
                >
                  <ThemedText>
                    {AppInfo.terms_privacy}
                  </ThemedText>
                </ScrollView>
              </ThemedView>

              <Button
                type="bordered"
                lightColor="#f8fafc"
                darkColor="#1a1a1aff"
                style={styles.termsContainer}
                onPress={() => setAcceptedTerms(!signup.acceptedTerms)}
                activeOpacity={0.7}
              >
                <Checkbox
                  value={signup.acceptedTerms}
                  onValueChange={setAcceptedTerms}
                  color={signup.acceptedTerms ? "#3b82f6" : undefined}
                />
                <View style={styles.termsTextContainer}>
                  <ThemedText style={styles.termsText} type="whitened">
                    I have read and agree to the Terms of Service and Privacy Policy.
                  </ThemedText>
                </View>
              </Button>
            </View>
          </View>

          {/* Navigation */}
          <View style={styles.navigationSection}>
            <View style={styles.buttonRow}>
              <Button type="bordered" style={styles.backButton} onPress={handleBack}>
                <MaterialIcons name="arrow-back" size={20} color="#64748b" />
                <Text style={styles.backButtonText}>Back</Text>
              </Button>

              <Button
                style={[styles.primaryButton, !signup.acceptedTerms && styles.primaryButtonDisabled]}
                onPress={handleNext}
                disabled={!signup.acceptedTerms}
              >
                <Text style={[styles.primaryButtonText, !signup.acceptedTerms && styles.primaryButtonTextDisabled]}>
                  Get Started
                </Text>
                <View style={styles.buttonIcon}>
                  <MaterialIcons
                    name="check"
                    size={20}
                    color={signup.acceptedTerms ? "#ffffff" : "#94a3b8"}
                  />
                </View>
              </Button>
            </View>

            <Footer hasSpacer={true} text="Your information is encrypted and stored on your device" />
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 30,
  },
  content: {
    flex: 1,
  },
  cardContent: {
    padding: 24,
    marginBottom: 24,
  },
  infoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  infoIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
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
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  infoSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
  termsSection: {
    width: '100%',
  },
  termsCard: {
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 5,
    marginBottom: 20,
    height: 500,
  },
  termsContainer: {
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
  },
  termsTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  termsText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    flexWrap: "wrap",
  },
  termsLink: {
    fontWeight: '500',
    textDecorationLine: 'underline',
    flexWrap: "wrap"
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
