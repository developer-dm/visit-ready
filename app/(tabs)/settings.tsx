import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function settings() {
    const handleLogout = () => {

    };

    const handleDeleteAccount = () => {

    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.background}>
                <Text style={styles.title}>Settings</Text>
                <Text style={styles.subtitle}>Edit and delete your account</Text>
                <View style={styles.divider} />
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <MaterialIcons size={20} name="logout" color={"#323232ff"} style={styles.icon} />
                    <Text style={styles.buttonText}>Log out</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {borderColor: "#ff0000ff"}]} onPress={handleDeleteAccount}>
                    <MaterialIcons size={20} name="person-remove" color={"#ff0000ff"} style={styles.icon} />
                    <Text style={[styles.buttonText, {color: "#ff0000ff"}]}>Delete Account</Text>
                </TouchableOpacity>
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>Visit Ready | v1.0</Text>
                </View>
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
