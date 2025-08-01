import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from "react";
import { Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

export default function signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = () => {

    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.background}>
                    <View style={styles.inputSection}>
                        <MaterialIcons size={125} name="person-outline" color={"#004678"} style={styles.icon} />
                        <Text style={styles.title}>Sign Up</Text>
                        <Text style={styles.subtitle}>Create your account below</Text>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={"#000000"}
                            onChangeText={setEmail}
                            autoComplete="email"
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor={"#000000"}
                            onChangeText={setPassword}
                            autoComplete="current-password"
                            secureTextEntry={true}
                            style={styles.input}
                        />
                        {error ? <Text style={styles.error}>{error}</Text> : null}
                        <TouchableOpacity style={styles.button} onPress={handleSignup}>
                            <Text style={styles.text}>Create Account</Text>
                        </TouchableOpacity>
                        <View style={styles.footerContainer}>
                            <Text style={styles.footerText}>Visit Ready | v1.0</Text>
                        </View>
                    </View>
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
        width: "90%",
        height: "90%",
        backgroundColor: "#ffffffff",
        borderRadius: 15,
        boxShadow: "0px 0px 10px #0000005c",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    inputSection: {
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
    title: {
        fontSize: 48,
        fontWeight: "bold",
        fontFamily: "Sans-serif",
        textAlign: "center",
        color: "#004678",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        fontFamily: "Sans-serif",
        fontWeight: "medium",
        color: "#000000ff",
        marginBottom: 40,
    },
    input: {
        height: 40,
        width: "100%",
        borderWidth: 1,
        borderRadius: 3,
        padding: 10,
        margin: 10,
    },
    button: {
        height: 50,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#004678",
        borderRadius: 3,
        margin: 10,
    },
    text: {
        fontSize: 18,
        textAlign: "center",
        fontFamily: "Sans-serif",
        fontWeight: "medium",
        color: "#ffffffff",
    },
    error: {
        fontSize: 12,
        color: "#ff0000",
        margin: 0,
    },
    footerContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 4,
        width: "100%",
    },
    footerText: {
        fontSize: 12,
        textAlign: "center",
        fontFamily: "Sans-serif",
        fontWeight: "medium",
        color: "#000000",
    },
});
