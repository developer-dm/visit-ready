import { Button } from "@/components/Button";
import { Dropdown } from "@/components/Dropdown";
import { Textbox } from "@/components/Textbox";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/utils/userContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function PrepSecondScreen() {
    const router = useRouter();

    const { prep } = useUser();

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Today', value: 'today' },
        { label: 'Within the Past Week', value: 'past-week' },
        { label: 'Within the Past Month', value: 'past-month' },
        { label: '1-3 Months Ago', value: '1-3-months' },
        { label: '3-6 Months Ago', value: '3-6-months' },
        { label: 'Over 6 Months Ago', value: 'over-6-months' },
        { label: 'Ongoing / Chronic', value: 'chronic' },
        { label: 'Unsure', value: 'unsure' },
        { label: 'Other', value: 'other' },
    ]);

    const [openSecond, setOpenSecond] = useState(false);
    const [itemsSecond, setItemsSecond] = useState([
        { label: '1 - Very Mild', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5 - Moderate', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '10 - Severe / Worst Pain', value: '10' },
    ]);

    const handleNext = () => {
        if (prep.mainConcern && prep.concernStart && prep.concernSeverity) {
            router.push("/prep/modal/third")
        } else {
            Alert.alert("Error", "Invalid answer");
        }
    };

    return (
        <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="never">
            <TouchableWithoutFeedback onPress={() => { setOpen(false), setOpenSecond(false) }}>
                <View style={styles.container}>
                    <ThemedText type="title" style={styles.title}>Concerns</ThemedText>
                    <ThemedText type="subtitle" style={styles.subtitle}>Please answer the questions below</ThemedText>
                    <ThemedView type="card">
                        <ThemedText type="overhead">What's the main health issue or concern you'd like to discuss?</ThemedText>
                        <Textbox
                            placeholder="e.g. headaches"
                            onChangeText={prep.setMainConcern}
                            value={prep.mainConcern}
                            style={{ marginTop: 10 }}
                        />
                        <View style={{ zIndex: 2000, elevation: 2000 }}>
                            <ThemedText type="overhead" style={{ marginTop: 10 }}>When did this start?</ThemedText>
                            <Dropdown
                                open={open}
                                value={prep.concernStart}
                                items={items}
                                setOpen={setOpen}
                                setValue={prep.setConcernStart}
                                setItems={setItems}
                            />
                        </View>

                        <View style={{ zIndex: 1000, elevation: 1000 }}>
                            <ThemedText type="overhead" style={{ marginTop: 10 }}>How would you rate the severity from 1-10?</ThemedText>
                            <Dropdown
                                open={openSecond}
                                value={prep.concernSeverity}
                                items={itemsSecond}
                                setOpen={setOpenSecond}
                                setValue={prep.setConcernSeverity}
                                setItems={setItemsSecond}
                            />
                        </View>

                        <Button onPress={handleNext} type="dark" style={{ marginTop: 30 }}>
                            <ThemedText type="default" style={{ color: "#fff" }}>Next</ThemedText>
                        </Button>
                    </ThemedView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 10,
    },
    title: {
        marginBottom: -5
    },
    subtitle: {
        marginBottom: 50
    },
});
