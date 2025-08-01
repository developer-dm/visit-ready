import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function past() {
    const router = useRouter();

    const handleDeleteVisit = () => {

    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.background}>
                <ThemedText type="title">Past Visits</ThemedText>
                <ThemedText type="subtitle">View your previous medical appointments</ThemedText>
                <Divider />
                <Button type={"light"} onPress={handleDeleteVisit}>
                    <MaterialIcons size={20} name="delete" color={"#323232ff"} style={styles.icon} />
                    <ThemedText type="default" style={{ color: "#323232ff" }}>Delete past visits</ThemedText>
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
    icon: {
        marginRight: 5,
    },
});
