import { useThemeColor } from "@/hooks/useThemeColor";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, TouchableOpacity, type TouchableOpacityProps } from "react-native";

type IconButtonProps = TouchableOpacityProps & {
    onPress: () => void;
    iconName: string;
    iconSize: number;
};

const IconButton = ({
    onPress,
    iconName,
    iconSize,
}: IconButtonProps) => {
    const color = useThemeColor({}, "icon");

    return (
        <TouchableOpacity
            style={styles.iconButton}
            activeOpacity={0.3}
            onPress={onPress}
        >
            <MaterialIcons name={iconName as any} size={iconSize} color={color} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    iconButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 10,
    },
});

export { IconButton, IconButtonProps };

