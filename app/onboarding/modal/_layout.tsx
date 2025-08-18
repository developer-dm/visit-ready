import { Button } from "@/components/Button";
import { UserProvider } from "@/utils/userContext";
import { Stack, useRouter } from "expo-router";

export default function ModalLayout() {
    const router = useRouter()

    return (
        <UserProvider>
            <Stack screenOptions={{
                headerRight: () => (
                    <Button type="close" onPress={() => router.dismissTo("/onboarding")} />
                ),
            }}>
                <Stack.Screen name="index" options={{ headerShown: true, title: "Step 1" }} />
                <Stack.Screen name="second" options={{ headerShown: true, title: "Step 2" }} />
                <Stack.Screen name="final" options={{ headerShown: true, title: "Step 3" }} />
            </Stack>
        </UserProvider>
    );
}
