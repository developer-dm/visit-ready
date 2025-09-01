import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Textbox } from "./Textbox";
import { ThemedView } from "./ThemedView";

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
    value,
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
                <TouchableOpacity
                    onPress={toggleDatePicker}
                    style={{ width: "100%" }}
                >
                    <Textbox
                        placeholder={placeholderText}
                        onChangeText={setDateString}
                        value={dateString}
                        editable={false}
                        pointerEvents="none"
                    />
                </TouchableOpacity>
            )}
            {open && (
                <View style={styles.pickerWrapper}>
                    <DateTimePicker
                        mode={mode as any}
                        display={display}
                        value={selection}
                        onChange={onChange}
                        {...otherProps}
                    />
                </View>
            )}
            {open && Platform.OS === "ios" && (
                <ThemedView style={styles.buttonContainer} type="dusked">
                    <TouchableOpacity style={styles.cancelButton} onPress={toggleDatePicker}>
                        <Text style={styles.cancelButtonText}>
                            Cancel
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.confirmButton} onPress={confirmIOSDate}>
                        <Text style={styles.confirmButtonText}>
                            Confirm
                        </Text>
                        <MaterialIcons name="check" size={16} color="#ffffff" />
                    </TouchableOpacity>
                </ThemedView>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 16,
    },
    cancelButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#d1d1d1ff',
        backgroundColor: '#f8fafc',
        minWidth: 100,
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        color: '#64748b',
    },
    confirmButton: {
        backgroundColor: '#3b82f6',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#3b82f6',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        minWidth: 120,
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        marginRight: 8,
    },
    pickerWrapper: {
        alignItems: "center",
        justifyContent: "center",
    },
});
