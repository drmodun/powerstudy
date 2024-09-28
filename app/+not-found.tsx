// External packages
import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

// Components
import { CustomText } from '@/components/CustomText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Oops!' }} />
            <ThemedView style={styles.container}>
                <CustomText>This screen doesn't exist.</CustomText>
                <Link href="/" style={styles.link}>
                    <CustomText>Go to home screen!</CustomText>
                </Link>
            </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
});
