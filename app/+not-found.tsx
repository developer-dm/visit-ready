import { Button } from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function NotFoundScreen() {
    const handleBack = () => {
        router.dismiss();
    };

    return (
        <View style={styles.container}>
            <ThemedText type="error">Navigation Error</ThemedText>
            <Button type="bordered" style={styles.backButton} onPress={handleBack}>
                <ThemedText type="link">Go back</ThemedText>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    backButton: {
        padding: 20,
        borderRadius: 10,
    },
});
