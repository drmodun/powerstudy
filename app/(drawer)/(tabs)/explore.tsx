import Ionicons from '@expo/vector-icons/Ionicons';
import {
  StyleSheet,
  Image,
  Platform,
  ScrollView,
  View,
  TextInput,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { CustomText } from '@/components/CustomText';
import { BLACK, INDIGO, ROSE } from '@/constants/Colors';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabTwoScreen() {
  const [text, setText] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  return (
    <View style={styles.wrapper}>
      <CustomText style={styles.header}>Ask a question to our AI:</CustomText>
      <View style={styles.responseWrapper}>
        <ScrollView>
          <CustomText style={styles.responseText}>{text}</CustomText>
        </ScrollView>
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
          <TouchableHighlight
            underlayColor="#fff"
            style={styles.sendWrapper}
            activeOpacity={0.9}
            onPress={() => setText(query)}
          >
            <View style={styles.send}>
              <MaterialIcons name="send" size={24} color="white" />
            </View>
          </TouchableHighlight>
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
