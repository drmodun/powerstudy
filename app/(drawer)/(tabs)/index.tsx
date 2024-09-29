import { Card } from '@/components/Card';
import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  Text,
} from 'react-native';
import { INDIGO, LIGHT_PURPLE, PURPLE } from '@/constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from '@/functions/auth';
import { useCntx } from '@/hooks/useAppContext';

export default function HomeScreen() {
  const context = useCntx();

  useEffect(() => {
    const getUserId = async () => {
      const authToken = await AsyncStorage.getItem('access_token');

      if (!authToken) signOut();

      let res = await fetch('http://192.168.1.206:5500/auth/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      res = await res.json();
      console.log(res);

      if (res['id'] && res['email']) {
        await AsyncStorage.setItem('id', JSON.stringify(res['id']));
        context.setId(JSON.stringify(res['id']));
        await AsyncStorage.setItem('email', res['email']);
        context.setEmail(res['email']);

        let res2 = await fetch(`http://192.168.1.206:5500/users/${res['id']}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        res2 = await res2.json();

        if (res2['name']) {
          await AsyncStorage.setItem('name', res2['name']);
          context.setUsername(res2['name']);
        }

        if (res2['profilePicture']) {
          await AsyncStorage.setItem('profilePicture', res2['profilePicture']);
          context.setProfilePicture(res2['profilePicture']);
        }
      }
    };

    getUserId();
  }, []);
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
    display: 'flex',
    gap: 16,
  },
});
