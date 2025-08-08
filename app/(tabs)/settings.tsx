import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";

export default function settings() {
    const router = useRouter();

    const handleLogout = () => {
        router.replace("/")
    };

    const handleDeleteAccount = () => {
        router.replace("/")
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ThemedView type="container">
                <ThemedText type="title">Settings</ThemedText>
                <ThemedText type="subtitle">Edit and delete your account</ThemedText>
                <Divider />
                <Button type="light" onPress={handleLogout}>
                    <MaterialIcons size={20} name="logout" color={"#323232ff"} style={styles.icon} />
                    <ThemedText type="default" style={{ color: "#323232ff" }}>Log out</ThemedText>
                </Button>
                <Button type="light" onPress={handleDeleteAccount} style={{ borderColor: "#ff0000ff" }}>
                    <MaterialIcons size={20} name="person-remove" color={"#ff0000ff"} style={styles.icon} />
                    <ThemedText type="default" style={{ color: "#ff0000ff" }}>Delete Account</ThemedText>
                </Button>
                <Footer />
            </ThemedView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    icon: {
        marginRight: 5,
    },
});
