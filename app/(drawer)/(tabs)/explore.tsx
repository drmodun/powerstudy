import {
    StyleSheet,
    ScrollView,
    View,
    TextInput,
    TouchableHighlight,
    Dimensions,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import * as React from 'react';
import { CustomText } from '@/components/CustomText';
import { BLACK, INDIGO, ROSE } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from '@/functions/auth';
import Markdown from 'react-native-markdown-display';

export default function TabTwoScreen() {
    const [query, setQuery] = React.useState('');
    const [data, setData] = React.useState<any>([]); // Initialize as an array

    React.useEffect(() => {
        const getConversation = async () => {
            const authToken = await AsyncStorage.getItem('access_token');
            if (!authToken) signOut();
            const getConversationData = await fetch(
                'https://powerstudy-backend.vercel.app/question-answers',
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            const getData = await getConversationData.json();

            setData(Object.values(getData));
        };
        getConversation();
    }, []);
    const askQuestion = async () => {
        const authToken = await AsyncStorage.getItem('access_token');
        const getConversationData = await fetch(
            'https://powerstudy-backend.vercel.app/question-answers',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    question: query,
                }),
            }
        );
        const check = await getConversationData.json();

        setData((prevData: any) => [...prevData, check]);
        setQuery('');
    };

    return (
        <View style={styles.wrapper}>
            <CustomText style={styles.header}>
                Ask a question to our AI:
            </CustomText>
            <View style={styles.responseWrapper}>
                <FlatList
                    data={data} // Pass the array directly to FlatList
                    keyExtractor={(item, index) => index.toString()} // Use index for key
                    renderItem={({ item }) => (
                        <View>
                            <Markdown style={mdstyles}>{item.answer}</Markdown>
                        </View>
                    )}
                />
            </View>
            <View style={styles.inputSend}>
                <View>
                    <TextInput
                        placeholder="Ask a question..."
                        style={styles.input}
                        placeholderTextColor="#8A8A8A"
                        value={query}
                        onChangeText={(val: string) => setQuery(val)}
                    />
                </View>
                <View style={{ width: 64 }}>
                    <TouchableOpacity
                        style={styles.sendWrapper}
                        activeOpacity={0.9}
                        onPress={askQuestion}
                    >
                        <View style={styles.send}>
                            <MaterialIcons
                                name="send"
                                size={24}
                                color="white"
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    header: {
        fontSize: 32,
        fontFamily: 'Outfit_500Medium',
        color: 'white',
    },
    input: {
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        height: 64,
        color: 'white',
        fontFamily: 'Outfit_400Regular',
        width: Dimensions.get('window').width - 24 - 64,
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        paddingTop: 16,
        paddingHorizontal: 8,
        paddingBottom: 128 + 16,
        width: '100%',
    },
    responseWrapper: {
        borderColor: INDIGO,
        borderWidth: 1,
        borderRadius: 8,
        height: '100%',
        marginVertical: 16,
    },
    inputSend: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    send: {
        width: 64,
        backgroundColor: BLACK,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 64,
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 1,
    },
    sendWrapper: {
        borderRadius: 8,
    },
    responseText: {
        padding: 16,
        color: 'white',
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
