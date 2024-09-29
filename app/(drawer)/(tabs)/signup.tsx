// External packages
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import Toast from 'react-native-toast-message';

// Components and variables
import { FONT_BASE, FONT_MD, FONT_XL } from '@/constants/FontSizes';
import { LIGHT_WHITE, WHITE } from '@/constants/Colors';
import { RADIUS_LG, RADIUS_FULL } from '@/constants/BorderRadiusSizes';
import { CustomText } from '@/components/CustomText';
import { MyButton } from '@/components/Button';
import { MyInput } from '@/components/Input';

export default function SignUp() {
  const [usernameValue, setUsernameValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');

  const handleSignup = () => {
    fetch('http://192.168.1.206:5500/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer very-secure',
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
        name: usernameValue,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          console.log(res);
          return res.json();
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Invalid credentials. Please try again.',
          });
        }
      })
      .catch(function (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2:
            'An error occurred while signing up. Try again in a few moments.',
        });

        throw error;
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <CustomText style={{ fontSize: FONT_XL, height: 48 }}>Sign up</CustomText>
      <CustomText style={styles.subheading}>
        Welcome! Please enter your details.
      </CustomText>

      <MyInput
        label="Username"
        placeholderValue="Enter your username"
        value={usernameValue}
        setValue={setUsernameValue}
        style={styles.input}
      />
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
        onPress={handleSignup}
      >
        Sign up
      </MyButton>
      <CustomText style={{ color: LIGHT_WHITE, marginTop: 16 }}>
        Already have an account?{' '}
        <Link href="/(drawer)/(tabs)/login">Log in.</Link>
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
