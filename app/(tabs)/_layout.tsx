import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen name="past" options={{
        title: "Past Visits",
        tabBarIcon: ({ color }) => <MaterialIcons size={28} name="medical-services" color={color} />,
      }} />
      <Tabs.Screen name="index" options={{
        title: "Home",
        tabBarIcon: ({ color }) => <MaterialIcons size={28} name="home" color={color} />,
      }} />
      <Tabs.Screen name="settings" options={{
        title: "Settings",
        tabBarIcon: ({ color }) => <MaterialIcons size={28} name="settings" color={color} />,
      }} />
    </Tabs>
  );
}
