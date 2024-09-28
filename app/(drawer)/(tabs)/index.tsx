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
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.cardWrapper}>
        <Card
          text="Summarize notes"
          icon="summarize"
          style={{ backgroundColor: INDIGO }}
        />
        <Card
          text="Scan math problems"
          icon="calculate"
          style={{ backgroundColor: PURPLE }}
        />
        <Card
          text="Chat to our AI for help"
          icon="chat"
          style={{ backgroundColor: LIGHT_PURPLE }}
        />
        <Card
          text="Chat to our AI for help"
          icon="chat"
          style={{ backgroundColor: LIGHT_PURPLE }}
        />
        <Card
          text="Chat to our AI for help"
          icon="chat"
          style={{ backgroundColor: LIGHT_PURPLE }}
        />
        <Card
          text="Chat to our AI for help"
          icon="chat"
          style={{ backgroundColor: LIGHT_PURPLE }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  cardWrapper: {
    display: "flex",
    gap: 16,
  },
});
