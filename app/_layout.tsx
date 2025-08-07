import { DarkTheme, DefaultTheme, ThemeProvider, } from '@react-navigation/native';
import { Stack } from "expo-router";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const containerColor = useThemeColor({}, "container");

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={[styles.container, { backgroundColor: containerColor }]}>
            <Stack
              screenOptions={{
                headerShown: false,
                gestureEnabled: false,
              }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="about" options={{ gestureEnabled: true }} />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(setup)/1" />
              <Stack.Screen name="(setup)/2" />
              <Stack.Screen name="(setup)/3" />
            </Stack>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </SafeAreaProvider>
    </ThemeProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
