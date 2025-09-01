import { useThemeColor } from "@/hooks/useThemeColor";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet } from "react-native";
import DropDownPicker, { DropDownPickerProps } from "react-native-dropdown-picker";

export type DropdownProps = DropDownPickerProps<any> & {
    lightColor?: string;
    darkColor?: string;
    lightBorder?: string;
    darkBorder?: string;
    type?: "default";
};

export function Dropdown({
    style,
    lightColor,
    darkColor,
    lightBorder = "#d1d1d1ff",
    darkBorder = "#393939ff",
    type = "default",
    ...rest
}: DropdownProps) {
    const placeholderColor = useThemeColor({}, "placeholderText");
    const selectionColor = useThemeColor({}, "text")
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "card");
    const borderColor = useThemeColor({ light: lightBorder, dark: darkBorder }, "border");
    const iconColor = useThemeColor({}, "icon")

    return (
        <DropDownPicker
            style={[styles.dropdown, { backgroundColor, borderColor }]}
            dropDownContainerStyle={[styles.dropdownContainer, { backgroundColor, borderColor }]}
            placeholderStyle={[{ color: placeholderColor }]}
            textStyle={[{ fontSize: 16, color: selectionColor }]}
            ArrowDownIconComponent={() => <MaterialIcons name="keyboard-arrow-down" size={25} color={iconColor} />}
            ArrowUpIconComponent={() => <MaterialIcons name="keyboard-arrow-up" size={25} color={iconColor} />}
            TickIconComponent={() => <MaterialIcons name="check" size={20} color={iconColor} />}
            listMode="SCROLLVIEW"
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    dropdown: {
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    dropdownContainer: {
        borderRadius: 12,
        borderWidth: 1,
    }
});
