import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function past() {
    const router = useRouter();

    const handleDeleteVisit = () => {

    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.background}>
                <Text style={styles.title}>Past Visits</Text>
                <Text style={styles.subtitle}>View your previous medical appointments</Text>
                <View style={styles.divider} />
                <TouchableOpacity style={styles.button} onPress={handleDeleteVisit}>
                    <MaterialIcons size={20} name="delete" color={"#323232ff"} style={styles.icon} />
                    <Text style={styles.buttonText}>Delete Visits</Text>
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
        color: "#004678",
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
    text: {
        fontSize: 18,
        textAlign: "center",
        fontFamily: "Sans-serif",
        fontWeight: "medium",
        color: "#ffffffff",
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
