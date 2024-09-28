//External packages
import * as React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

// Components and variables
import { CustomText } from '@/components/CustomText';
import { RADIUS_LG } from '@/constants/BorderRadiusSizes';
import { INDIGO, ROSE, WHITE } from '@/constants/Colors';

// React.ComponentPropsWithoutRef<typeof Button> if you can make this work like on web that would be awesome
export const MyButton: React.FC<{
    onPress: () => void;
    children: React.ReactNode;
    buttonColor: 'pink' | 'indigo';
    variant: 'solid' | 'outline';
    style?: object;
}> = ({ children, buttonColor, style, variant, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        style={[
            styles.buttonDefault,
            {
                borderColor:
                    variant === 'outline' &&
                    (buttonColor === 'indigo' ? INDIGO : ROSE),
                backgroundColor:
                    variant !== 'outline'
                        ? buttonColor === 'indigo'
                            ? INDIGO
                            : ROSE
                        : undefined,
            },

            style,
        ]}
    >
        <CustomText
            style={{
                color:
                    variant === 'solid'
                        ? WHITE
                        : buttonColor === 'indigo'
                        ? INDIGO
                        : ROSE,
                fontSize: 20,
                fontWeight: 'semibold',
            }}
        >
            {children}
        </CustomText>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    buttonDefault: {
        borderRadius: RADIUS_LG,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
});
