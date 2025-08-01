import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function settings() {
    const router = useRouter();

    const handleLogout = () => {
        router.replace("/")
    };

    const handleDeleteAccount = () => {
        router.replace("/")
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.background}>
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
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    background: {
        height: "100%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
    },
    divider: {
        backgroundColor: "#ccc",
        height: 1,
        width: "100%",
        marginTop: 20,
        marginBottom: 30,
    },
    title: {
        fontSize: 48,
        fontWeight: "bold",
        fontFamily: "Sans-serif",
        textAlign: "center",
        color: "#323232ff",
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        fontFamily: "Sans-serif",
        fontWeight: "medium",
        color: "#000000ff",
    },
    icon: {
        marginRight: 5,
    },
    button: {
        flexDirection: "row",
        height: 50,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 3,
        margin: 10,
    },
    buttonText: {
        fontSize: 18,
        textAlign: "center",
        fontFamily: "Sans-serif",
        fontWeight: "medium",
        color: "#323232ff",
    },
});
