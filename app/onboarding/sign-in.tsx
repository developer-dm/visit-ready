import { Footer } from "@/components/Footer";
import LoadingScreen from "@/components/Loading";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { authenticateWithBiometrics, checkAuthenticationCapabilities } from "@/utils/auth";
import { useAuthStore } from "@/utils/authStore";
import { useDataStore } from "@/utils/dataStore";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SignInScreen() {
  type RouteParams = {
    data: string;
  };

  const { logInAsVip, completeOnboarding } = useAuthStore();
  const { addSignupData } = useDataStore();
  const [authType, setAuthType] = useState<'biometric' | 'passcode' | 'none'>('none');
  const [isLoading, setIsLoading] = useState(true);

  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const signup = route.params?.data ? JSON.parse(route.params.data) : null;

  const handleLogin = async () => {
    const result = await authenticateWithBiometrics();
    if (result) {
      addSignupData(signup);
      completeOnboarding();
    };
  };

  const getAuthButtonConfig = () => {
    switch (authType) {
      case 'biometric':
        return {
          icon: 'fingerprint',
          title: 'Biometric Login',
          subtitle: 'Use fingerprint or face recognition'
        };
      case 'passcode':
        return {
          icon: 'lock',
          title: 'Device Passcode',
          subtitle: 'Use your device passcode to sign in'
        };
      default:
        return {
          icon: 'login',
          title: 'Sign In',
          subtitle: 'Authentication not available on this device'
        };
    }
  };

  const authConfig = getAuthButtonConfig();

  const preliminaryCheck = async () => {
    const result = await checkAuthenticationCapabilities();
    setAuthType(result)
    setIsLoading(false);
  }

  useEffect(() => {
    preliminaryCheck();
  }, []);

  if (isLoading) {
    return (
      <LoadingScreen
        visible={true}
        message={'Loading...'}
        subMessage={'Getting authentication method'}
      />
    );
  }

  return (
    <View style={styles.content}>
      <View style={styles.cardContent}>
        <View style={styles.welcomeSection}>
          <ThemedText style={styles.welcomeTitle} type="whitened">
            Authentication
          </ThemedText>
          <ThemedText style={styles.welcomeSubtitle} type="greyed">
            Choose how you'd like to access your account
          </ThemedText>
        </View>

        {/* Login Options */}
        <View style={styles.loginOptions}>
          <TouchableOpacity
            style={[
              styles.primaryLoginButton,
              authType === 'none' && styles.disabledButton
            ]}
            onPress={handleLogin}
            disabled={authType === 'none'}
          >
            <View style={styles.loginButtonContent}>
              <ThemedView style={styles.loginIconContainer} lightColor='#ffffff33' darkColor='#ffffff33'>
                <MaterialIcons name={authConfig.icon as 'fingerprint' | 'lock' | 'login'} size={24} color="#ffffff" />
              </ThemedView>
              <View style={styles.loginTextContainer}>
                <Text style={styles.primaryLoginText}>{authConfig.title}</Text>
                <Text style={styles.loginSubtext}>{authConfig.subtitle}</Text>
              </View>
              <MaterialIcons name="arrow-forward" size={20} color="#ffffff" />
            </View>
          </TouchableOpacity>

          {authType === 'none' && (
            <View style={styles.infoContainer}>
              <MaterialIcons name="info-outline" size={16} color="#64748b" />
              <ThemedText style={styles.infoText} type="greyed">
                This device doesn't support secure authentication. Please enable device lock screen security in your device settings.
              </ThemedText>
            </View>
          )}
        </View>
      </View>

      <Footer type="absolute" hasSpacer={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  cardContent: {
    padding: 24,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 32,
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
    maxWidth: 400,
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
  disabledButton: {
    backgroundColor: '#94a3b8',
    shadowOpacity: 0.1,
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
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    gap: 8,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
  },
});

