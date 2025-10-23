import AppointmentCard from '@/components/AppointmentCard';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useDataStore } from '@/stores/dataStore';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
  const { appointments } = useDataStore();

  const totalAppointments = Object.keys(appointments).length;

  const appointmentArray = Object.entries(appointments).map(([id, data]) => ({
    id,
    ...data,
    appointmentDate: new Date(data.appointmentDate || "")
  })).sort((a, b) => a.appointmentDate.getTime() - b.appointmentDate.getTime());

  const now = new Date();

  // Get upcoming appointment
  const upcomingAppointment = appointmentArray.find(
    apt => apt.appointmentDate > now
  );

  // Get monthly appointments
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const monthlyAppointments = appointmentArray.filter(
    apt => apt.appointmentDate > now && apt.appointmentDate <= thirtyDaysFromNow
  );

  // Get weekly appointments
  const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const weeklyAppointments = appointmentArray.filter(
    apt => apt.appointmentDate > now && apt.appointmentDate <= sevenDaysFromNow
  );

  const handleVisitPrep = () => {
    router.push("/prep");
  };

  const handleHistory = () => {
    router.push("/(tabs)/history");
  };

  const handleSettings = () => {
    router.push("/(tabs)/settings");
  };

  const handleUpcomingAppointment = (id: string) => {
    router.push({
      pathname: "/modals/past",
      params: {
        id: id
      },
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <ThemedText style={styles.appTitle} type="whitened">Visit Ready</ThemedText>
        <ThemedText style={styles.subtitle} type="greyed">Your appointments at a glance</ThemedText>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Upcoming Visit</ThemedText>
        </View>

        {upcomingAppointment ? (
          <TouchableOpacity onPress={() => { handleUpcomingAppointment(upcomingAppointment.id) }}>
            <AppointmentCard appointment={upcomingAppointment} />
          </TouchableOpacity>
        ) : (
          <ThemedView style={styles.emptyState}>
            <MaterialIcons size={48} name="event-available" color="#6b7280" />
            <ThemedText style={styles.emptyStateTitle} type="whitened">No upcoming visits</ThemedText>
            <ThemedText style={styles.emptyStateText} type="greyed">
              Fill out a short form to start your preparation
            </ThemedText>
            <TouchableOpacity style={styles.newVisitButton} onPress={handleVisitPrep}>
              <Text style={styles.newVisitButtonText}>
                Start Visit Prep
              </Text>
              <View style={styles.newVisitButtonIcon}>
                <MaterialIcons
                  size={16}
                  name="arrow-forward"
                  color="#ffffffff"
                />
              </View>
            </TouchableOpacity>
          </ThemedView>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
        </View>
        <View style={styles.actionGrid}>
          <Button style={styles.actionCard} onPress={handleVisitPrep} type="bordered">
            <ThemedView style={styles.actionIconContainer} type="dusked">
              <MaterialIcons size={28} name="edit-note" color="#3b82f6" />
            </ThemedView>
            <ThemedText style={styles.actionTitle} type="whitened">New Prep</ThemedText>
          </Button>

          <Button style={styles.actionCard} onPress={handleHistory} type="bordered">
            <ThemedView style={styles.actionIconContainer} type="dusked">
              <MaterialIcons size={28} name="history" color="#3b82f6" />
            </ThemedView>
            <ThemedText style={styles.actionTitle} type="whitened">History</ThemedText>
          </Button>

          <Button style={styles.actionCard} onPress={handleSettings} type="bordered">
            <ThemedView style={styles.actionIconContainer} type="dusked">
              <MaterialIcons size={28} name="settings" color="#3b82f6" />
            </ThemedView>
            <ThemedText style={styles.actionTitle} type="whitened">Settings</ThemedText>
          </Button>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Preparation Tips</ThemedText>
        </View>
        <ThemedView style={styles.tipsCard}>
          <View style={styles.tipItem}>
            <MaterialIcons size={20} name="lightbulb-outline" color="#f59e0b" />
            <ThemedText style={styles.tipText} type="greyed">
              Prepare 24-48 hours before your visit for best results.
            </ThemedText>
          </View>
          <Divider type='horizontal' top={10} bottom={10} />
          <View style={styles.tipItem}>
            <MaterialIcons size={20} name="priority-high" color="#ef4444" />
            <ThemedText style={styles.tipText} type="greyed">
              Keep track of your past health and medication history.
            </ThemedText>
          </View>
        </ThemedView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Your Progress</ThemedText>
        </View>
        <View style={styles.statsGrid}>
          <ThemedView style={styles.statCard}>
            <ThemedText style={styles.statNumber}>{totalAppointments}</ThemedText>
            <ThemedText style={styles.statLabel} type="greyed">Total Visits</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statCard}>
            <ThemedText style={styles.statNumber}>{monthlyAppointments.length}</ThemedText>
            <ThemedText style={styles.statLabel} type="greyed">This Month</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statCard}>
            <ThemedText style={styles.statNumber}>{weeklyAppointments.length}</ThemedText>
            <ThemedText style={styles.statLabel} type="greyed">This Week</ThemedText>
          </ThemedView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 12,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
  },
  newVisitButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 36,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newVisitButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  newVisitButtonIcon: {
    width: 24,
    height: 24,
    borderRadius: 10,
    backgroundColor: '#ffffff33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
    textAlign: 'center',
  },
  tipsCard: {
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3b82f6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
});
