import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

export const handleLogin = (email: string, password: string) => {
  fetch('http://192.168.1.206:5500/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => {
      res.json().then((val) => {
        if (val['access_token']) {
          AsyncStorage.setItem('access_token', val['access_token'])
            .then(() => {
              router.push('/(drawer)/(tabs)/');
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Invalid credentials. Please check your email and password.',
          });
        }
      });
    })
    .catch(function (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          'An error occurred while logging in. Try again in a few moments.',
      });

      throw error;
    });
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  fetch('http://192.168.1.206:5500/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  }).then((res) => {
    res
      .json()
      .then((val) => {
        console.log(val);
        if (res.status === 201) {
          console.log(res);
          handleLogin(email, password);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Invalid credentials. Please try again.',
          });
        }
      })

      .catch(function (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2:
            'An error occurred while signing up. Try again in a few moments.',
        });

        throw error;
      });
  });
};

export const signOut = async () => {
  await AsyncStorage.clear();

  router.dismissAll();
  router.replace('/login');
};
