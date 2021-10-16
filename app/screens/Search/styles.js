import { StyleSheet } from 'react-native';

import { getResponsiveFontSize } from '../../utils/dimensions';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerList: {
    marginTop: 25
  },
  item: {
    alignItems: 'center',
    marginBottom: 25
  },
  itemText: {
    fontSize: getResponsiveFontSize(2.5),
    textAlign: 'center'
  }
});

export default styles;
