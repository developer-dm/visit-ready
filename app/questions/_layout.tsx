import { Stack } from "expo-router";

export default function QuestionLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, gestureEnabled: false }} />
        </Stack>
    );
}
