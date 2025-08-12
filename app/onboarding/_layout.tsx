import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="second" options={{ headerShown: false }} />
        <Stack.Screen name="third" options={{ headerShown: false }} />
        <Stack.Screen name="final" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}
