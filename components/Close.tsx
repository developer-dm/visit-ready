import { useTempStore } from "@/stores/tempStore";
import { RelativePathString, useRouter } from "expo-router";
import { Alert, Pressable, StyleSheet, Text } from "react-native";

export type ButtonProps = {
    clearContext: boolean;
    route?: string;
    type?: "default" | "discard";
};

export function CloseButton({
    clearContext = false,
    route,
    type = "default",
}: ButtonProps) {
    const router = useRouter();
    const { clearUserContext } = useTempStore();

    const handleClose = () => {
        if (clearContext) {
            Alert.alert('Close Form', 'Are you sure you want to discard this form?', [
                {
                    text: 'Discard',
                    onPress: () => {
                        router.dismissTo(route as RelativePathString);
                        clearUserContext();
                    },
                    style: "destructive",
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]);
        } else {
            if (route) {
                router.dismissTo(route as RelativePathString);
            } else {
                router.dismiss();
            };
        };
    };

    return (
        <Pressable
            style={styles.pressable}
            onPress={handleClose}
        >
            {type === "default" ? <Text style={styles.text}>Close</Text> : null}
            {type === "discard" ? <Text style={styles.text}>Discard</Text> : null}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressable: {
        paddingHorizontal: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 16,
        fontWeight: '400',
        color: '#ff483fff',
        textAlign: "center"
    },
});
