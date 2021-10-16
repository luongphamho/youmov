import { StyleSheet } from 'react-native';

import { getResponsiveFontSize } from '../../../../utils/dimensions';



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  description: {
    fontSize: getResponsiveFontSize(2.1),
    textAlign: 'justify'
  }
});

export default styles;
