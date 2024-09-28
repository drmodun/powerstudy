// External packages
import { MyButton } from '@/components/Button';
import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';

// Components
import { TextInput } from 'react-native-paper';

export default function TabTwoScreen() {
    const [text, setText] = React.useState('');
    return (
        <View>
            <Text>Hello world</Text>
            <MyButton
                mode="outlined"
                onPress={() => console.log('Hello world')}
            >
                sds
            </MyButton>
            {/* <TextInput label="Password" /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
    },
});
