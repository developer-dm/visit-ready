import { Button } from '@/components/Button';
import { Footer } from '@/components/Footer';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
  const router = useRouter()

  const handlePrepForVisit = () => {
    router.push("/appointment-prep/modal")
  };

  const handleHistory = () => {
    router.push("/(tabs)/history")
  };

  const handleSettings = () => {
    router.push("/(tabs)/settings")
  };

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <ThemedText style={styles.welcomeText} lightColor='#64748b' darkColor='#858585ff'>Welcome back</ThemedText>
          <ThemedText style={styles.appTitle} lightColor='#000000ff' darkColor='#ffffffff'>Visit Ready</ThemedText>
          <ThemedText style={styles.subtitle} lightColor='#64748b' darkColor='#858585ff'>Get ready for your next appointment</ThemedText>
        </View>

        {/* Main Action Card */}
        <ThemedView style={styles.mainCard}>
          <View style={styles.cardContent}>
            <ThemedText style={styles.cardTitle} lightColor='#1e293b' darkColor='#ffffffff'>Ready for Your Visit?</ThemedText>
            <ThemedText style={styles.cardSubtitle} lightColor='#64748b' darkColor='#858585ff'>
              Fill out a 5-minute form to get personalized questions for your doctor
            </ThemedText>
            <TouchableOpacity style={styles.primaryButton} onPress={handlePrepForVisit}>
              <Text style={styles.primaryButtonText}>Prep for Visit</Text>
              <View style={styles.buttonIcon}>
                <Text style={styles.iconText}>→</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ThemedView>

        {/* Quick Actions Grid */}
        <View style={styles.quickActions}>
          <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>

          <View style={styles.actionGrid}>
            {/* History Card */}
            <Button style={styles.actionCard} onPress={handleHistory} lightBorder='#d1d1d1ff' darkBorder='#393939ff'>
              <ThemedView style={styles.actionIconContainer} lightColor='#f1f5f9' darkColor='#1d1d1dff'>
                <MaterialIcons
                  size={28}
                  name="history"
                  color="#3b82f6"
                />
              </ThemedView>
              <ThemedText style={styles.actionTitle} lightColor='#1e293b' darkColor='#ffffffff'>History</ThemedText>
              <ThemedText style={styles.actionSubtitle} lightColor='#64748b' darkColor='#858585ff'>View past visits</ThemedText>
            </Button>

            {/* Settings Card */}
            <Button style={styles.actionCard} onPress={handleSettings} lightBorder='#d1d1d1ff' darkBorder='#393939ff'>
              <ThemedView style={styles.actionIconContainer} lightColor='#f1f5f9' darkColor='#1d1d1dff'>
                <MaterialIcons
                  size={28}
                  name="settings"
                  color="#3b82f6"
                />
              </ThemedView>
              <ThemedText style={styles.actionTitle} lightColor='#1e293b' darkColor='#ffffffff'>Settings</ThemedText>
              <ThemedText style={styles.actionSubtitle} lightColor='#64748b' darkColor='#858585ff'>App preferences</ThemedText>
            </Button>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <ThemedText style={styles.sectionTitle}>Your Progress</ThemedText>
          <View style={styles.statsGrid}>
            <ThemedView style={styles.statCard}>
              <ThemedText style={styles.statNumber}>x</ThemedText>
              <ThemedText style={styles.statLabel} lightColor='#64748b' darkColor='#ffffffff'>Visits This Month</ThemedText>
            </ThemedView>
            <ThemedView style={styles.statCard}>
              <ThemedText style={styles.statNumber}>x</ThemedText>
              <ThemedText style={styles.statLabel} lightColor='#64748b' darkColor='#ffffffff'>Total Visits</ThemedText>
            </ThemedView>
          </View>
        </View>
      </ScrollView>
      <Footer />
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
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
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
    borderRadius: 16,
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
    shadowRadius: 12,
    elevation: 6,
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
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
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
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
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
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
