import { useThemeColor } from "@/hooks/useThemeColor";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet } from "react-native";
import DropDownPicker, { DropDownPickerProps } from "react-native-dropdown-picker";

export type DropdownProps = DropDownPickerProps<any> & {
    lightColor?: string;
    darkColor?: string;
    type?: "default";
};

export function Dropdown({
    style,
    lightColor,
    darkColor,
    type = "default",
    ...rest
}: DropdownProps) {
    return (
        <DropDownPicker
            style={[styles.dropdown, { backgroundColor: useThemeColor({}, "background"), borderColor: useThemeColor({}, "border") }]}
            dropDownContainerStyle={[styles.dropdownContainer, { backgroundColor: useThemeColor({}, "background"), borderColor: useThemeColor({}, "border") }]}
            placeholderStyle={[{ color: useThemeColor({}, "placeholderText") }]}
            textStyle={[{ fontSize: 14, color: useThemeColor({}, "text") }]}
            ArrowDownIconComponent={() => <MaterialIcons name="keyboard-arrow-down" size={25} color={useThemeColor({}, "icon")} />}
            ArrowUpIconComponent={() => <MaterialIcons name="keyboard-arrow-up" size={25} color={useThemeColor({}, "icon")} />}
            TickIconComponent={() => <MaterialIcons name="check" size={20} color={useThemeColor({}, "icon")} />}
            listMode="SCROLLVIEW"
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
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
