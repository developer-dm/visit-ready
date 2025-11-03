import { useThemeColor } from "@/hooks/useThemeColor";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "./Button";

type CustomDropdownProps = {
    items: Record<string, string>;
    placeholder?: string;
    value: string;
    setValue: (data: string) => void;
    lightColor?: string;
    darkColor?: string;
    lightBorder?: string;
    darkBorder?: string;
};

const Dropdown = ({
    items,
    placeholder = "Optional",
    value,
    setValue,
    lightColor,
    darkColor,
    lightBorder = "#d1d1d1ff",
    darkBorder = "#393939ff",
}: CustomDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const placeholderColor = useThemeColor({}, "placeholderText");
    const selectionColor = useThemeColor({}, "text");
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "card");
    const borderColor = useThemeColor({ light: lightBorder, dark: darkBorder }, "border");
    const iconColor = useThemeColor({}, "icon");

    const itemsArray = Object.entries(items).map(([label, value]) => ({ label, value }));
    const selectedItem = itemsArray.find(item => item.value === value);
    const displayText = selectedItem ? selectedItem.label : placeholder;
    const textColor = selectedItem ? selectionColor : placeholderColor;

    const handleSelect = (itemValue: string) => {
        setValue(itemValue);
        toggleDropdown();
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const renderDropdownList = () => {
        return itemsArray.map((item, index) => (
            <TouchableOpacity
                key={item.value}
                style={[
                    styles.listItem,
                    index !== itemsArray.length - 1 && { borderBottomWidth: 1, borderColor: borderColor },
                ]}
                onPress={() => handleSelect(item.value)}
                activeOpacity={0.2}
            >
                <Text style={[styles.listItemText, { color: selectionColor }]}>
                    {item.label}
                </Text>
                {value === item.value && (
                    <MaterialIcons name="check" size={20} color={iconColor} />
                )}
            </TouchableOpacity>
        ))
    };

    return (
        <View>
            <Button
                type="bordered"
                style={isOpen ? [styles.button, styles.buttonOpen] : styles.button}
                onPress={toggleDropdown}
            >
                <Text style={[styles.placeholderText, { color: textColor }]}>{displayText}</Text>
                <MaterialIcons
                    name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                    size={25}
                    color={iconColor}
                />
            </Button>

            {isOpen && (
                <ScrollView
                    style={[styles.dropdownList, { backgroundColor, borderColor }]}
                    showsVerticalScrollIndicator={true}
                    nestedScrollEnabled={true}
                >
                    {renderDropdownList()}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 48,
    },
    buttonOpen: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomWidth: 1,
    },
    dropdownList: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderWidth: 1,
        borderTopWidth: 0,
        maxHeight: 250,
    },
    placeholderText: {
        fontSize: 16,
    },
    listItem: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    listItemText: {
        fontSize: 16,
    },
});

export { CustomDropdownProps, Dropdown };

