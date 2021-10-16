import { StyleSheet } from 'react-native';

import {
  getResponsiveFontSize,
  getResponsiveHeight
} from '../../../utils/dimensions';

const styles = StyleSheet.create({
  containerModal: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: getResponsiveHeight(70)
  },
  containerScroll: {
    padding: 25,
    marginVertical: 25
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: getResponsiveFontSize(2.5),
    fontWeight: 'bold',
    padding: 22,
    paddingBottom: 18
  },
  containerSection: {
    marginBottom: 25
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
    paddingHorizontal: 10
  },
  optionSectionTitle: {
    fontSize: getResponsiveFontSize(2.4),
    fontWeight: 'bold',
    width: '100%'
  },
  optionTitle: {
    fontSize: getResponsiveFontSize(2.3),
    width: '80%'
  },
  containerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 22
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100
  },
  buttonSave: {
    borderWidth: 1,
    flex: 1
  },
  buttonText: {
    fontSize: getResponsiveFontSize(2.1),
    textAlign: 'center'
  },
  buttonTextSave: {
    fontWeight: 'bold'
  },
  icon: {
    fontSize: getResponsiveFontSize(2.8)
  }
});

export default styles;
