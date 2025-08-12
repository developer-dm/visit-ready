import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Textbox } from "@/components/TextBox";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Platform, Pressable, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

export default function Main() {
    const router = useRouter();

    const [DOB, setDOB] = useState("")
    const [sex, setSex] = useState("")
    const [date, setDate] = useState(new Date());
    const [picker, showPicker] = useState(false);

    const [selection, setSelection] = useState(sex ? sex : null);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
    ]);

    useEffect(() => {
        if (selection) {
            setSex(selection);
        }
    }, [selection]);

    const handleNext = () => {
        setOpen(false);
        showPicker(false);

        if (DOB && selection) {
            router.push("/onboarding/final");
        } else {
            Alert.alert("Error", "Invalid birthdate or sex.");
        }
    };

    const toggleDatePicker = () => {
        showPicker(!picker);
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
        <TouchableWithoutFeedback onPress={() => { setOpen(false); }}>
            <View style={styles.container}>
                <Button type="return" onPress={() => { router.back() }} />
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
        top: 50
    },
    subtitle: {
        position: "absolute",
        top: 110
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