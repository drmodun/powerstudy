// External packages
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { Image } from 'react-native';
import { Link, router } from 'expo-router';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Components and variables
import { FONT_BASE, FONT_MD, FONT_XL } from '@/constants/FontSizes';
import { LIGHT_WHITE, WHITE } from '@/constants/Colors';
import { RADIUS_LG, RADIUS_FULL } from '@/constants/BorderRadiusSizes';
import { CustomText } from '@/components/CustomText';
import { MyButton } from '@/components/Button';
import { MyInput } from '@/components/Input';
import { handleLogin } from '@/functions/auth';

export default function Login() {
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <CustomText style={{ fontSize: FONT_XL, height: 48 }}>Log in</CustomText>
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
        type="password"
      />

      <MyButton
        variant="solid"
        buttonColor="indigo"
        style={{
          marginTop: 32,
        }}
        onPress={() => handleLogin(emailValue, passwordValue)}
      >
        Log in
      </MyButton>
      <CustomText style={{ color: LIGHT_WHITE, marginTop: 16 }}>
        Don't have an account? <Link href="/signup">Sign up.</Link>
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
