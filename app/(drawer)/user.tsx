// External Packages
import {
    Image,
    StyleSheet,
    SafeAreaView,
    View,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

// Components and external variables
import { INDIGO, ROSE } from '@/constants/Colors';
import { CustomText } from '@/components/CustomText';
import { MyInput } from '@/components/Input';

export default function user() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const condition = image || password || username;

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        if (!image) return;
        const form = new FormData();
        form.append('files', image);
        try {
            await fetch('http://192.168.1.206:5500/blob/images', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3Mjc2MDI1NzIsImV4cCI6MTcyNzY4ODk3Mn0.NAk-dnbMNaY9BzYBIllge6lYSt-vA5xs7wL7tkAE9Ys`,
                    'Content-Type': 'multipart/form-data',
                },
                body: form,
            });
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'You have successfuly changed an image',
            });
            router.push('/(drawer)/(tabs)/');
        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'An error occurred while sending an image. Please try again in a few moments.',
            });
        } finally {
            setImage(null);
        }
    };

    // Change id
    const updateCredentials = async () => {
        if (!username || !password) return;
        try {
            await fetch('http://192.168.1.206:5500/users/{id}', {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3Mjc2MDI1NzIsImV4cCI6MTcyNzY4ODk3Mn0.NAk-dnbMNaY9BzYBIllge6lYSt-vA5xs7wL7tkAE9Ys`,
                    'Content-Type': 'multipart/form-data',
                },
                body: JSON.stringify({
                    name: username,
                    password: password,
                }),
            });
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'You have successfuly changed your credentials',
            });
        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'An error occurred while updating credentials. Please try again in a few moments.',
            });
        } finally {
            setUsername('');
            setPassword('');
        }
    };
    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.cardWrapper}>
                <View style={styles.userImgWrapper}>
                    <Image
                        source={{
                            uri:
                                image ??
                                'https://randomuser.me/api/portraits/women/26.jpg',
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
                            <MaterialIcons
                                name="edit"
                                size={24}
                                color={'white'}
                            />
                        </View>
                    </TouchableHighlight>
                </View>
                <View>
                    <CustomText style={styles.username}>
                        username placeholder
                    </CustomText>
                    <CustomText style={styles.email}>
                        email placeholder
                    </CustomText>
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
                    <TouchableOpacity
                        disabled={!Boolean(condition)}
                        onPress={uploadImage}
                        style={[
                            styles.buttonColor,
                            {
                                backgroundColor: condition ? ROSE : '#767676',
                            },
                        ]}
                    >
                        <CustomText
                            style={[
                                styles.buttonText,
                                {
                                    color: condition ? 'white' : '#c0c0c0',
                                },
                            ]}
                        >
                            Save changes
                        </CustomText>
                    </TouchableOpacity>
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
