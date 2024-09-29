// External Packages
import * as React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Components and variables
import { RADIUS_2XL, RADIUS_LG } from '@/constants/BorderRadiusSizes';
import { INDIGO, ROSE } from '@/constants/Colors';
import { CustomText } from '@/components/CustomText';
import { FONT_LG, FONT_XL } from '@/constants/FontSizes';
import { useCntx } from '@/hooks/useAppContext';

export default function Scan() {
  const { mathImage } = useCntx();

  const getUserId = async () => {
    const authToken = await AsyncStorage.getItem('access_token');

    if (!mathImage) return;
    const formImageProblem = new FormData();
    formImageProblem.append('files', mathImage);

    const sendImage = await fetch('http://192.168.1.117:5500/math-problems', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      },
      body: formImageProblem,
    });
    const getImage = await sendImage.json();
    console.log(getImage);
  };

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.imageContainer}>
        {mathImage && (
          <Image
            source={{
              uri: mathImage,
            }}
            style={{ flex: 1 }}
          />
        )}
      </View>
      <View style={styles.solutionContainer}>
        <View style={styles.solutionLabel}>
          <CustomText style={{ fontSize: FONT_XL, fontWeight: 'bold' }}>
            The solution is
          </CustomText>
        </View>
        <ScrollView style={styles.solution}>
          <TouchableOpacity onPress={getUserId}>
            <CustomText style={{ fontSize: FONT_LG }}>lorem</CustomText>
          </TouchableOpacity>
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
  imageContainer: {
    height: 300,
    borderRadius: RADIUS_2XL,
    backgroundColor: INDIGO,
    padding: 16,
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
