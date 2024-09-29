// External packages
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';

// Components and variables
import { FONT_BASE, FONT_MD, FONT_XL } from '@/constants/FontSizes';
import { LIGHT_WHITE, WHITE } from '@/constants/Colors';
import { CustomText } from '@/components/CustomText';
import { MyButton } from '@/components/Button';
import { MyInput } from '@/components/Input';
import { register } from '@/functions/auth';

export default function SignUp() {
  const [usernameValue, setUsernameValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');

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
        type="password"
      />

      <MyButton
        variant="solid"
        buttonColor="indigo"
        style={{
          marginTop: 32,
        }}
        onPress={() => register(usernameValue, emailValue, passwordValue)}
      >
        Sign up
      </MyButton>
      <CustomText style={{ color: LIGHT_WHITE, marginTop: 16 }}>
        Already have an account? <Link href="/login">Log in.</Link>
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
