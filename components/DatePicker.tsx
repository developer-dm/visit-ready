import { useThemeColor } from "@/hooks/useThemeColor";
import DataFormatterService from "@/services/dataFormatter";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "./Button";
import { ThemedView } from "./ThemedView";

export type DatePickerProps = {
    mode?: "date" | "time" | "datetime";
    display?: "default" | "spinner" | "calendar" | "clock" | "inline";
    value?: Date | null;
    setValue?: (date: Date) => void;
    placeholderText?: string;
};

export function DatePicker({
    mode = "date",
    display = "default",
    value,
    setValue,
    placeholderText = "Optional",
    ...otherProps
}: DatePickerProps) {
    const iconColor = useThemeColor({}, "icon");
    const placeholderColor = useThemeColor({}, "placeholderText");
    const selectionColor = useThemeColor({}, "text");
    const textColor = value ? selectionColor : placeholderColor;

    const [dateString, setDateString] = useState("");
    const [selection, setSelection] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const toggleDatePicker = () => {
        if (Platform.OS === 'android' && mode === 'datetime') {
            setShowDatePicker(true);
        } else {
            setIsOpen(!isOpen);
        }
    };

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const { type } = event;

        if (type === "set" && selectedDate) {
            setSelection(selectedDate);

            if (Platform.OS === "android") {
                if (mode === 'datetime' && showDatePicker) {
                    setShowDatePicker(false);
                    setShowTimePicker(true);
                } else {
                    setShowDatePicker(false);
                    setShowTimePicker(false);

                    if (setValue) {
                        setValue(selectedDate);
                    }
                }
            }
        } else {
            setShowDatePicker(false);
            setShowTimePicker(false);
            setIsOpen(false);
        }
    };

    const confirmIOSDate = () => {
        setIsOpen(false);

        if (setValue) {
            setValue(selection);
        }
    };

    useEffect(() => {
        if (value) {
            if (mode === 'date') {
                setDateString(DataFormatterService.FormatDateString(value));
            } else if (mode === 'time') {
                setDateString(DataFormatterService.FormatTimeString(value));
            } else {
                setDateString(DataFormatterService.FormatDateTimeString(value));
            }
        } else {
            setDateString("");
        }
    }, [value, mode]);

    return (
        <View>
            <Button
                type="bordered"
                style={styles.button}
                onPress={toggleDatePicker}
            >
                <Text style={[styles.text, { color: textColor }]}>
                    {dateString ? dateString : placeholderText}
                </Text>
                <MaterialIcons
                    name={isOpen || showDatePicker || showTimePicker ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                    size={25}
                    color={iconColor}
                />
            </Button>

            {Platform.OS === 'android' && mode === 'datetime' && showDatePicker && (
                <DateTimePicker
                    mode="date"
                    display={display}
                    value={selection}
                    onChange={onChange}
                    {...otherProps}
                />
            )}

            {Platform.OS === 'android' && mode === 'datetime' && showTimePicker && (
                <DateTimePicker
                    mode="time"
                    display={display}
                    value={selection}
                    onChange={onChange}
                    {...otherProps}
                />
            )}

            {Platform.OS === 'android' && isOpen && mode !== 'datetime' && (
                <DateTimePicker
                    mode={mode}
                    display={display}
                    value={selection}
                    onChange={onChange}
                    {...otherProps}
                />
            )}

            {isOpen && Platform.OS === "ios" && (
                <>
                    <View style={styles.pickerWrapper}>
                        <DateTimePicker
                            mode={mode as any}
                            display={display}
                            value={selection}
                            onChange={(event, date) => {
                                if (date) setSelection(date);
                            }}
                            {...otherProps}
                        />
                    </View>

                    <ThemedView style={styles.buttonContainer} type="bordered">
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setIsOpen(false)}
                        >
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
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        minHeight: 48,
    },
    cancelButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#d1d1d1ff',
        backgroundColor: '#f8fafc',
        minWidth: 140,
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
        borderRadius: 6,
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
        minWidth: 140,
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
