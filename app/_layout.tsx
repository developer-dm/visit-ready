import { UserProvider } from "@/constants/UserContext";
import { DarkTheme, DefaultTheme, ThemeProvider, } from '@react-navigation/native';
import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <UserProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SafeAreaProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              gestureEnabled: false,
            }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="about" options={{ gestureEnabled: true }} />
            <Stack.Screen name="auth" />
            <Stack.Screen name="(setup)/1" />
            <Stack.Screen name="(setup)/2" />
            <Stack.Screen name="(setup)/3" />
            <Stack.Screen name="(setup)/4" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </SafeAreaProvider>
      </ThemeProvider >
    </UserProvider>
  );
}
