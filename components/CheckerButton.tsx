import { Checkbox } from "expo-checkbox";
import { StyleSheet, type TouchableOpacityProps } from "react-native";
import { Button } from "./Button";
import { ThemedText } from "./ThemedText";

type CheckerButtonProps = TouchableOpacityProps & {
    placeholderText: string;
    value: any;
    setValue: (value: any) => void;
};

const CheckerButton = ({
    value,
    setValue,
    placeholderText,
}: CheckerButtonProps) => {
    return (
        <Button
            type="bordered"
            style={styles.settingsContainer}
            onPress={setValue}
            activeOpacity={0.7}
        >
            <Checkbox
                value={value}
                onValueChange={setValue}
                color={value ? "#3b82f6" : undefined}
            />
            <ThemedText style={styles.termsText} type="whitened">
                {placeholderText}
            </ThemedText>
        </Button>
    );
}

const styles = StyleSheet.create({
    copyButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 6,
        opacity: 0.5,
    },
    iconButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 10,
    },
    settingsContainer: {
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 18,
        paddingVertical: 14,
        gap: 10,
    },
    termsText: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        flex: 1,
        flexWrap: "wrap",
    },
});

export { CheckerButton, CheckerButtonProps };

