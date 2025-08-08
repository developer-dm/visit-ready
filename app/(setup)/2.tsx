import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Textbox } from "@/components/Textbox";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { useUser } from "@/constants/UserContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Platform, Pressable, SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

export default function Step2() {
    const router = useRouter();
    
    const { DOB, setDOB, sex, setSex } = useUser();
    const [date, setDate] = useState(new Date());
    const [picker, showPicker] = useState(false);

    const [selection, setSelection] = useState(sex ? sex : null);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
    ]);

    const [error, setError] = useState("");

    const handleNext = () => {
        setOpen(false);
        showPicker(false);
        if (DOB && selection) {
            setError("")
            setSex(selection);
            router.push("/3")
        } else {
            setError("Invalid birthdate or sex")
        };
    };

    const toggleDatePicker = () => {
        showPicker(!picker)
    };

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const { type } = event;

        if (type === "set" && selectedDate) {
            const currentDate = selectedDate;
            setDate(currentDate);

            if (Platform.OS === "android") {
                toggleDatePicker();
                setDOB(formatDate(currentDate));
            }
        } else {
            toggleDatePicker();
        }
    };

    const confirmIOSDate = () => {
        toggleDatePicker();
        setDOB(formatDate(date));
    };

    const formatDate = (rawDate: Date) => {
        let date = new Date(rawDate)

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        return `${month}-${day}-${year}`
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => { setOpen(false); }}>
                <ThemedView type="container">
                    <Button type="return" onPress={() => { router.back(); if (selection) { setSex(selection); } }} />
                    <ThemedText type="title" style={styles.title}>Step 2</ThemedText>
                    <ThemedText type="subtitle" style={styles.subtitle}>Enter your information below</ThemedText>
                    <ThemedView type="card">
                        <ThemedText type="overhead" style={{ marginBottom: 10 }}>Date of Birth</ThemedText>
                        {!picker && (
                            <Pressable
                                onPress={toggleDatePicker}
                                style={{ height: "auto", width: "100%" }}
                            >
                                <Textbox
                                    placeholder="mm-dd-yyyy"
                                    onChangeText={setDOB}
                                    value={DOB}
                                    editable={false}
                                    onPressIn={toggleDatePicker}
                                />
                            </Pressable>
                        )}
                        {picker && Platform.OS === "ios" && (
                            <View style={styles.buttonView}>
                                <TouchableOpacity style={styles.light} onPress={toggleDatePicker}>
                                    <ThemedText type="default" style={{ color: "#323232ff" }}>Cancel</ThemedText>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.dark} onPress={confirmIOSDate}>
                                    <ThemedText type="default" style={{ color: "#ffffffff" }}>Confirm</ThemedText>
                                </TouchableOpacity>
                            </View>
                        )}
                        {picker && (
                            <DateTimePicker
                                mode="date"
                                display="spinner"
                                value={date}
                                onChange={onChange}
                            />
                        )}
                        <ThemedText type="overhead" style={{ marginTop: 10 }}>Sex at birth</ThemedText>
                        <DropDownPicker
                            open={open}
                            value={selection}
                            items={items}
                            setOpen={setOpen}
                            setValue={setSelection}
                            setItems={setItems}
                            style={[styles.dropdown, { backgroundColor: useThemeColor({}, "background"), borderColor: useThemeColor({}, "border") }]}
                            dropDownContainerStyle={[styles.dropdownContainer, { backgroundColor: useThemeColor({}, "background"), borderColor: useThemeColor({}, "border") }]}
                            placeholderStyle={[{ color: useThemeColor({}, "placeholderText") }]}
                            textStyle={[{ fontSize: 14, color: useThemeColor({}, "text") }]}
                        />
                        {error ? <ThemedText type="error" style={{ marginTop: 10 }}>{error}</ThemedText> : null}
                        <Button type={"dark"} onPress={handleNext} style={{ marginTop: 30 }}>
                            <ThemedText type="default" style={{ color: "#ffffffff" }}>Next</ThemedText>
                        </Button>
                    </ThemedView>
                    <Footer />
                </ThemedView>
            </TouchableWithoutFeedback>
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
    dropdown: {
        minHeight: 40,
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 10,
        padding: 10,
    },
    dropdownContainer: {
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 10,
    }
});
