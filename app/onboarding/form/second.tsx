import { CustomButton } from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getCalendarGranted, requestCalendar } from "@/services/calendar";
import { getNotificationsGranted, requestNotifications } from "@/services/notifications";
import { useTempStore } from "@/stores/tempStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ScrollView, StyleSheet, View } from "react-native";

export default function OnboardingFinalScreen() {
  const { signup, setNotifications, setCalendar } = useTempStore();

  const handleNotifications = async () => {
    const notificationsAllowed = await getNotificationsGranted();

    if (notificationsAllowed) {
      setNotifications(!signup.notifications)
    } else {
      const result = await requestNotifications();
      setNotifications(result);
    };
  }

  const handleCalendar = async () => {
    const calendarAllowed = await getCalendarGranted();

    if (calendarAllowed) {
      setCalendar(!signup.calendar)
    } else {
      const result = await requestCalendar();
      setCalendar(result);
    };
  }

  return (
    <ThemedView type="container">
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <ThemedView style={styles.headerIconContainer} type="dusked">
            <MaterialIcons name="settings" size={32} color="#3b82f6" />
          </ThemedView>
          <ThemedText style={styles.title} type="whitened">Settings</ThemedText>
          <ThemedText style={styles.subtitle} type="greyed">Personalize your app settings</ThemedText>
        </View>

        <View style={styles.formGap}>
          <CustomButton type="checker" value={signup.notifications} setValue={handleNotifications} placeholderText="Allow Notifications" />
          <CustomButton type="checker" value={signup.calendar} setValue={handleCalendar} placeholderText="Allow Calendar Sync" />
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 16,
    elevation: 3,
  },
  title: {
    fontSize: 18,
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
    gap: 12,
  },
});
