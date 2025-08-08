import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/constants/UserContext";

import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

export default function Step4() {
    const router = useRouter();

    const [agreement, setAgreement] = useState(false);
    const { firstName, lastName, DOB, sex, authMethod } = useUser();
    const [error, setError] = useState("");

    const handleNext = () => {
        if (agreement) {
            //console.log(firstName, lastName, DOB, sex, authMethod);
            setError("")
            router.push("/auth")
        } else {
            setError("Please accept the terms and conditions");
        };
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ThemedView type="container">
                <Button type="return" onPress={() => { router.dismissAll() }} />
                <ThemedText type="title" style={styles.title}>Step 4</ThemedText>
                <ThemedText type="subtitle" style={styles.subtitle}>Confirm your information below</ThemedText>
                <ThemedView type="card">
                    <ThemedText type="overhead" style={styles.overhead}>First Name:</ThemedText>
                    <ThemedText type="default" style={styles.text}>{firstName}</ThemedText>
                    <ThemedText type="overhead" style={styles.overhead}>Last Name:</ThemedText>
                    <ThemedText type="default" style={styles.text}>{lastName}</ThemedText>
                    <ThemedText type="overhead" style={styles.overhead}>Date of Birth:</ThemedText>
                    <ThemedText type="default" style={styles.text}>{DOB}</ThemedText>
                    <ThemedText type="overhead" style={styles.overhead}>Sex:</ThemedText>
                    <ThemedText type="default" style={styles.text}>{sex}</ThemedText>
                    <ThemedText type="overhead" style={styles.overhead}>Authentication Method:</ThemedText>
                    <ThemedText type="default" style={styles.text}>{authMethod}</ThemedText>
                    <TouchableOpacity style={styles.checkboxList} onPress={() => setAgreement(!agreement)}>
                        <Checkbox value={agreement} onValueChange={setAgreement} />
                        <ThemedText type="default" style={{ marginLeft: 10, fontSize: 16 }}>I agree to the terms and conditions</ThemedText>
                    </TouchableOpacity>
                    {error ? <ThemedText type="error" style={{ marginTop: 10 }}>{error}</ThemedText> : null}
                    <Button type={"dark"} onPress={handleNext} style={{ marginTop: 30 }}>
                        <ThemedText type="default" style={{ color: "#ffffffff" }}>Finish</ThemedText>
                    </Button>
                </ThemedView>
                <Footer />
            </ThemedView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        position: "absolute",
        top: 50
    },
    subtitle: {
        position: "absolute",
        top: 105
    },
    overhead: {
        marginBottom: 5,
    },
    text: {
        marginBottom: 10,
        textAlign: "left",
        color: "#0095ffff",
        width: "100%",
    },
    checkboxList: {
        width: "100%",
        height: 40,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
});
