import { DatePicker } from "@/components/DatePicker";
import { Dropdown } from "@/components/Dropdown";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTempStore } from "@/stores/tempStore";
import { DropdownValues } from "@/types/dropdown";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function OnboardingFirstScreen() {
  const { signup, setDOB, setSex, setLanguage } = useTempStore();

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
        <View style={styles.headerSection}>
          <ThemedView style={styles.headerIconContainer} type="dusked">
            <MaterialIcons name="person-outline" size={32} color="#3b82f6" />
          </ThemedView>
          <ThemedText style={styles.title} type="whitened">Demographics</ThemedText>
          <ThemedText style={styles.subtitle} type="greyed">
            We do not collect your private health data.
          </ThemedText>
        </View>

        <View style={styles.formGap}>
          <View>
            <ThemedText type="overheader">Date of Birth</ThemedText>
            <DatePicker
              placeholderText="Required"
              mode="date"
              display="spinner"
              value={signup.DOB}
              setValue={setDOB}
            />
          </View>

          <View>
            <ThemedText type="overheader">Gender</ThemedText>
            <Dropdown
              placeholder="Required"
              items={DropdownValues.sex}
              value={signup.sex}
              setValue={setSex}
            />
          </View>

          <View>
            <ThemedText type="overheader">Preferred language</ThemedText>
            <Dropdown
              placeholder="Required"
              items={DropdownValues.language}
              value={signup.language}
              setValue={setLanguage}
            />
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
    paddingBottom: 300,
    paddingTop: 48,
    paddingHorizontal: 24,
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
    marginBottom: 16,
    elevation: 3,
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
});
