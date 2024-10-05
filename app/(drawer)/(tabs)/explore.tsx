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
import { Divider } from 'react-native-paper';
import * as React from 'react';
import { CustomText } from '@/components/CustomText';
import { BLACK, INDIGO, ROSE } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from '@/functions/auth';
import Markdown from 'react-native-markdown-display';

export default function TabTwoScreen() {
  const [query, setQuery] = React.useState('');
  const [data, setData] = React.useState<any>([]);
  const [check, setCheck] = React.useState<any>('');
  const [startQuestion, setStartQuestion] = React.useState(false);

  React.useEffect(() => {
    const getConversation = async () => {
      const authToken = await AsyncStorage.getItem('access_token');
      if (!authToken) signOut();
      const getConversationData = await fetch(
        'https://powerstudy-backend.vercel.app/question-answers/me',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const items = await getConversationData.json();

      setData(Object.keys(items).map((item) => items[item]));
    };
    getConversation();
  }, []);

  if (check) console.log(check);
  console.log(query);
  const askQuestion = async () => {
    setStartQuestion(true);
    const authToken = await AsyncStorage.getItem('access_token');
    try {
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
      const response = await getConversationData.json();
      const getDesiresdResponse = await fetch(
        `https://powerstudy-backend.vercel.app/question-answers/${response.id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const answerResponse = await getDesiresdResponse.json();
      setCheck(answerResponse);
      setData((prevData: any) => [...prevData, answerResponse]);
    } catch (error) {
      console.error(error);
    } finally {
      setStartQuestion(false);
      // setQuery('');
    }
  };

  return (
    <View style={styles.wrapper}>
      <CustomText style={styles.header}>Ask a question to our AI:</CustomText>
      <View style={styles.responseWrapper}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ paddingVertical: 20 }}>
              <Markdown style={mdstyles}>{item.answer}</Markdown>
              <Divider />
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
              {startQuestion ? (
                <MaterialIcons name="more-horiz" size={24} color="white" />
              ) : (
                <MaterialIcons name="send" size={24} color="white" />
              )}
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
