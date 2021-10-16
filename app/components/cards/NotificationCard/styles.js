import { StyleSheet } from 'react-native';

import { getResponsiveFontSize } from '../../../utils/dimensions';


const styles = StyleSheet.create({
  containerError: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  errorInfo: {
    fontSize: getResponsiveFontSize(2.6),
    textAlign: 'center',
    padding: 25
  },
  loadingButton: {
    padding: 10,
    width: '50%',
    borderWidth: 1,
    borderRadius: 100,
  },
  loadingText: {
    fontSize: getResponsiveFontSize(2.1),
    textAlign: 'center'
  }
});

export default styles;
