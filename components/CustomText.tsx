import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_700Bold,
  Outfit_900Black,
  useFonts,
} from "@expo-google-fonts/outfit";
import Ionicons from "@expo/vector-icons/Ionicons";
import { JSX, PropsWithChildren, useState } from "react";
import { StyleSheet, Text, TextProps } from "react-native";

export function CustomText(
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<Text> &
    Readonly<TextProps>,
) {
  let [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_700Bold,
    Outfit_900Black,
  });
  if (!fontsLoaded) return null;
  return (
    <Text
      {...props}
      style={[{ fontFamily: "Outfit_400Regular" }, styles.text, props.style]}
    >
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
