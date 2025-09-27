import { useAuthStore } from "@/stores/authStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  const { isVip } = useAuthStore();

  return (
    <Tabs>
      <Tabs.Protected guard={isVip}>
        <Tabs.Screen name="vip"
          options={{
            headerShown: true,
            title: "Provider",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="medical-services" color={color} size={size} />
            ),
          }}
        />
      </Tabs.Protected>
      <Tabs.Screen name="index"
        options={{
          headerShown: true,
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen name="history"
        options={{
          headerShown: true,
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="history" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: true,
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
