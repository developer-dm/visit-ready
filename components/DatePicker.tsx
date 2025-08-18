import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Textbox } from "./Textbox";
import { ThemedText } from "./ThemedText";

export type DatePickerProps = {
    mode?: "date" | "time" | "datetime";
    display?: "default" | "spinner" | "calendar" | "clock" | "inline";
    value?: Date | null;
    setValue?: (date: Date) => void;
    placeholderText?: string;
};

export function FormatDateString(rawDate: Date) {
    let date = new Date(rawDate)

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${month}-${day}-${year}`
};

export function DatePicker({
    mode = "date",
    display = "default",
    value = null,
    setValue,
    placeholderText = "mm-dd-yyyy",
    ...otherProps
}: DatePickerProps) {
    const [dateString, setDateString] = useState("");
    const [selection, setSelection] = useState(new Date())
    const [open, setOpen] = useState(false);

    const toggleDatePicker = () => {
        setOpen(!open);
    };

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const { type } = event;

        if (type === "set" && selectedDate) {
            setSelection(selectedDate);

            if (Platform.OS === "android") {
                toggleDatePicker();

                if (setValue) {
                    setValue(selectedDate)
                };
            }
        } else {
            toggleDatePicker();
        }
    };

    const confirmIOSDate = () => {
        toggleDatePicker();

        if (setValue) {
            setValue(selection);
        };
    };

    useEffect(() => {
        if (value) {
            setDateString(FormatDateString(value));
        }
    }, [value]);

    return (
        <>
            {!open && (
                <Pressable
                    onPress={toggleDatePicker}
                    style={{ height: "auto", width: "100%" }}
                >
                    <Textbox
                        placeholder={placeholderText}
                        onChangeText={setDateString}
                        value={dateString}
                        editable={false}
                        onPressIn={toggleDatePicker}
                    />
                </Pressable>
            )}
            {open && Platform.OS === "ios" && (
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.light} onPress={toggleDatePicker}>
                        <ThemedText type="default" style={{ color: "#323232ff" }}>Cancel</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dark} onPress={confirmIOSDate}>
                        <ThemedText type="default" style={{ color: "#ffffffff" }}>Confirm</ThemedText>
                    </TouchableOpacity>
                </View>
            )}
            {open && (
                <DateTimePicker
                    mode={mode as any}
                    display={display}
                    value={selection}
                    onChange={onChange}
                    {...otherProps}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        gap: "10%",
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
