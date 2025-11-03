import { useThemeColor } from "@/hooks/useThemeColor";
import DataFormatter from "@/utils/dataFormatter";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "./Button";
import { DatePickerProps } from "./DatePicker";

const DatePicker = ({
    mode = "date",
    display = "default",
    value,
    setValue,
    placeholderText = "Optional",
}: DatePickerProps) => {
    const iconColor = useThemeColor({}, "icon");
    const placeholderColor = useThemeColor({}, "placeholderText");
    const selectionColor = useThemeColor({}, "text");
    const textColor = value ? selectionColor : placeholderColor;

    const [dateString, setDateString] = useState("");
    const [selection, setSelection] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const formatDate = (date: Date) => {
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
    };

    const toggleIsOpen = () => {
        if (mode === 'datetime') { // Pick day through calendar first
            setShowDatePicker(true);
        } else { // Open date selection
            setIsOpen(!isOpen);
            setSelection(value || new Date());
        }
    };

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const { type } = event;

        if (type === "set" && selectedDate) {
            setSelection(selectedDate);

            if (mode === 'datetime' && showDatePicker) { // Swtich from day to time picker
                setShowDatePicker(false);
                setShowTimePicker(true);
            } else { // Finish date selection
                setShowDatePicker(false);
                setShowTimePicker(false);
                setIsOpen(false);
                setValue(selectedDate);
            }
        } else { // Finish date selection
            setSelection(value || new Date());
            setShowDatePicker(false);
            setShowTimePicker(false);
            setIsOpen(false);
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
                    name={isOpen || showDatePicker || showTimePicker ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                    size={25}
                    color={iconColor}
                />
            </Button>

            {isOpen && mode !== 'datetime' && (
                <DateTimePicker
                    mode={mode}
                    display={display}
                    value={selection}
                    onChange={onChange}
                />
            )}

            {mode === 'datetime' && showDatePicker && (
                <DateTimePicker
                    mode="date"
                    display={"calendar"}
                    value={selection}
                    onChange={onChange}
                />
            )}

            {mode === 'datetime' && showTimePicker && (
                <DateTimePicker
                    mode="time"
                    display={"clock"}
                    value={selection}
                    onChange={onChange}
                />
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
});

export { DatePicker };

