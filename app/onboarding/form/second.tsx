import { Button } from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getNotificationsGranted, requestNotifications } from "@/services/notifications";
import { useTempStore } from "@/stores/tempStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Checkbox } from "expo-checkbox";
import { ScrollView, StyleSheet, View } from "react-native";

export default function OnboardingFinalScreen() {
  const { signup, setNotifications } = useTempStore();

  const handleNotifications = async () => {
    const notificationsAllowed = await getNotificationsGranted();

    if (notificationsAllowed) {
      setNotifications(!signup.notifications)
    } else {
      const result = await requestNotifications();
      setNotifications(result);
    };
  }

  return (
    <ThemedView type="container">
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardContent}>
          <View style={styles.headerSection}>
            <ThemedView style={styles.headerIconContainer} type="dusked">
              <MaterialIcons name="settings" size={32} color="#3b82f6" />
            </ThemedView>
            <ThemedText style={styles.title} type="whitened">Settings</ThemedText>
            <ThemedText style={styles.subtitle} type="greyed">Personalize your app settings</ThemedText>
          </View>

          <Button
            type="bordered"
            lightColor="#f8fafc"
            darkColor="#1a1a1aff"
            style={styles.settingsContainer}
            onPress={handleNotifications}
            activeOpacity={0.7}
          >
            <Checkbox
              value={signup.notifications}
              onValueChange={handleNotifications}
              color={signup.notifications ? "#3b82f6" : undefined}
            />
            <ThemedText style={styles.termsText} type="whitened">
              Receive appointment notifications
            </ThemedText>
          </Button>
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
  settingsContainer: {
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
    gap: 14,
  },
  termsText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    flexWrap: "wrap",
  },
});
