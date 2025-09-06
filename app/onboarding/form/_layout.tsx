import { Button } from "@/components/Button";
import { UserProvider } from "@/utils/userContext";
import { Stack, useRouter } from "expo-router";
import { Alert } from "react-native";

export default function ModalLayout() {
    const router = useRouter();

    const handleClose = () => {
        Alert.alert('Close Form', 'Are you sure you want to discard this form?', [
            {
                text: 'Discard',
                onPress: () => router.dismissTo("/onboarding"),
                style: "destructive",
            },
            {
                text: 'Cancel',
                style: 'cancel',
            },
        ]);
    };

    return (
        <UserProvider>
            <Stack screenOptions={{
                headerRight: () => (
                    <Button type="close" onPress={handleClose} />
                ),
            }}>
                <Stack.Screen name="index" options={{ headerShown: true, title: "Step 1" }} />
                <Stack.Screen name="second" options={{ headerShown: true, title: "Step 2" }} />
                <Stack.Screen name="final" options={{ headerShown: true, title: "Step 3" }} />
            </Stack>
        </UserProvider>
    );
}
