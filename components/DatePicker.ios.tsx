import { useThemeColor } from "@/hooks/useThemeColor";
import DataFormatter from "@/utils/dataFormatter";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "./Button";
import { DatePickerProps } from "./DatePicker";
import { ThemedView } from "./ThemedView";

const DatePicker = ({
    mode = "date",
    display = "default",
    value,
    setValue,
    placeholderText = "Optional",
}: DatePickerProps) => {
    const [selection, setSelection] = useState(new Date()); // Calendar selection value
    const [dateString, setDateString] = useState(""); // Preview of selected date
    const [isOpen, setIsOpen] = useState(false);

    const iconColor = useThemeColor({}, "icon");
    const placeholderColor = useThemeColor({}, "placeholderText");
    const selectionColor = useThemeColor({}, "text");
    const textColor = value && !isOpen && value === selection ? selectionColor : placeholderColor;

    // Format a date into readable string
    const formatDate = (date: Date | null) => {
        if (date) {
            switch (mode) {
                case 'date':
                    setDateString(DataFormatter.FormatDateString(date));
                    break;
                case 'time':
                    setDateString(DataFormatter.FormatTimeString(date));
                    break;
                case 'datetime':
                    setDateString(DataFormatter.FormatDateTimeString(date));
                    break;
            }
        } else {
            setDateString("");
        }
    };

    // Open datepicker or revert selection and preview to previous value
    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
        setSelection(value || new Date());
        formatDate(value);
    };

    // Set appointment date
    const confirmDate = () => {
        setIsOpen(false);
        setValue(selection);
        formatDate(selection)
    };

    // Update selection to chosen date
    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (selectedDate) {
            setSelection(selectedDate);
            formatDate(selectedDate);
        }
    };

    useEffect(() => {
        if (value) {
            formatDate(value);
            setSelection(value);
        }
    }, [value])

    return (
        <View>
            <Button
                type="bordered"
                style={styles.button}
                onPress={toggleIsOpen}
            >
                <Text style={[styles.text, { color: textColor }]}>
                    {dateString || placeholderText}
                </Text>
                <MaterialIcons
                    name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                    size={25}
                    color={iconColor}
                />
            </Button>

            {isOpen && (
                <>
                    <View style={styles.pickerWrapper}>
                        <DateTimePicker
                            mode={mode as any}
                            display={display}
                            value={selection}
                            onChange={onChange}
                        />
                    </View>

                    <ThemedView style={styles.buttonContainer} type="bordered">
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={toggleIsOpen}
                            activeOpacity={0.3}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={confirmDate}
                            activeOpacity={0.3}
                        >
                            <Text style={styles.confirmButtonText}>Confirm</Text>
                            <MaterialIcons name="check" size={16} color="#ffffff" />
                        </TouchableOpacity>
                    </ThemedView>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        flex: 1,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        minHeight: 48,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        minHeight: 48,
    },
    cancelButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#d1d1d1ff',
        backgroundColor: '#f8fafc',
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
        paddingHorizontal: 32,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
        marginBottom: 10,
    },
});

export { DatePicker };

