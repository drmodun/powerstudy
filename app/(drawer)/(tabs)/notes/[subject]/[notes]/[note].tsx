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
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from '@/functions/auth';
import { useCntx } from '@/hooks/useAppContext';
import { useLocalSearchParams } from 'expo-router';
import Markdown from 'react-native-markdown-display';

export default function HomeScreen() {
  const [_notes, setNotes] = useState<Response | never[]>([]);
  const context = useCntx();
  const { subject, notes, note } = useLocalSearchParams();

  useEffect(() => {
    const get = async () => {
      if (!subject) return;
      const authToken = await AsyncStorage.getItem('access_token');

      if (!authToken) signOut();

      let res = await fetch(`http://192.168.1.206:5500/notes/${note}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      res = await res.json();
      res['content'] = res['content'].replace(/\\n/g, '\n');
      setNotes(res);
      console.log(res);
    };

    get();
  }, []);
  return (
    <ScrollView style={styles.wrapper}>
      <Markdown style={mdstyles}>{_notes['content'] ?? ''}</Markdown>
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

const mdstyles = StyleSheet.create({
  body: {
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 4,
    paddingBottom: 16,
  },
});
