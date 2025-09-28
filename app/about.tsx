import { expo } from "@/app.json";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image, ScrollView, StyleSheet, View } from "react-native";

export default function AboutScreen() {
  const features = [
    {
      icon: "quiz",
      title: "Question Generation",
      description: "Get personalized questions to ask your doctor based on your symptoms"
    },
    {
      icon: "history",
      title: "Track Your Visits",
      description: "Keep a record of all your appointments and progress"
    },
    {
      icon: "lock",
      title: "Your Health Data is Secure",
      description: "All health data is encrypted and stored on your device"
    },
  ];

  return (
    <ThemedView type="container">
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <ThemedView style={styles.logoContainer} type="dusked">
            <Image source={require("@/assets/images/favicon.png")} style={styles.logo} />
          </ThemedView>
          <ThemedText style={styles.appTitle} type="whitened">
            Visit Ready
          </ThemedText>
          <ThemedText style={styles.version} type="greyed">
            Version {expo.version}
          </ThemedText>
        </View>

        {/* About Card */}
        <ThemedView style={styles.aboutCard}>
          <View style={styles.cardContent}>
            <View style={styles.aboutSection}>
              <ThemedView style={styles.aboutIconContainer} type="dusked">
                <MaterialIcons name="medical-services" size={24} color="#3b82f6" />
              </ThemedView>
              <ThemedText style={styles.sectionTitle} type="whitened">
                What is Visit Ready?
              </ThemedText>
              <ThemedText style={styles.description} type="greyed">
                Visit Ready is a mobile app designed to help you prepare for medical appointments ahead of visits.
                Make every healthcare interaction more productive and meaningful.
              </ThemedText>
            </View>
          </View>
        </ThemedView>

        {/* Features Card */}
        <ThemedView style={styles.featuresCard}>
          <View style={styles.cardContent}>
            <View style={styles.featuresHeader}>
              <ThemedView style={styles.featuresIconContainer} type="dusked">
                <MaterialIcons name="stars" size={24} color="#10b981" />
              </ThemedView>
              <ThemedText style={styles.sectionTitle} type="whitened">
                Key Features
              </ThemedText>
              <ThemedText style={styles.featuresSubtitle} type="greyed">
                Everything you need to prepare for your medical visits
              </ThemedText>
            </View>

            <View style={styles.featuresList}>
              {features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <ThemedView style={styles.featureIconContainer} type="dusked">
                    <MaterialIcons name={feature.icon as any} size={20} color="#3b82f6" />
                  </ThemedView>
                  <View style={styles.featureContent}>
                    <ThemedText style={styles.featureTitle} type="whitened">
                      {feature.title}
                    </ThemedText>
                    <ThemedText style={styles.featureDescription} type="greyed">
                      {feature.description}
                    </ThemedText>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ThemedView>

        {/* Credits Card */}
        <ThemedView style={styles.creditsCard}>
          <View style={styles.cardContent}>
            <View style={styles.creditsSection}>
              <ThemedView style={styles.creditsIconContainer} type="dusked">
                <MaterialIcons name="code" size={24} color="#8b5cf6" />
              </ThemedView>
              <ThemedText style={styles.sectionTitle} type="whitened">
                Development
              </ThemedText>
              <ThemedText style={styles.creditsText} type="greyed">
                Developed by Dakota
              </ThemedText>
              <ThemedText style={styles.creditsSubtext} type="greyed">
                Built to improve healthcare experiences for everyone
              </ThemedText>
            </View>
          </View>
        </ThemedView>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <ThemedText style={styles.contactTitle} type="whitened">
            Questions or Feedback?
          </ThemedText>
          <ThemedText style={styles.contactText} type="greyed">
            We'd love to hear from you to make Visit Ready even better.
          </ThemedText>
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
    paddingVertical: 30,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  logo: {
    width: 50,
    height: 50,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  aboutCard: {
    marginHorizontal: 24,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  featuresCard: {
    marginHorizontal: 24,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  creditsCard: {
    marginHorizontal: 24,
    marginBottom: 24,
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
  aboutSection: {
    alignItems: 'center',
  },
  aboutIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'left',
    lineHeight: 22,
  },
  featuresHeader: {
    alignItems: 'center',
    marginBottom: 28,
  },
  featuresIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  featuresSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
  },
  featuresList: {
    gap: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginTop: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  missionSection: {
    alignItems: 'center',
  },
  missionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  creditsSection: {
    alignItems: 'center',
  },
  creditsIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  creditsText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
  creditsSubtext: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  contactSection: {
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
  },
});
