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
import { INDIGO, LIGHT_PURPLE, PURPLE, ROSE } from '@/constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from '@/functions/auth';
import { useCntx } from '@/hooks/useAppContext';
import { Link, router } from 'expo-router';

export default function HomeScreen() {
  const context = useCntx();
  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.cardWrapper}>
        <Pressable onPress={() => router.push('/(drawer)/(tabs)/notes/math')}>
          <Card
            text="Math"
            icon="calculate"
            style={{ backgroundColor: INDIGO, width: '100%' }}
          />
        </Pressable>
        <Pressable
          onPress={() => router.push('/(drawer)/(tabs)/notes/history')}
        >
          <Card
            text="History"
            icon="history-edu"
            style={{ backgroundColor: PURPLE }}
          />
        </Pressable>
        <Pressable
          onPress={() => router.push('/(drawer)/(tabs)/notes/language')}
        >
          <Card
            text="Language"
            icon="language"
            style={{ backgroundColor: LIGHT_PURPLE }}
          />
        </Pressable>
        <Pressable
          onPress={() => router.push('/(drawer)/(tabs)/notes/literature')}
        >
          <Card
            text="Literature"
            icon="book"
            style={{ backgroundColor: ROSE }}
          />
        </Pressable>
        <Pressable onPress={() => router.push('/(drawer)/(tabs)/notes/art')}>
          <Card
            text="Art"
            icon="brush"
            style={{ backgroundColor: LIGHT_PURPLE }}
          />
        </Pressable>
        <Pressable
          onPress={() => router.push('/(drawer)/(tabs)/notes/biology')}
        >
          <Card
            text="Biology"
            icon="nature"
            style={{ backgroundColor: PURPLE }}
          />
        </Pressable>
        <Pressable
          onPress={() => router.push('/(drawer)/(tabs)/notes/chemistry')}
        >
          <Card
            text="Chemistry"
            icon="science"
            style={{ backgroundColor: INDIGO }}
          />
        </Pressable>
        <Pressable
          onPress={() => router.push('/(drawer)/(tabs)/notes/geography')}
        >
          <Card
            text="Geography"
            icon="public"
            style={{ backgroundColor: PURPLE }}
          />
        </Pressable>
        <Pressable
          onPress={() => router.push('/(drawer)/(tabs)/notes/computer_science')}
        >
          <Card
            text="Computer Science"
            icon="computer"
            style={{ backgroundColor: LIGHT_PURPLE }}
          />
        </Pressable>
        <Pressable
          onPress={() => router.push('/(drawer)/(tabs)/notes/physics')}
        >
          <Card
            text="Physics"
            icon="electric-bike"
            style={{ backgroundColor: ROSE }}
          />
        </Pressable>
        <Pressable
          onPress={() => router.push('/(drawer)/(tabs)/notes/psychology')}
        >
          <Card
            text="Psychology"
            icon="psychology"
            style={{ backgroundColor: LIGHT_PURPLE }}
          />
        </Pressable>
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
