// External packages
import * as React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

// Components and variables
import { FONT_BASE, FONT_MD } from '@/constants/FontSizes';
import { LIGHT_WHITE, WHITE } from '@/constants/Colors';
import { RADIUS_LG } from '@/constants/BorderRadiusSizes';
import { CustomText } from '@/components/CustomText';

export const MyInput: React.FC<{
    label: string;
    placeholderValue: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}> = ({ label, placeholderValue, value, setValue }) => {
    return (
        <View style={styles.inputContainer}>
            <CustomText style={{ fontSize: FONT_MD }}>{label}</CustomText>
            <TextInput
                style={styles.input}
                placeholder={placeholderValue}
                placeholderTextColor={LIGHT_WHITE}
                value={value}
                onChangeText={(text) => setValue(text)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
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
});
