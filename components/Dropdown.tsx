import { useThemeColor } from "@/hooks/useThemeColor";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { Button } from "./Button";

export type DropdownItem = {
    label: string;
    value: string;
};

export type CustomDropdownProps = {
    items: DropdownItem[];
    placeholder?: string;
    value?: string;
    setValue: (value: string) => void;
    lightColor?: string;
    darkColor?: string;
    lightBorder?: string;
    darkBorder?: string;
};

export function Dropdown({
    items,
    placeholder = "Optional",
    value,
    setValue,
    lightColor,
    darkColor,
    lightBorder = "#d1d1d1ff",
    darkBorder = "#393939ff",
}: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const placeholderColor = useThemeColor({}, "placeholderText");
    const selectionColor = useThemeColor({}, "text");
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "card");
    const borderColor = useThemeColor({ light: lightBorder, dark: darkBorder }, "border");
    const iconColor = useThemeColor({}, "icon");

    const selectedItem = items.find(item => item.value === value);
    const displayText = selectedItem ? selectedItem.label : placeholder;
    const textColor = selectedItem ? selectionColor : placeholderColor;

    const handleSelect = (itemValue: string) => {
        setValue(itemValue);
        toggleDropdown();
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <View style={styles.container}>
            <Button
                type="bordered"
                style={styles.dropdown}
                onPress={toggleDropdown}
            >
                <Text style={[styles.text, { color: textColor }]}>
                    {displayText}
                </Text>
                <MaterialIcons
                    name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                    size={25}
                    color={iconColor}
                />
            </Button>

            <Modal
                visible={isOpen}
                transparent
                animationType="fade"
                onRequestClose={toggleDropdown}
            >
                <Pressable
                    style={styles.overlay}
                    onPress={toggleDropdown}
                >
                    <View style={styles.modalContainer}>
                        <View style={[styles.dropdownList, { backgroundColor, borderColor }]}>
                            <ScrollView showsVerticalScrollIndicator={true}>
                                {items.map((item, index) => (
                                    <TouchableOpacity
                                        key={item.value}
                                        style={[
                                            styles.listItem,
                                            index !== items.length - 1 && styles.listItemBorder,
                                            { borderColor: borderColor }
                                        ]}
                                        onPress={() => handleSelect(item.value)}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={[styles.listItemText, { color: selectionColor }]}>
                                            {item.label}
                                        </Text>
                                        {value === item.value && (
                                            <MaterialIcons name="check" size={20} color={iconColor} />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    dropdown: {
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 48,
    },
    text: {
        fontSize: 16,
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: '#0000008c',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        maxWidth: 300,
    },
    dropdownList: {
        borderRadius: 10,
        borderWidth: 1,
        maxHeight: 300,
    },
    listItem: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 48,
    },
    listItemBorder: {
        borderBottomWidth: 1,
    },
    listItemText: {
        fontSize: 16,
        flex: 1,
    },
});
