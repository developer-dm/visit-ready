import { Button } from "@/components/Button";
import { DatePicker } from "@/components/DatePicker";
import { Dropdown } from "@/components/Dropdown";
import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/utils/userContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

export default function Main() {
    const router = useRouter();

    const { signup } = useUser();

    //Dropdown variables
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
    ]);

    const handleNext = () => {
        setOpen(false);

        if (signup.DOB && signup.sex) {
            router.push("/onboarding/modal/final");
        } else {
            Alert.alert("Error", "Invalid birthdate or sex.");
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => { setOpen(false); }}>
            <View style={styles.container}>
                <ThemedText type="title" style={styles.title}>Step 2</ThemedText>
                <ThemedText type="subtitle" style={styles.subtitle}>Enter your information below</ThemedText>
                <ThemedView type="card">
                    <ThemedText type="overhead" style={{ marginBottom: 10 }}>Date of Birth</ThemedText>
                    <DatePicker
                        mode="date"
                        display="spinner"
                        value={signup.DOB}
                        setValue={signup.setDOB}
                    />
                    <ThemedText type="overhead" style={{ marginTop: 10 }}>Sex at birth</ThemedText>
                    <Dropdown
                        open={open}
                        value={signup.sex}
                        items={items}
                        setOpen={setOpen}
                        setValue={signup.setSex}
                        setItems={setItems}
                    />
                    <Button type={"dark"} onPress={handleNext} style={{ marginTop: 30 }}>
                        <ThemedText type="default" style={{ color: "#ffffffff" }}>Next</ThemedText>
                    </Button>
                </ThemedView>
                <Footer />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    title: {
        position: "absolute",
        top: 40
    },
    subtitle: {
        position: "absolute",
        top: 100
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        gap: "10%",
        marginTop: 10,
    },
    light: {
        height: 40,
        width: "45%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffffff",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 15,
    },
    dark: {
        height: 40,
        width: "45%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#004678",
        borderRadius: 15,
    },
});
