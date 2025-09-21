import LoadingScreen from '@/components/Loading';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from "@/utils/authStore";
import '@/utils/polyfills';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import WebScreen from './web';

const isWeb = Platform.OS === "web";

if (!isWeb) {
  SplashScreen.preventAutoHideAsync();
}

export default function RootLayout() {
  if (Platform.OS === 'web') {
    return <WebScreen />;
  }

  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);

  const {
    isLoggedIn,
    hasCompletedOnboarding,
    _hasHydrated,
  } = useAuthStore();

  useEffect(() => {
    if (_hasHydrated) {
      SplashScreen.hideAsync();
    }
  }, [_hasHydrated]);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [isLoggedIn, hasCompletedOnboarding]);

  if (!_hasHydrated && !isWeb) {
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style="auto" />
        <LoadingScreen
          visible={true}
          message="Starting up..."
          subMessage="Loading your data"
        />
      </ThemeProvider>
    );
  }

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
      {isLoading && (
        <LoadingScreen
          visible={isLoading}
          message={'Loading...'}
          subMessage={'Switching pages'}
        />
      )}
    </ThemeProvider>
  );
}
