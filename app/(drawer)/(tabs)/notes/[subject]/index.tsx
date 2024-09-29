import { Card } from '@/components/Card';
import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  Text,
  Pressable,
} from 'react-native';
import { INDIGO, LIGHT_PURPLE, PURPLE } from '@/constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from '@/functions/auth';
import { useCntx } from '@/hooks/useAppContext';
import { router, useLocalSearchParams } from 'expo-router';

export default function HomeScreen() {
  const [knowledgeBases, setKnowledgeBases] = useState<Response | never[]>([]);
  const context = useCntx();
  const { subject } = useLocalSearchParams();

  useEffect(() => {
    const get = async () => {
      if (!subject) return;
      const authToken = await AsyncStorage.getItem('access_token');

      if (!authToken) signOut();

      let res = await fetch(
        'https://powerstudy-backend.vercel.app/knowledge-bases?' +
          new URLSearchParams({
            subject: subject,
          }).toString(),
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      res = await res.json();
      setKnowledgeBases(res);
      console.log(res);
    };

    get();
  }, []);
  return (
    <ScrollView style={styles.wrapper}>
      {knowledgeBases.map((knowledgeBase) => {
        return (
          <Pressable
            onPress={() =>
              router.push(
                `/(drawer)/(tabs)/notes/${subject}/${knowledgeBase['id']}`
              )
            }
          >
            <Card
              text={knowledgeBase['title']}
              style={{ backgroundColor: INDIGO, width: '100%' }}
            />
          </Pressable>
        );
      })}
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
