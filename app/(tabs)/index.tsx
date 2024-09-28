import { Card } from "@/components/Card";
import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  Text,
} from "react-native";
import { INDIGO, LIGHT_PURPLE, PURPLE } from "@/constants/Colors";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>Hi, USERNAME_PLACEHOLDER!</Text>
      </View>
      <Card
        text="Summarize notes"
        icon="summarize"
        style={{ backgroundColor: INDIGO }}
      />
      <Card
        text="Scan math problems"
        icon="calculate"
        style={{ backgroundColor: LIGHT_PURPLE }}
      />
      <Card
        text="Chat to our AI for help"
        icon="chat"
        style={{ backgroundColor: PURPLE }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
