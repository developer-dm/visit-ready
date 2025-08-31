import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function NotFoundScreen() {
    return (
        <View style={styles.container}>
            <ThemedText>This screen does not exist.</ThemedText>
            <Link asChild replace href="/(tabs)" style={styles.link}>
                <ThemedText type="link">Go to home screen!</ThemedText>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
});
