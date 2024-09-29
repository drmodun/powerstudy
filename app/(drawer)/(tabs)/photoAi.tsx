// External Packages
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// Components and variables
import { RADIUS_2XL, RADIUS_LG } from '@/constants/BorderRadiusSizes';
import { INDIGO, ROSE } from '@/constants/Colors';
import { CustomText } from '@/components/CustomText';
import { FONT_LG, FONT_XL } from '@/constants/FontSizes';

export default function Scan() {
  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.imageContainer}></View>
      <View style={styles.solutionContainer}>
        <View style={styles.solutionLabel}>
          <CustomText style={{ fontSize: FONT_XL, fontWeight: 'bold' }}>
            The solution is
          </CustomText>
        </View>
        <ScrollView style={styles.solution}>
          <CustomText style={{ fontSize: FONT_LG }}>lorem</CustomText>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  imageContainer: {
    height: 300,
    borderRadius: RADIUS_2XL,
    backgroundColor: INDIGO,
    padding: 16,
  },
  solutionContainer: {
    marginTop: 16,
    borderRadius: RADIUS_2XL,
    overflow: 'hidden',
    borderColor: ROSE,
    borderWidth: 1,
    height: 360,
    marginBottom: 40,
  },
  solutionLabel: {
    backgroundColor: ROSE,
    paddingHorizontal: 12,
    paddingVertical: 24,
    borderBottomLeftRadius: RADIUS_LG,
    borderBottomRightRadius: RADIUS_LG,
  },
  solution: {
    padding: 16,
  },
});
