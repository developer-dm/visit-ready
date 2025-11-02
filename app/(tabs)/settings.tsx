import { Button } from "@/components/Button";
import { CustomButton } from "@/components/CustomButton";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { logOut } from "@/services/auth";
import { DataFormatterService } from "@/services/dataFormatter";
import { clearAllNotifications, getNotificationsGranted, requestNotifications } from "@/services/notifications";
import { useAuthStore } from "@/stores/authStore";
import { useDataStore } from "@/stores/dataStore";
import { useTempStore } from "@/stores/tempStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Linking, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const { resetOnboarding, calendar, notifications, setCalendar, setNotifications } = useAuthStore();
  const { signup, resetAppointments, resetAll, resetCompletions } = useDataStore();
  const { updateSignup } = useTempStore();
  const [debounce, setDebounce] = useState(false); // Calendar and notif debounce

  const showNotifications = async () => {
    if (debounce) return;
    setDebounce(true);

    if (notifications) { // Notifications are turned on
      router.push("/modals/notifications")
    } else { // Notifications are disabled
      const notificationsAllowed = await getNotificationsGranted();
      if (notificationsAllowed) { // Turn on notifications
        Alert.alert('Enable Notifications', 'Allow appointment notifications?', [
          {
            text: 'Confirm', style: "default",
            onPress: () => setNotifications(true),
          },
          { text: 'Cancel', style: 'cancel' },
        ]);
      } else { // Request notifications
        const result = await requestNotifications();
        setNotifications(result);
      };
    };

    setTimeout(() => {
      setDebounce(false);
    }, 1000);
  };

  const showCalendar = async () => {
    if (debounce) return;
    setDebounce(true);

    if (calendar) { // Open Calendar
      if (Platform.OS === "ios") { // iOS Calendar
        const supported = await Linking.canOpenURL('calshow://');
        if (supported) Linking.openURL('calshow://');
      } else if (Platform.OS === 'android') { // Android calendar
        const supported = await Linking.canOpenURL('content://com.android.calendar/time/');
        if (supported) Linking.openURL('content://com.android.calendar/time/');
      }
    } else {
      Alert.alert('Enable Calendar', 'Add appointments to calendar?', [
        {
          text: 'Confirm',
          style: 'default',
          onPress: () => setCalendar(true),
        },
        { text: 'Cancel', style: 'cancel' },
      ]);
    }

    setTimeout(() => {
      setDebounce(false);
    }, 1000);
  };

  const clearData = () => {
    resetAll();
    clearAllNotifications();
    resetOnboarding();
    logOut();
  };

  const clearVisits = () => {
    Alert.alert('Clear Visits', 'Are you sure you want to clear all visits? This action CANNOT be reversed.', [
      {
        text: 'Confirm', style: "destructive",
        onPress: () => {
          clearAllNotifications();
          resetAppointments();
          resetCompletions();
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  }

  const handleDeletion = () => {
    Alert.alert('Delete account', 'Are you sure you want to delete your account? This action CANNOT be reversed once initiated.', [
      {
        text: 'Delete Account', style: "destructive",
        onPress: () => clearData(),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout of your account?', [
      {
        text: 'Logout', style: "destructive",
        onPress: () => logOut(),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleEditSignup = () => {
    updateSignup({ ...signup, DOB: new Date(signup?.DOB || "") });
    router.push("/onboarding");
  };

  const userDataEntries = Object.entries(signup ? signup : {}).filter(([key]) => {
    return key === 'DOB' || key === 'sex' || key === 'language';
  });

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText style={styles.pageTitle} type="whitened">Settings</ThemedText>
          <ThemedText style={styles.subtitle} type="greyed">
            Manage your account and preferences
          </ThemedText>
        </View>

        <ThemedView style={styles.profileCard}>
          <View style={styles.cardHeader}>
            <ThemedView style={styles.profileIconContainer} type="dusked">
              <MaterialIcons
                size={32}
                name="person"
                color="#3b82f6"
              />
            </ThemedView>
            <View style={styles.profileInfo}>
              <ThemedText style={styles.cardTitle} type="whitened">Profile Information</ThemedText>
              <ThemedText style={styles.cardSubtitle} type="greyed">
                Your personal details
              </ThemedText>
            </View>
          </View>

          <View style={styles.profileDetails}>
            {userDataEntries.length > 0 ? (userDataEntries.map(([key, value]) => {
              if (key === "DOB" && value && typeof value !== "boolean") value = DataFormatterService.FormatDateString(value);

              return (
                <ThemedView type="list" key={key} style={styles.profileItem}>
                  <ThemedText style={styles.profileLabel} type="greyed">
                    {DataFormatterService.toReadableString(key, 'label')}
                  </ThemedText>
                  <ThemedText style={styles.profileValue} type="whitened">
                    {DataFormatterService.toReadableString(value)}
                  </ThemedText>
                </ThemedView>
              );
            })
            ) : (
              <View style={styles.noDataContainer}>
                <ThemedText style={styles.noDataText} type="greyed">
                  No profile information available
                </ThemedText>
              </View>
            )}
          </View>
          <CustomButton type="icon" iconName="edit" iconSize={20} onPress={handleEditSignup} />
        </ThemedView>

        <View style={styles.preferencesSection}>
          <ThemedText style={styles.sectionTitle} type="whitened">Preferences</ThemedText>

          <View style={styles.preferencesGap}>
            {/* Notifications */}
            <Button type="bordered" style={styles.actionCard} onPress={showNotifications}>
              <View style={styles.preferenceContent}>
                <View style={styles.preferenceIconLabel}>
                  <MaterialIcons
                    size={22}
                    name="notifications"
                    color="#64748b"
                  />
                  <ThemedText style={styles.preferenceText}>Notifications</ThemedText>
                </View>
                <ThemedText style={styles.preferenceText} type="greyed">
                  {DataFormatterService.toReadableString(notifications, 'notifications')}
                </ThemedText>
              </View>
              <MaterialIcons
                size={20}
                name="chevron-right"
                color="#94a3b8"
              />
            </Button>

            {/* Calendar */}
            <Button type="bordered" style={styles.actionCard} onPress={showCalendar}>
              <View style={styles.preferenceContent}>
                <View style={styles.preferenceIconLabel}>
                  <MaterialIcons
                    size={22}
                    name="calendar-today"
                    color="#64748b"
                  />
                  <ThemedText style={styles.preferenceText}>Calendar Sync</ThemedText>
                </View>
                <ThemedText style={styles.preferenceText} type="greyed">
                  {DataFormatterService.toReadableString(calendar, 'notifications')}
                </ThemedText>
              </View>
              <MaterialIcons
                size={20}
                name="chevron-right"
                color="#94a3b8"
              />
            </Button>
          </View>
        </View>

        <View style={styles.actionsSection}>
          <ThemedText style={styles.sectionTitle} type="whitened">Account Actions</ThemedText>

          <View style={styles.actionGrid}>
            {/* Delete all visits and notifications */}
            <Button style={styles.actionCard} type="bordered" onPress={clearVisits}>
              <ThemedView style={styles.actionIconContainer} type="dusked">
                <MaterialIcons
                  size={24}
                  name="delete-outline"
                  color="#64748b"
                />
              </ThemedView>
              <View style={styles.actionContent}>
                <ThemedText style={styles.actionTitle} type="whitened">Delete Visits</ThemedText>
                <ThemedText style={styles.actionSubtitle} type="greyed">
                  {"Permanently remove every visit and scheduled notification"}
                </ThemedText>
              </View>
              <MaterialIcons
                size={20}
                name="chevron-right"
                color="#94a3b8"
              />
            </Button>

            {/* Logout */}
            <Button style={styles.actionCard} type="bordered" onPress={handleLogout}>
              <ThemedView style={styles.actionIconContainer} type="dusked">
                <MaterialIcons
                  size={24}
                  name="logout"
                  color="#64748b"
                />
              </ThemedView>
              <View style={styles.actionContent}>
                <ThemedText style={styles.actionTitle} type="whitened">Log Out</ThemedText>
                <ThemedText style={styles.actionSubtitle} type="greyed">
                  Sign out of your account
                </ThemedText>
              </View>
              <MaterialIcons
                size={20}
                name="chevron-right"
                color="#94a3b8"
              />
            </Button>

            {/* Delete Account */}
            <Button style={[styles.actionCard, styles.dangerCard]} onPress={handleDeletion}>
              <ThemedView style={styles.dangerIconContainer}>
                <MaterialIcons
                  size={24}
                  name="person-remove"
                  color="#ef4444"
                />
              </ThemedView>
              <View style={styles.actionContent}>
                <ThemedText style={[styles.actionTitle, styles.dangerTitle]}>Delete Account</ThemedText>
                <ThemedText style={styles.actionSubtitle} type="greyed">
                  Permanently remove your account
                </ThemedText>
              </View>
              <MaterialIcons
                size={20}
                name="chevron-right"
                color="#ef4444"
              />
            </Button>
          </View>
        </View>

        <View style={styles.additionalOptions}>
          <Link asChild push href="/about">
            <TouchableOpacity style={styles.linkButton}>
              <MaterialIcons name="info-outline" size={20} color="#64748b" />
              <ThemedText style={styles.linkText} type="greyed">About Visit Ready</ThemedText>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
      <Footer type="absolute" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 30,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: "left",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: "left",
  },
  profileCard: {
    padding: 24,
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  profileDetails: {
    gap: 12,
    marginBottom: 28,
  },
  profileItem: {
    paddingVertical: 16,
    paddingBottom: 6,
    borderBottomWidth: 1,
  },
  profileLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  profileValue: {
    fontSize: 16,
    fontWeight: '400',
  },
  noDataContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  actionsSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  preferencesSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  preferencesGap: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: "left",
    marginBottom: 16,
  },
  actionGrid: {
    gap: 12,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 16,
  },
  dangerCard: {
    backgroundColor: '#ffdbdbff',
    borderColor: '#ef4444',
    borderWidth: 1,
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  dangerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    backgroundColor: '#ffb5b5ff',
  },
  additionalOptions: {
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  actionContent: {
    flex: 1,
    paddingRight: 10,
  },
  preferenceContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  preferenceIconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  preferenceText: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  dangerTitle: {
    color: '#ef4444',
  },
  actionSubtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
});
