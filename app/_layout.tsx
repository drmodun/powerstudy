import { Theme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { BLACK, INDIGO, ROSE } from '@/constants/Colors';
import Toast from 'react-native-toast-message';
import { useCallback, useEffect, useState } from 'react';
import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_700Bold,
  Outfit_900Black,
  useFonts,
} from '@expo-google-fonts/outfit';
import { View } from 'react-native';
import { AppContext } from '@/hooks/useAppContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_700Bold,
    Outfit_900Black,
  });
  const MyTheme: Theme = {
    dark: true,
    colors: {
      primary: ROSE,
      background: BLACK,
      card: BLACK,
      text: 'white',
      border: 'white',
      notification: INDIGO,
    },
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppContext>
      <ThemeProvider value={MyTheme}>
        <Stack>
          <Stack.Screen
            name="(drawer)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
        </Stack>
        <Toast />
      </ThemeProvider>
    </AppContext>
  );
}
