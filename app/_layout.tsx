import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from "@/utils/authStore";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

if (!isWeb) {
  SplashScreen.preventAutoHideAsync();
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const {
    isLoggedIn,
    shouldCreateAccount,
    hasCompletedOnboarding,
    _hasHydrated,
  } = useAuthStore();

  useEffect(() => {
    if (_hasHydrated) {
      SplashScreen.hideAsync();
    }
  }, [_hasHydrated]);

  if (!_hasHydrated && !isWeb) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="appointment-prep" options={{ presentation: "modal", headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="question-generator" options={{ headerShown: false }} />
          <Stack.Screen name="appointment-view" options={{ presentation: "modal", headerShown: false, gestureEnabled: true }} />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn && hasCompletedOnboarding}>
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="about" options={{ presentation: "modal", headerShown: true, title: "About", gestureEnabled: true }} />
          <Stack.Protected guard={shouldCreateAccount}>
            <Stack.Screen name="create-account" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack.Protected>
        <Stack.Protected guard={!hasCompletedOnboarding}>
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Screen name="+not-found" options={{ headerShown: true, title: 'Oops!' }} />
      </Stack>
    </ThemeProvider>
  );
}
