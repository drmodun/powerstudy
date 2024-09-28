// External Packages
import {
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableHighlight,
  Button,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

// Components
import { INDIGO, LIGHT_PURPLE, PURPLE, ROSE } from '@/constants/Colors';
import { CustomText } from '@/components/CustomText';
import { MyInput } from '@/components/Input';

export default function user() {
  const [username, setUsername] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.cardWrapper}>
        <View style={styles.userImgWrapper}>
          <Image
            source={{
              uri: image ?? 'https://randomuser.me/api/portraits/women/26.jpg',
            }}
            width={120}
            height={120}
            style={styles.userImg}
          />
          <TouchableHighlight
            underlayColor="#fff"
            style={styles.editWrapper}
            activeOpacity={0.9}
            onPress={pickImage}
          >
            <View style={styles.edit}>
              <MaterialIcons name="edit" size={24} color={'white'} />
            </View>
          </TouchableHighlight>
        </View>
        <View>
          <CustomText style={styles.username}>username placeholder</CustomText>
          <CustomText style={styles.email}>email placeholder</CustomText>
        </View>
        <View style={styles.inputWrapper}>
          <MyInput
            label="Change username"
            setValue={setUsername}
            placeholderValue="Enter your new username"
            value={username}
            style={styles.input}
          />
          <MyInput
            label="Change password"
            setValue={setPassword}
            placeholderValue="Enter your new password"
            value={password}
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableHighlight
          style={styles.button}
          underlayColor="#fff"
          onPress={() => {}}
          activeOpacity={0.9}
        >
          <View
            style={[
              styles.buttonColor,
              {
                backgroundColor:
                  image || password || username ? ROSE : '#767676',
              },
            ]}
          >
            <CustomText
              style={[
                styles.buttonText,
                { color: image || password || username ? 'white' : '#c0c0c0' },
              ]}
            >
              Save changes
            </CustomText>
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  cardWrapper: {
    display: 'flex',
    gap: 16,
    width: '100%',
    alignItems: 'center',
  },
  userImg: {
    borderRadius: 999,
  },
  userImgWrapper: {
    position: 'relative',
  },
  email: {
    color: 'gray',
    textAlign: 'center',
  },
  username: {
    fontFamily: 'Outfit_500Medium',
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
  },
  edit: {
    height: 40,
    width: 40,
    borderRadius: 8,
    backgroundColor: INDIGO,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editWrapper: {
    position: 'absolute',
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
    fontFamily: 'Outfit_500Medium',
    color: 'white',
  },
  buttonColor: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  inputWrapper: {
    width: '100%',
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    paddingVertical: 16,
  },
});
