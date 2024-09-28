// External packages
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';

// Components and variables
import { FONT_BASE, FONT_MD, FONT_XL } from '@/constants/FontSizes';
import { LIGHT_WHITE, WHITE } from '@/constants/Colors';
import { RADIUS_LG, RADIUS_FULL } from '@/constants/BorderRadiusSizes';
import { CustomText } from '@/components/CustomText';
import { MyButton } from '@/components/Button';
import { MyInput } from '@/components/Input';

export default function SignUp() {
  const [inputValue, setInputValue] = React.useState('');
  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <CustomText style={{ fontSize: FONT_XL, height: 48 }}>Sign up</CustomText>
      <CustomText style={styles.subheading}>
        Welcome! Please enter your details.
      </CustomText>

      <MyInput
        label="Username"
        placeholderValue="Enter your username"
        value={inputValue}
        setValue={setInputValue}
        style={styles.input}
      />
      <MyInput
        label="Email"
        placeholderValue="Enter your email"
        value={inputValue}
        setValue={setInputValue}
        style={styles.input}
      />
      <MyInput
        label="Password"
        placeholderValue="Enter your password"
        value={inputValue}
        setValue={setInputValue}
        style={styles.input}
      />

      <MyButton
        variant="solid"
        buttonColor="indigo"
        style={{
          marginTop: 32,
        }}
        onPress={() => console.log('Hello world')}
      >
        Log in
      </MyButton>
      <CustomText style={{ color: LIGHT_WHITE, marginTop: 16 }}>
        Already have an account?{' '}
        <Link href="/(drawer)/(tabs)/signup">Log in.</Link>
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
