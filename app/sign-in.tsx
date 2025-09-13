import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { authenticateWithBiometrics } from "@/utils/auth";
import { useAuthStore } from "@/utils/authStore";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SignInScreen() {
  const { logInAsVip } = useAuthStore();

  const handleLogin = async () => {
    await authenticateWithBiometrics();
  };

  const handleVipLogin = () => {
    logInAsVip();
  };

  return (
    <View style={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.brandingContainer}>
          <ThemedView style={styles.logoContainer} type="dusked">
            <Image source={require("@/assets/images/favicon.png")} style={styles.logo} />
          </ThemedView>
          <ThemedText style={styles.appTitle} type="whitened">
            Visit Ready
          </ThemedText>
          <ThemedText style={styles.appSubtitle} type="greyed">
            Make the most of every medical visit
          </ThemedText>
        </View>
      </View>

      {/* Welcome Card */}
      <ThemedView style={styles.welcomeCard}>
        <View style={styles.cardContent}>
          <View style={styles.welcomeSection}>
            <ThemedView style={styles.welcomeIconContainer} type="dusked">
              <MaterialIcons name="medical-services" size={24} color="#3b82f6" />
            </ThemedView>
            <ThemedText style={styles.welcomeTitle} type="whitened">
              Welcome Back
            </ThemedText>
            <ThemedText style={styles.welcomeSubtitle} type="greyed">
              Choose how you'd like to access your account
            </ThemedText>
          </View>

          {/* Login Options */}
          <View style={styles.loginOptions}>
            {/* Biometric Login */}
            <TouchableOpacity style={styles.primaryLoginButton} onPress={handleLogin}>
              <View style={styles.loginButtonContent}>
                <ThemedView style={styles.loginIconContainer} lightColor='#ffffff33' darkColor='#ffffff33'>
                  <MaterialIcons name="fingerprint" size={24} color="#ffffff" />
                </ThemedView>
                <View style={styles.loginTextContainer}>
                  <Text style={styles.primaryLoginText}>Biometric Login</Text>
                  <Text style={styles.loginSubtext}>Use fingerprint or face recognition (if supported)</Text>
                </View>
                <MaterialIcons name="arrow-forward" size={20} color="#ffffff" />
              </View>
            </TouchableOpacity>

            {/* Future Provider Login
              <TouchableOpacity
                style={[styles.secondaryLoginButton, styles.vipButton]}
                onPress={handleVipLogin}
              >
                <View style={styles.loginButtonContent}>
                  <ThemedView style={styles.vipIconContainer}>
                    <MaterialIcons name="star" size={24} color="#f59e0b" />
                  </ThemedView>
                  <View style={styles.loginTextContainer}>
                    <Text style={styles.vipLoginText}>VIP Access</Text>
                    <Text style={styles.vipSubtext}>Premium features available</Text>
                  </View>
                  <MaterialIcons name="arrow-forward" size={20} color="#f59e0b" />
                </View>
              </TouchableOpacity>
              */}
          </View>
        </View>
      </ThemedView>

      {/* Additional Options */}
      <View style={styles.additionalOptions}>
        <Link asChild push href="/about">
          <TouchableOpacity style={styles.linkButton}>
            <MaterialIcons name="info-outline" size={20} color="#64748b" />
            <ThemedText style={styles.linkText} type="greyed">
              About Visit Ready
            </ThemedText>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <ThemedText style={styles.footerText} type="greyed">
          Your health data is secure and private
        </ThemedText>
      </View>

      {/* Bottom Spacer */}
      <View style={styles.bottomSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  brandingContainer: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
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
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },
  welcomeCard: {
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
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  welcomeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
  loginOptions: {
    gap: 16,
  },
  primaryLoginButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  secondaryLoginButton: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  vipButton: {
    backgroundColor: '#fef3c7',
    borderColor: '#f59e0b',
  },
  loginButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  vipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    backgroundColor: '#fcd34d33',
  },
  guestIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    backgroundColor: '#f1f5f9',
  },
  loginTextContainer: {
    flex: 1,
  },
  primaryLoginText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  loginSubtext: {
    fontSize: 13,
    fontWeight: '400',
    color: '#ffffff99',
  },
  vipLoginText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f59e0b',
    marginBottom: 2,
  },
  vipSubtext: {
    fontSize: 13,
    fontWeight: '400',
    color: '#92400e',
  },
  secondaryLoginText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
    color: '#1e293b',
  },
  guestSubtext: {
    fontSize: 13,
    fontWeight: '400',
    color: '#64748b',
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
  footer: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  bottomSpacer: {
    height: 40,
  },
});
