// External packages
import * as React from 'react';
import { StyleSheet, TextInput, View, ViewStyle } from 'react-native';

// Components and variables
import { FONT_BASE, FONT_MD } from '@/constants/FontSizes';
import { LIGHT_WHITE, WHITE } from '@/constants/Colors';
import { RADIUS_LG } from '@/constants/BorderRadiusSizes';
import { CustomText } from '@/components/CustomText';

export const MyInput: React.FC<{
    label?: string;
    placeholderValue?: string;
    value?: string;
    style?: ViewStyle;
    setValue:
        | React.Dispatch<React.SetStateAction<string | undefined>>
        | React.Dispatch<React.SetStateAction<string>>;
    type?: 'text' | 'password';
    inputMode?:
        | 'decimal'
        | 'email'
        | 'none'
        | 'numeric'
        | 'search'
        | 'tel'
        | 'text'
        | 'url';
}> = ({
    label,
    placeholderValue,
    value,
    style,
    setValue,
    type = 'text',
    inputMode = 'text',
}) => {
    return (
        <View style={[styles.inputContainer, style]}>
            {label && (
                <CustomText style={{ marginBottom: 8 }}>{label}</CustomText>
            )}
            <TextInput
                style={styles.input}
                placeholder={placeholderValue}
                placeholderTextColor={LIGHT_WHITE}
                value={value}
                onChangeText={(text) => setValue(text)}
                secureTextEntry={type === 'password'}
                inputMode={inputMode}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
    },
    input: {
        height: 64,
        width: '100%',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: WHITE,
        borderRadius: RADIUS_LG,
        color: WHITE,
        fontSize: FONT_BASE,
        fontFamily: 'Outfit_400Regular',
    },
});
