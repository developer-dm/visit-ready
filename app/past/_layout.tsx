import { Button } from "@/components/Button";
import { Stack, useRouter } from "expo-router";

export default function ModalLayout() {
    const router = useRouter();

    return (
        <Stack screenOptions={{
            headerRight: () => (
                <Button type="close" onPress={() => router.dismiss()} />
            ),
        }}>
            <Stack.Screen name="index" options={{ presentation: "modal", headerShown: true, title: "Appointment", gestureEnabled: false }} />
        </Stack>
    );
}
