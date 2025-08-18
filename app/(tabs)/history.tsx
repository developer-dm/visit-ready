import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HistoryScreen() {
    return (
        <View style={styles.container}>
            <ThemedText type="title">Past Visits</ThemedText>
            <ThemedText type="subtitle">View your visit history</ThemedText>
            <Divider bottom={30} />
            <ThemedView type="card">
                <ScrollView style={styles.scrollContainer}>

                </ScrollView>
            </ThemedView>
            <Link asChild push href="/(tabs)">
                <Button type="light" style={styles.button}>
                    <MaterialIcons size={30} name="delete-outline" color={"#ff0000ff"} style={styles.buttonIcon} />
                    <ThemedText type="default" style={{ color: "#ff0000ff" }}>Delete all past visits</ThemedText>
                </Button>
            </Link>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    button: {
        marginTop: 20,
    },
    buttonIcon: {
        position: "absolute",
        left: 10,
    },
    scrollContainer: {
        width: "100%",
        height: 250,
    },
});
