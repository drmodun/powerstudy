import { Card } from "@/components/Card";
import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableHighlight,
} from "react-native";
import { INDIGO, LIGHT_PURPLE, PURPLE, ROSE } from "@/constants/Colors";
import { CustomText } from "@/components/CustomText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function user() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.cardWrapper}>
        <View style={styles.userImgWrapper}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/26.jpg" }}
            width={120}
            height={120}
            style={styles.userImg}
          />
          <TouchableHighlight
            underlayColor="#fff"
            style={styles.editWrapper}
            activeOpacity={0.9}
            onPress={() => {}}
          >
            <View style={styles.edit}>
              <MaterialIcons
                name="edit"
                size={24}
                color={"white"}
                style={styles.pencil}
              />
            </View>
          </TouchableHighlight>
        </View>
        <View>
          <CustomText style={styles.username}>username placeholder</CustomText>
          <CustomText style={styles.email}>email placeholder</CustomText>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableHighlight
          style={styles.button}
          underlayColor="#fff"
          onPress={() => {}}
          activeOpacity={0.9}
        >
          <View style={styles.buttonColor}>
            <CustomText style={styles.buttonText}>Save changes</CustomText>
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 8,
    paddingTop: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  cardWrapper: {
    display: "flex",
    gap: 16,
    width: "100%",
    alignItems: "center",
  },
  userImg: {
    borderRadius: 999,
  },
  userImgWrapper: {
    position: "relative",
  },
  email: {
    color: "gray",
    textAlign: "center",
  },
  username: {
    fontFamily: "Outfit_500Medium",
    color: "white",
    textAlign: "center",
    fontSize: 24,
  },
  edit: {
    height: 40,
    width: 40,
    borderRadius: 8,
    backgroundColor: INDIGO,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  editWrapper: {
    position: "absolute",
    top: -4,
    left: 92,
    borderRadius: 8,
  },
  buttonWrapper: { paddingVertical: 8 },
  button: {
    borderRadius: 8,
    height: 64,
    backgroundColor: ROSE,
  },
  buttonText: {
    fontFamily: "Outfit_500Medium",
    color: "white",
  },
  buttonColor: {
    backgroundColor: ROSE,
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
