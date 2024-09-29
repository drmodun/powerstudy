// External Imports
import {
  Image,
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { INDIGO, ROSE } from '@/constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

// Components and contextes
import { Card } from '@/components/Card';
import { useCntx } from '@/hooks/useAppContext';
import { RADIUS_2XL, RADIUS_LG } from '@/constants/BorderRadiusSizes';
import { CustomText } from '@/components/CustomText';
import { FONT_LG, FONT_XL } from '@/constants/FontSizes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Markdown from 'react-native-markdown-display';

export default function Scan() {
  const [mathImage, setMathImage] = useState();
  const [title, setTitle] = useState('');
  const [solution, setSolution] = useState('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.75,
    });

    console.log(result);

    if (!result.canceled) {
      setMathImage(result.assets[0].uri);
    }

    getUserId(result.assets[0].uri);
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    console.log(result);

    if (!result.canceled) {
      setMathImage(result.assets[0].uri);
      console.log(result);
    }
  };

  const getUserId = async (_mathImage) => {
    const authToken = await AsyncStorage.getItem('access_token');

    if (!_mathImage) return;

    const filename: any = _mathImage.split('/').pop();
    const formImageProblem = new FormData();
    formImageProblem.append('file', {
      uri: _mathImage,
      name: filename,
      type: 'image/jpeg',
    });

    const sendImage = await fetch(
      'https://powerstudy-backend.vercel.app/math-problems',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formImageProblem,
      }
    );
    const getImage = await sendImage.json();
    console.log(getImage);

    const getResponse = await fetch(
      'http://192.168.1.206:5500/math-problems/' + getImage['id'],
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const response = await getResponse.json();
    console.log(response);
    setTitle(response[0]['mathQuestion']);
    setSolution(response[0]['solution']);
  };

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.cardWrapper}>
        <TouchableHighlight
          style={styles.button}
          underlayColor="#fff"
          onPress={openCamera}
          activeOpacity={0.9}
        >
          <Card
            text="Take a photo"
            icon="camera"
            style={{ backgroundColor: INDIGO }}
          />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          underlayColor="#fff"
          onPress={pickImage}
          activeOpacity={0.9}
        >
          <Card
            text="Open image"
            icon="image"
            style={{ backgroundColor: ROSE }}
          />
        </TouchableHighlight>
      </View>
      <View style={styles.solutionContainer}>
        <View style={styles.solutionLabel}>
          <CustomText style={{ fontSize: FONT_XL }}>The solution is</CustomText>
        </View>
        <ScrollView style={styles.solution}>
          <Markdown style={mdstyles}>{solution ?? ''}</Markdown>
        </ScrollView>
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
    display: 'flex',
    gap: 16,
  },
  button: {
    borderRadius: 8,
  },
  imageContainer: {
    width: '100%',
    borderRadius: RADIUS_2XL,
    backgroundColor: INDIGO,
    padding: 16,
    marginTop: 16,
  },
  solutionContainer: {
    marginTop: 16,
    borderRadius: RADIUS_2XL,
    overflow: 'hidden',
    borderColor: ROSE,
    borderWidth: 1,
    height: 360,
    marginBottom: 40,
  },
  solutionLabel: {
    backgroundColor: ROSE,
    paddingHorizontal: 12,
    paddingVertical: 24,
    borderBottomLeftRadius: RADIUS_LG,
    borderBottomRightRadius: RADIUS_LG,
  },
  solution: {
    padding: 16,
  },
});

const mdstyles = StyleSheet.create({
  body: {
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 4,
    paddingBottom: 16,
  },
});
