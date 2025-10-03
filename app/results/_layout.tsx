import { Stack } from "expo-router";

export default function ResultsLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="second" options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="third" options={{ headerShown: false, gestureEnabled: true }} />
            <Stack.Screen name="fourth" options={{ headerShown: false, gestureEnabled: true }} />
            <Stack.Screen name="final" options={{ headerShown: false, gestureEnabled: true }} />
        </Stack>
    );
}
