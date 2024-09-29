// External Packages
import {
    Image,
    StyleSheet,
    SafeAreaView,
    View,
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

export default function User() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const condition = image || password || username;

    // Unified function for API calls
    const updateProfile = async (type: 'username' | 'password') => {
        const data: {
            name?: string;
            password?: string;
        } = {};
        if (type === 'username' && username.length > 2) {
            data.name = username;
        } else if (type === 'password' && password.length > 7) {
            data.password = password;
        } else {
            return;
        }

        try {
            await fetch(`http://192.168.1.206:5500/users/{id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3Mjc2MDI1NzIsImV4cCI6MTcyNzY4ODk3Mn0.NAk-dnbMNaY9BzYBIllge6lYSt-vA5xs7wL7tkAE9Ys
`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: `You have successfully changed your ${type}`,
            });
            setUsername('');
            setPassword('');
        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: `An error occurred while updating your ${type}. Please try again.`,
            });
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
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
                text2: 'Image successfully updated!',
            });
            setImage(null);
            router.push('/(drawer)/(tabs)/');
        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Error uploading image. Please try again.',
            });
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
                        style={styles.userImg}
                    />
                    <TouchableOpacity
                        style={styles.editWrapper}
                        onPress={pickImage}
                    >
                        <View style={styles.edit}>
                            <MaterialIcons
                                name="edit"
                                size={24}
                                color="white"
                            />
                        </View>
                    </TouchableOpacity>
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
                <TouchableOpacity
                    disabled={!condition}
                    onPress={() => {
                        if (image) uploadImage();
                        if (username) updateProfile('username');
                        if (password) updateProfile('password');
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
