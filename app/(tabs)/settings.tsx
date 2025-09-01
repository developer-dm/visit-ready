import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { logOut } from "@/utils/auth";
import { useAuthStore } from "@/utils/authStore";
import DataFormatterService from "@/utils/dataFormatterService";
import { useDataStore } from "@/utils/dataStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

export default function SettingsScreen() {
  const labels: Record<string, string> = {
    firstName: "First Name",
    lastName: "Last Name",
    DOB: "Date of Birth",
    sex: "Sex",
  };

  const { resetOnboarding } = useAuthStore();
  const { signup, resetAppointments, resetSignup } = useDataStore();

  const clearData = () => {
    resetAppointments();
    resetSignup();
    resetOnboarding();
    logOut();
  };

  const handleDeletion = () => {
    Alert.alert('Delete account', 'Are you sure you want to delete your account? This action CANNOT be reversed once initiated.', [
      {
        text: 'Delete Account',
        onPress: () => clearData(),
        style: "destructive",
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout of your account?', [
      {
        text: 'Logout',
        onPress: () => logOut(),
        style: "destructive",
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const userDataEntries = Object.entries(signup ? signup : {}).filter(([key, value]) => {
    return typeof value !== "function" && key !== "acceptedTerms";
  });

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <ThemedText style={styles.pageTitle} type="whitened">Settings</ThemedText>
          <ThemedText style={styles.subtitle} type="greyed">
            Manage your account and preferences
          </ThemedText>
        </View>

        {/* Profile Information Card */}
        <ThemedView style={styles.profileCard}>
          <View style={styles.cardContent}>
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
                if (key === "DOB" && typeof value === 'string') {
                  value = new Date(value);
                }
                return (
                  <ThemedView key={key} style={styles.profileItem}>
                    <ThemedText style={styles.profileLabel} type="greyed">
                      {labels[key] || key}
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
          </View>
        </ThemedView>

        {/* Quick Actions Section */}
        <View style={styles.actionsSection}>
          <ThemedText style={styles.sectionTitle} type="whitened">Account Actions</ThemedText>

          <View style={styles.actionGrid}>
            {/* Logout Action */}
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

            {/* Delete Account Action */}
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

        {/* App Information Section */}
        <ThemedView style={styles.infoCard}>
          <View style={styles.cardContent}>
            <ThemedText style={styles.infoTitle} type="whitened">About Visit Ready</ThemedText>
            <ThemedText style={styles.infoText} type="greyed">
              Your personal appointment preparation assistant. Track your visits and get ready for your next doctor's appointment with personalized questions.
            </ThemedText>
          </View>
        </ThemedView>
      </ScrollView>
      <Footer />
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
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
    paddingVertical: 12,
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
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  dangerCard: {
    backgroundColor: '#fef2f2',
    borderColor: '#ef4444',
    borderWidth: 1,
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  dangerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    backgroundColor: '#ffdadaff',
  },
  actionContent: {
    flex: 1,
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
  infoCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
});
