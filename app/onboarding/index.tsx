import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { ThemedText } from "@/components/ThemedText";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

export default function OnboardingInitialScreen() {
    return (
        <View style={styles.container}>
            <Image source={require("@/assets/images/favicon.png")} style={styles.icon} />
            <ThemedText type="title">Visit Ready</ThemedText>
            <ThemedText type="subtitle">Make the most of every medical visit</ThemedText>
            <Divider top={20} bottom={30} />
            <Link asChild replace href="/onboarding/second">
                <Button type="dark" style={styles.button}>
                    <MaterialIcons name="arrow-forward" size={30} color={"#fff"} style={styles.buttonIcon} />
                    <ThemedText type="default" style={{ color: "#fff" }}>Begin Setup</ThemedText>
                </Button>
            </Link>
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
        margin: 10,
    },
    icon: {
        width: 100,
        height: 100,
    },
    buttonIcon: {
        position: "absolute",
        left: 10,
    },
});
