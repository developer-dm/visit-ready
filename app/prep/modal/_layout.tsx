import { Stack } from "expo-router";

export default function ModalLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: true, title: "Step 1" }} />
            <Stack.Screen name="second" options={{ headerShown: true, title: "Step 2" }} />
            <Stack.Screen name="third" options={{ headerShown: true, title: "Step 3" }} />
            <Stack.Screen name="final" options={{ headerShown: true, title: "Step 4" }} />
        </Stack>
    );
}