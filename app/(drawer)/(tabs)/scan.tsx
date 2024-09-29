// External Imports
import { Image, StyleSheet, View, TouchableHighlight } from 'react-native';
import { INDIGO, ROSE } from '@/constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

// Components
import { Card } from '@/components/Card';

export default function Scan() {
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

    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult =
            await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            console.log(result);
        }
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
            {image && (
                <Image
                    source={{
                        uri: image,
                    }}
                    width={120}
                    height={120}
                />
            )}
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
});
