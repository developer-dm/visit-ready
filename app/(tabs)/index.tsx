import { Button } from '@/components/Button';
import { Footer } from '@/components/Footer';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useDataStore } from '@/stores/dataStore';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
  const router = useRouter();
  const { signup, appointments } = useDataStore();

  const handleVisitPrep = () => {
    router.push("/prep")
  };

  const handleHistory = () => {
    router.push("/(tabs)/history")
  };

  const handleSettings = () => {
    router.push("/(tabs)/settings")
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <ThemedText style={styles.welcomeText} type="greyed">Welcome back,</ThemedText>
          <ThemedText style={styles.appTitle} type="whitened">
            {signup?.firstName?.trim() || "Visit Ready"}
          </ThemedText>
          <ThemedText style={styles.subtitle} type="greyed">Get ready for your next appointment</ThemedText>
        </View>

        {/* Main Action Card */}
        <ThemedView style={styles.mainCard}>
          <View style={styles.cardContent}>
            <ThemedText style={styles.cardTitle} type="whitened">Ready for Your Visit?</ThemedText>
            <ThemedText style={styles.cardSubtitle} type="greyed">
              Fill out a 5-minute form to get personalized questions for your doctor
            </ThemedText>
            <TouchableOpacity style={styles.primaryButton} onPress={handleVisitPrep}>
              <Text style={styles.primaryButtonText}>Prep for Visit</Text>
              <View style={styles.buttonIcon}>
                <MaterialIcons
                  size={16}
                  name="arrow-forward"
                  color="#ffffffff"
                />
              </View>
            </TouchableOpacity>
          </View>
        </ThemedView>

        {/* Quick Actions Grid */}
        <View style={styles.quickActions}>
          <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>

          <View style={styles.actionGrid}>
            {/* History Card */}
            <Button style={styles.actionCard} onPress={handleHistory} type="bordered">
              <ThemedView style={styles.actionIconContainer} type="dusked">
                <MaterialIcons
                  size={28}
                  name="history"
                  color="#3b82f6"
                />
              </ThemedView>
              <ThemedText style={styles.actionTitle} type="whitened">History</ThemedText>
              <ThemedText style={styles.actionSubtitle} type="greyed">View past visits</ThemedText>
            </Button>

            {/* Settings Card */}
            <Button style={styles.actionCard} onPress={handleSettings} type="bordered">
              <ThemedView style={styles.actionIconContainer} type="dusked">
                <MaterialIcons
                  size={28}
                  name="settings"
                  color="#3b82f6"
                />
              </ThemedView>
              <ThemedText style={styles.actionTitle} type="whitened">Settings</ThemedText>
              <ThemedText style={styles.actionSubtitle} type="greyed">App preferences</ThemedText>
            </Button>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <ThemedText style={styles.sectionTitle}>Your Progress</ThemedText>
          <View style={styles.statsGrid}>
            <ThemedView style={styles.statCard}>
              <ThemedText style={styles.statNumber}>{Object.keys(appointments).length}</ThemedText>
              <ThemedText style={styles.statLabel} type="greyed">Total Visits</ThemedText>
            </ThemedView>
          </View>
        </View>
      </ScrollView >
      <Footer type="absolute" />
    </>
  );
};

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
  welcomeText: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 2,
    fontWeight: '400',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: "left",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: "left",
    marginBottom: 14,
  },
  mainCard: {
    marginHorizontal: 24,
    marginTop: -20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardContent: {
    padding: 24,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 24,
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
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginRight: 8,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActions: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: "left",
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  actionCard: {
    flex: 1,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  statsSection: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3b82f6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
});
