import { Platform } from "react-native";
import { DatePicker as AndroidDatePicker } from "./DatePicker.android";
import { DatePicker as IOSDatePicker } from "./DatePicker.ios";

type DatePickerProps = {
    mode?: "date" | "time" | "datetime";
    display?: "default" | "spinner" | "calendar" | "clock" | "inline";
    value: Date | null;
    setValue: (date: Date) => void;
    placeholderText?: string;
};

const DatePicker = Platform.OS === "ios" ? IOSDatePicker : AndroidDatePicker;

export { DatePicker, DatePickerProps };
export default DatePicker;
