import { CloseButton } from "@/components/Close";
import { Stack } from "expo-router";

export default function ModalLayout() {
    return (
        <Stack screenOptions={{
            headerRight: () => (
                <CloseButton type="discard" clearContext={true} route="/onboarding" />
            ),
            headerBackButtonDisplayMode: "minimal"
        }}>
            <Stack.Screen name="index" options={{ headerShown: true, title: "Step 1" }} />
            <Stack.Screen name="final" options={{ headerShown: true, title: "Step 3" }} />
        </Stack>
    );
}
