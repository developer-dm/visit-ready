import { Stack } from "expo-router";

export default function PrepLayout() {
    return (
        <Stack>
            <Stack.Screen name="modal" options={{ presentation: "modal", headerShown: false, gestureEnabled: false }} />
        </Stack>
    );
}
