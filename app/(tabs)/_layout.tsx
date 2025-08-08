import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Tabs } from "expo-router";

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}>
        <Tabs.Screen name="past" options={{
          title: "Past Visits",
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="history" color={color} />,
        }} />
        <Tabs.Screen name="dashboard" options={{
          title: "Home",
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="home" color={color} />,
        }} />
        <Tabs.Screen name="settings" options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="settings" color={color} />,
        }} />
      </Tabs>
    </ThemeProvider>
  );
}
