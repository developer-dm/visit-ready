import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from "@/stores/authStore";
import "@/utils/polyfills";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar, } from "expo-status-bar";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import WebScreen from './web';

SplashScreen.preventAutoHideAsync();

const isWeb = Platform.OS === "web";

export default function RootLayout() {
  if (isWeb) {
    return <WebScreen />
  };

  const colorScheme = useColorScheme();
  const { isLoggedIn, hasCompletedOnboarding, _hasHydrated } = useAuthStore();

  useEffect(() => {
    if (_hasHydrated) {
      SplashScreen.hideAsync()
    }
  }, [_hasHydrated]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="prep" options={{ presentation: "modal", headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="past" options={{ presentation: "modal", headerShown: false, gestureEnabled: true }} />
          <Stack.Screen name="questions" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn && hasCompletedOnboarding}>
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!hasCompletedOnboarding}>
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Screen name="about" options={{ presentation: "modal", headerShown: true, title: "About", gestureEnabled: true }} />
        <Stack.Screen name="+not-found" options={{ headerShown: true, title: 'Oops!' }} />
      </Stack>
    </ThemeProvider>
  );
}
