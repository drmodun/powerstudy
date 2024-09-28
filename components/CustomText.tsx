// External packages
import * as React from 'react';
import {
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_700Bold,
    Outfit_900Black,
    useFonts,
} from '@expo-google-fonts/outfit';
import { StyleSheet, Text, TextProps } from 'react-native';

// Components and Variables
import { WHITE } from '@/constants/Colors';

export const CustomText = (
    props: JSX.IntrinsicAttributes &
        JSX.IntrinsicClassAttributes<Text> &
        Readonly<TextProps>
) => {
    let [fontsLoaded] = useFonts({
        Outfit_400Regular,
        Outfit_500Medium,
        Outfit_700Bold,
        Outfit_900Black,
    });
    if (!fontsLoaded) return null;
    return (
        <Text
            {...props}
            style={[
                { fontFamily: 'Outfit_400Regular' },
                styles.text,
                props.style,
            ]}
        >
            {props.children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: WHITE,
    },
});
