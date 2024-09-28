// External packages
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, TextInput, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { Image } from 'react-native';
// Components and variables
import { FONT_BASE, FONT_MD, FONT_XL } from '@/constants/FontSizes';
import { LIGHT_WHITE, WHITE } from '@/constants/Colors';
import { RADIUS_LG, RADIUS_FULL } from '@/constants/BorderRadiusSizes';
import { CustomText } from '@/components/CustomText';
import { MyButton } from '@/components/Button';
import { MyInput } from '@/components/Input';
// Assets

export default function TabTwoScreen() {
    const [inputValue, setInputValue] = React.useState<string>(''); // Change states later when Jan finshes, leave this for now
    return (
        <SafeAreaView style={styles.mainContainer}>
            <CustomText style={{ fontSize: FONT_XL }}>Log in</CustomText>
            <CustomText style={styles.subheading}>
                Welcome back! Please enter your details.
            </CustomText>

            <MyInput
                label="Email"
                placeholderValue="Enter your email"
                value={inputValue}
                setValue={setInputValue}
            />
            <MyInput
                label="Password"
                placeholderValue="*******"
                value={inputValue}
                setValue={setInputValue}
            />

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
            <View style={styles.seperatorContainer}>
                <Divider style={{ flex: 1 }} />
                <CustomText style={{ color: LIGHT_WHITE }}>or</CustomText>
                <Divider style={{ flex: 1 }} />
            </View>
            <MyButton
                variant="solid"
                buttonColor="indigo"
                onPress={() => console.log('Hello world')}
                iconLeft={
                    <Image
                        source={require('../../assets/images/GoogleLogo.png')}
                        style={{
                            objectFit: 'cover',
                            borderRadius: RADIUS_FULL,
                            width: 32,
                            height: 32,
                        }}
                    />
                }
            >
                Log in with google
            </MyButton>
            <CustomText style={{ color: LIGHT_WHITE, marginTop: 24 }}>
                Already have an accout? Sign up
                {/* Add link on sign up */}
            </CustomText>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    subheading: {
        fontSize: FONT_BASE,
        color: LIGHT_WHITE,
        marginTop: 16,
    },
    mainContainer: {
        paddingHorizontal: 24,
        flex: 1,
        justifyContent: 'center',
    },
    inputContainer: {
        marginTop: 24,
        width: '100%',
    },
    input: {
        height: 50,
        width: '100%',
        padding: 10,
        borderWidth: 2,
        borderColor: WHITE,
        borderRadius: RADIUS_LG,
        color: WHITE,
        fontSize: FONT_BASE,
        marginTop: 12,
    },
    seperatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginVertical: 24,
    },
});
