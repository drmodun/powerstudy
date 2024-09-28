// External packages
import * as React from 'react';
import { MyButton } from '@/components/Button';
import { CustomText } from '@/components/CustomText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, TextInput, View } from 'react-native';

// Components and variables
import { FONT_BASE, FONT_MD, FONT_XL } from '@/constants/FontSizes';
import { LIGHT_WHITE, WHITE } from '@/constants/Colors';
import { RADIUS_LG } from '@/constants/BorderRadiusSizes';

export default function TabTwoScreen() {
    const [inputValue, setInputValue] = React.useState('');
    return (
        <SafeAreaView style={styles.mainContainer}>
            <CustomText style={{ fontSize: FONT_XL }}>Log in</CustomText>
            <CustomText
                style={{
                    fontSize: FONT_BASE,
                    color: LIGHT_WHITE,
                    marginTop: 16,
                }}
            >
                Welcome back! Please enter your details.
            </CustomText>

            <View style={styles.inputContainer}>
                <CustomText style={{ fontSize: FONT_MD }}>Email</CustomText>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor={LIGHT_WHITE} // Semi-transparent white placeholder
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                    selectionColor="#fff" // White cursor
                />
            </View>
            <View style={styles.inputContainer}>
                <CustomText style={{ fontSize: FONT_MD }}>Password</CustomText>
                <TextInput
                    style={styles.input}
                    placeholder="*****" // Updated placeholder text for clarity
                    placeholderTextColor={LIGHT_WHITE} // Semi-transparent white placeholder
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                    selectionColor="#fff" // White cursor
                />
            </View>
            <MyButton
                variant="solid"
                buttonColor="pink"
                style={{
                    marginTop: 40,
                }}
                onPress={() => console.log('Hello world')}
            >
                Log in
            </MyButton>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 24,
        flex: 1,
        justifyContent: 'center',
    },
    inputContainer: {
        marginTop: 24,
        width: '100%', // Ensure the input container takes full width
    },
    input: {
        height: 50,
        width: '100%', // Make the input field take full width
        padding: 10,
        borderWidth: 2,
        borderColor: WHITE,
        borderRadius: RADIUS_LG,
        color: WHITE,
        fontSize: FONT_BASE,
        marginTop: 12,
    },
});
