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

export default function login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        router.replace("/dashboard");
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.background}>
                    <Button type="return" onPress={() => {router.back()}} />
                    <MaterialIcons size={125} name="login" color={"#004678"} style={styles.icon} />
                    <ThemedText type="title">Login</ThemedText>
                    <ThemedText type="subtitle">Enter your credentials to continue</ThemedText>
                    <Divider />
                    <ThemedView style={styles.card}>
                        <Textbox
                            placeholder="Email"
                            onChangeText={setEmail}
                            autoComplete="email"
                        />
                        <Textbox
                            placeholder="Password"
                            onChangeText={setPassword}
                            autoComplete="current-password"
                            secureTextEntry={true}
                        />
                        {error ? <ThemedText type="error">{error}</ThemedText> : null}
                        <Button type={"dark"} onPress={handleLogin} style={{ marginTop: 30 }}>
                            <ThemedText type="default" style={{ color: "#ffffffff" }}>Log In</ThemedText>
                        </Button>
                    </ThemedView>
                    <Footer />
                </View>
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
    card: {
        width: "100%",
        height: "auto",
        borderRadius: 15,
        boxShadow: "0px 0px 10px #0000005c",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
    },
});
