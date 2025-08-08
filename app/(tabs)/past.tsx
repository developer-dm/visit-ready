import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";

export default function past() {
    const router = useRouter();

    const handleDeleteVisit = () => {

    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ThemedView type="container">
                <ThemedText type="title">Past Visits</ThemedText>
                <ThemedText type="subtitle">View your previous medical appointments</ThemedText>
                <Divider />
                <Button type={"light"} onPress={handleDeleteVisit}>
                    <MaterialIcons size={20} name="delete" color={"#323232ff"} style={styles.icon} />
                    <ThemedText type="default" style={{ color: "#323232ff" }}>Delete past visits</ThemedText>
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
