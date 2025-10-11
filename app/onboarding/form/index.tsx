import { DatePicker } from "@/components/DatePicker";
import { Dropdown } from "@/components/Dropdown";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTempStore } from "@/stores/tempStore";
import { DropdownValues } from "@/types/dropdown";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Alert, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function OnboardingFirstScreen() {
  const router = useRouter()
  const { signup, setDOB, setSex, setLanguage, resetTempContext } = useTempStore();

  const handleClose = () => {
    Alert.alert('Close Form', 'Are you sure you want to discard this form?', [
      {
        text: 'Discard',
        onPress: () => {
          router.dismissAll();
          resetTempContext();
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
        <View style={styles.cardContent}>
          <View style={styles.headerSection}>
            <ThemedView style={styles.headerIconContainer} type="dusked">
              <MaterialIcons name="person-outline" size={32} color="#3b82f6" />
            </ThemedView>
            <ThemedText style={styles.title} type="whitened">Demographics</ThemedText>
            <ThemedText style={styles.subtitle} type="greyed">
              We do not collect your private health data.{"\n"}All information is stored on your device.
            </ThemedText>
          </View>

          <View style={styles.formGap}>
            <View style={styles.formField}>
              <ThemedText type="overheader">Date of Birth</ThemedText>
              <DatePicker
                placeholderText="Required"
                mode="date"
                display="spinner"
                value={signup.DOB}
                setValue={setDOB}
              />
            </View>

            <View style={styles.formField}>
              <ThemedText type="overheader">Gender</ThemedText>
              <Dropdown
                placeholder="Required"
                items={DropdownValues.sex}
                value={signup.sex}
                setValue={setSex}
              />
            </View>

            <View style={styles.formField}>
              <ThemedText type="overheader">Preferred language</ThemedText>
              <Dropdown
                placeholder="Required"
                items={DropdownValues.language}
                value={signup.language}
                setValue={setLanguage}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 150,
  },
  cardContent: {
    padding: 24,
    marginTop: 24,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
  formGap: {
    gap: 24,
  },
  formField: {
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
    backgroundColor: '#b4b6bcff',
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
