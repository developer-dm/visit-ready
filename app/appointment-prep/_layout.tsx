import { Stack } from "expo-router";

export default function AppointmentPrepLayout() {
    return (
        <Stack>
            <Stack.Screen name="modal" options={{ presentation: "modal", headerShown: false, gestureEnabled: false }} />
        </Stack>
    );
}
