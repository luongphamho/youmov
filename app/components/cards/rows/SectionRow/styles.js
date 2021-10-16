import { StyleSheet } from 'react-native';

import { getResponsiveFontSize } from '../../../../utils/dimensions';


const styles = StyleSheet.create({
  container: {
    marginTop: 35
  },
  containerLast: {
    marginBottom: 15
  },
  containerSubTitle: {
    marginRight: 25
  },
  title: {
    fontSize: getResponsiveFontSize(2.6),
    fontWeight: 'bold',
    marginBottom: 7
  }
});

export default styles;
