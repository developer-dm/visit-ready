import { Button } from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function FinalScreen() {
    const router = useRouter();

    const handleReturn = () => {
        router.replace("/(tabs)")
    }

    return (
        <View style={styles.container}>
            <ThemedText type="subtitle">Generating Questions...</ThemedText>
            <Button type="dark" onPress={handleReturn}>

            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
});
