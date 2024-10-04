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
import { CustomText } from '@/components/CustomText';

export default function HomeScreen() {
    const [_notes, setNotes] = useState<Response | any>([]);
    const context = useCntx();
    const { subject, note } = useLocalSearchParams();

    useEffect(() => {
        const get = async () => {
            if (!subject) return;
            const authToken = await AsyncStorage.getItem('access_token');

            if (!authToken) signOut();
            try {
                const getNotes = await fetch(
                    `https://powerstudy-backend.vercel.app/notes/${note}`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                const res = await getNotes.json();
                res.content = res.content.replace(/\\n/g, '\n');
                setNotes(res);
            } catch (error) {
                console.error(error);
            }
        };

        get();
    }, []);
    console.log(_notes.content);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.wrapper}>
                {_notes.content ? (
                    <Markdown style={mdstyles}>{_notes.content}</Markdown>
                ) : (
                    <CustomText>Loading...</CustomText>
                )}
            </ScrollView>
        </SafeAreaView>
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
