// External pcakages
import * as React from 'react';
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';

// Components and variables
import { CustomText } from '@/components/CustomText';
import { RADIUS } from '@/constants/BorderRadiusSizes';

export const MyButton: React.FC<
    React.ComponentPropsWithoutRef<typeof Button>
> = ({ children, style, ...rest }) => (
    <Button {...rest} style={[styles.buttonDefault, style]}>
        <CustomText>{children}</CustomText>
    </Button>
);

const styles = StyleSheet.create({
    buttonDefault: {
        borderRadius: RADIUS,
    },
});
