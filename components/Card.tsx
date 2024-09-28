import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ViewStyle,
  View,
  Text,
  TextStyle,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CustomText } from "./CustomText";

interface CardProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconStyle?: ViewStyle;
  text?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
}

export function Card({
  style,
  textStyle,
  iconStyle,
  text = "",
  icon = "bug-report",
}: CardProps) {
  return (
    <View style={[styles.wrapper, style]}>
      <CustomText style={[styles.text, textStyle]}>{text}</CustomText>
      <View style={styles.iconWrapper}>
        <MaterialIcons
          name={icon}
          color="white"
          style={[styles.icon, iconStyle]}
          size={80}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 64,
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 32,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
    fontSize: 36,
    width: "70%",
    fontFamily: "Outfit_700Bold",
  },
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
