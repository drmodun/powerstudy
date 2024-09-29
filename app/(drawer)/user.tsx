// External Packages
import {
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

// Components and external variables
import { INDIGO, ROSE } from '@/constants/Colors';
import { CustomText } from '@/components/CustomText';
import { MyInput } from '@/components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteUser } from '@/functions/auth';

export default function User() {
  const [username, setUsername] = useState(null);
  const [username2, setUsername2] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);

  let condition = image2 || password || username;

  // Unified function for API calls
  const updateProfile = async () => {
    const token = await AsyncStorage.getItem('access_token');
    let data = {};
    if (username) data['name'] = username;
    if (password) data['password'] = password;
    if (image2) data['profilePicture'] = image2;

    console.log('DATAAA', data);

    let response = await fetch('http://192.168.1.206:5500/users', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    response = await response.json();
    console.log(response);
    setImage2(null);
    setUsername(null);
    setPassword(null);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

    uploadImage(result.assets[0].uri);
  };

  const uploadImage = async (a) => {
    const token = await AsyncStorage.getItem('access_token');
    let localUri = a;
    let filename = localUri.split('/').pop();

    let formData = new FormData();
    formData.append('files', {
      uri: localUri,
      name: filename,
      type: 'image/jpeg',
    });
    const response = await fetch('http://192.168.1.206:5500/blob/images', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    let responseJson = await response.json();
    setImage2(responseJson[0].fileUri);
    console.log('idk', responseJson[0].fileUri);
  };
  useEffect(() => {
    const load = () => {
      AsyncStorage.getItem('name').then((_name) => setUsername2(_name));
      AsyncStorage.getItem('email').then((_email) => setEmail(_email));
      AsyncStorage.getItem('image').then((_image) => setImage(_image));
    };
    load();
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.cardWrapper}>
        <View style={styles.userImgWrapper}>
          <Image
            source={{
              uri:
                image ??
                'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg',
            }}
            style={styles.userImg}
          />
          <TouchableOpacity style={styles.editWrapper} onPress={pickImage}>
            <View style={styles.edit}>
              <MaterialIcons name="edit" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <CustomText style={styles.username}>{username2}</CustomText>
          <CustomText style={styles.email}>{email}</CustomText>
        </View>
        <View style={styles.inputWrapper}>
          <MyInput
            label="Change username"
            setValue={setUsername}
            placeholderValue="Enter your new username"
            value={username}
          />
          <MyInput
            label="Change password"
            setValue={setPassword}
            placeholderValue="Enter your new password"
            value={password}
            type={'password'}
          />
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.getItem('access_token').then((token) => {
              AsyncStorage.getItem('id').then((id) => {
                id && token && deleteUser(id, token);
              });
            });
          }}
          style={[styles.button, { backgroundColor: 'red', marginBottom: 8 }]}
        >
          <CustomText style={[styles.buttonText, { color: 'white' }]}>
            Delete user account
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!condition}
          onPress={() => {
            updateProfile();
          }}
          style={[
            styles.button,
            { backgroundColor: condition ? ROSE : '#767676' },
          ]}
        >
          <CustomText
            style={[
              styles.buttonText,
              { color: condition ? 'white' : '#c0c0c0' },
            ]}
          >
            Save changes
          </CustomText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 8,
    paddingTop: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  cardWrapper: {
    alignItems: 'center',
  },
  userImg: {
    width: 120,
    height: 120,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  editWrapper: {
    position: 'absolute',
    top: 0,
    right: -16,
    borderRadius: 8,
  },
  buttonWrapper: {
    paddingVertical: 8,
  },
  button: {
    borderRadius: 8,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Outfit_500Medium',
    fontSize: 16,
  },
  inputWrapper: {
    width: '100%',
    paddingHorizontal: 16,
    gap: 16,
    paddingVertical: 16,
  },
});
