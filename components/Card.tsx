// External packages
import { StyleSheet, ViewStyle, View, TextStyle } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Components
import { CustomText } from '@/components/CustomText';

export const Card: React.FC<{
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconStyle?: ViewStyle;
  text?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
}> = ({ style, textStyle, iconStyle, text = '', icon = 'bug-report' }) => (
  <View style={[styles.wrapper, style]}>
    <CustomText style={[styles.text, textStyle]}>{text}</CustomText>
    <View style={styles.iconWrapper}>
      <MaterialIcons
        name={icon}
        color="white"
        style={[styles.icon, iconStyle]}
        size={80}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 64,
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 32,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    fontSize: 36,
    width: '70%',
    fontFamily: 'Outfit_700Bold',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
