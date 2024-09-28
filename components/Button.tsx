//External packages
import * as React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

// Components and variables
import { CustomText } from '@/components/CustomText';
import { RADIUS_LG } from '@/constants/BorderRadiusSizes';
import { INDIGO, ROSE, WHITE } from '@/constants/Colors';
import { FONT_BASE } from '@/constants/FontSizes';

export const MyButton: React.FC<{
  onPress: () => void;
  children: React.ReactNode;
  buttonColor: 'pink' | 'indigo';
  variant: 'solid' | 'outline';
  style?: object;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}> = ({
  iconLeft,
  iconRight,
  children,
  buttonColor,
  style,
  variant,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.buttonDefault,
      {
        borderColor:
          variant === 'outline' && (buttonColor === 'indigo' ? INDIGO : ROSE),
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
    {iconLeft}
    <CustomText
      style={{
        color:
          variant === 'solid'
            ? WHITE
            : buttonColor === 'indigo'
            ? INDIGO
            : ROSE,
        fontSize: FONT_BASE,
        fontWeight: 'semibold',
        height: 24,
      }}
    >
      {children}
    </CustomText>
    {iconRight}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonDefault: {
    borderRadius: RADIUS_LG,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
});
