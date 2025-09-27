import { CloseButton } from "@/components/Close";
import { Stack, useRouter } from "expo-router";

export default function ModalLayout() {
    const router = useRouter();

    return (
        <Stack screenOptions={{
            headerRight: () => (
                <CloseButton type="default" clearContext={false} />
            ),
        }}>
            <Stack.Screen name="index" options={{ presentation: "modal", headerShown: true, title: "Appointment", gestureEnabled: false }} />
        </Stack>
    );
}
