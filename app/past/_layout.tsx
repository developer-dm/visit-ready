import { Stack, useRouter } from "expo-router";

export default function ModalLayout() {
    const router = useRouter();

    return (
        <Stack>
            <Stack.Screen name="index" options={{ presentation: "modal", headerShown: false, gestureEnabled: true }} />
        </Stack>
    );
}
