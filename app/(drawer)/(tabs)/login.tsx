// External packages
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import Toast from 'react-native-toast-message';

// Components and variables
import { FONT_BASE, FONT_XL } from '@/constants/FontSizes';
import { LIGHT_WHITE } from '@/constants/Colors';
import { CustomText } from '@/components/CustomText';
import { MyButton } from '@/components/Button';
import { MyInput } from '@/components/Input';

export default function Login() {
    const [emailValue, setEmailValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');

    const handleLogin = () => {
        fetch('http://192.168.1.206:5500/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue,
            }),
        })
            .then((res) => {
                console.log(res);
                if (res.status === 201) {
                    router.push('/(drawer)/(tabs)/');
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Invalid credentials. Please check your email and password.',
                    });
                }
            })
            .catch(function (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'An error occurred while logging in. Try again in a few moments.',
                });

                throw error;
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <CustomText style={{ fontSize: FONT_XL, height: 48 }}>
                Log in
            </CustomText>
            <CustomText style={styles.subheading}>
                Welcome back! Please enter your details.
            </CustomText>

            <MyInput
                label="Email"
                placeholderValue="Enter your email"
                value={emailValue}
                setValue={setEmailValue}
                style={styles.input}
            />
            <MyInput
                label="Password"
                placeholderValue="Enter your password"
                value={passwordValue}
                setValue={setPasswordValue}
                style={styles.input}
            />

            <MyButton
                variant="solid"
                buttonColor="indigo"
                style={{
                    marginTop: 32,
                }}
                onPress={handleLogin}
            >
                Log in
            </MyButton>
            <CustomText style={{ color: LIGHT_WHITE, marginTop: 16 }}>
                Don't have an account?{' '}
                <Link href="/(drawer)/(tabs)/signup">Sign up.</Link>
            </CustomText>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    subheading: {
        fontSize: FONT_BASE,
        color: LIGHT_WHITE,
        marginBottom: 16,
    },
    mainContainer: {
        paddingHorizontal: 16,
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        marginTop: 8,
    },
});
