import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";
import { Textbox } from "@/components/Textbox";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

export default function signup() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = () => {
        router.replace("/(tabs)/dashboard")
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ThemedView style={styles.card}>
                    <View style={styles.background}>
                        <Button type="return" onPress={() => { router.back() }} />
                        <MaterialIcons size={125} name="person-outline" color={"#004678"} style={styles.icon} />
                        <ThemedText type="title">Sign Up</ThemedText>
                        <ThemedText type="subtitle">Create your account below</ThemedText>
                        <Divider />
                        <Textbox
                            placeholder="Email"
                            onChangeText={setEmail}
                            autoComplete="email"
                        />
                        <Textbox
                            placeholder="Password"
                            onChangeText={setPassword}
                            autoComplete="new-password"
                            secureTextEntry={true}
                        />
                        {error ? <ThemedText type="error">{error}</ThemedText> : null}
                        <Button type={"dark"} onPress={handleSignup} style={{ marginTop: 30 }}>
                            <ThemedText type="default" style={{ color: "#ffffffff" }}>Create Account</ThemedText>
                        </Button>
                        <Footer />
                    </View>
                </ThemedView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: "90%",
        height: "90%",
        borderRadius: 15,
        boxShadow: "0px 0px 10px #0000005c",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    background: {
        height: "100%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 30,
        paddingBlockStart: 60,
    },
    icon: {
        marginBottom: 10,
    },
    input: {
        height: 40,
        width: "100%",
        borderWidth: 1,
        borderRadius: 3,
        color: "#323232ff",
        borderColor: "#323232ff",
        padding: 10,
        margin: 10,
    },
});
