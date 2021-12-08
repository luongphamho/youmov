import { StyleSheet } from 'react-native';

import { getResponsiveFontSize } from '../../utils/dimensions';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 25
  },
  modalTitle :{
    fontWeight:"bold",
    fontSize:18,
    padding:15,
    color:"#000"
  },
  actions:{
    borderRadius:5,
    marginHorizontal:10,
    paddingVertical:10,
    paddingHorizontal:20,
    marginBottom:20
  },
  actionText:{
    color:"#fff"
  },
  section: {
    marginBottom: 40
  },
  sectionText: {
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: getResponsiveFontSize(3)
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 25,
    paddingBottom: 25,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: getResponsiveFontSize(2.5),
    width: '80%'
  },
  itemTextVersion: {
    fontSize: getResponsiveFontSize(2.5),
  },
  itemNoBorder: {
    borderBottomWidth: 0
  },
  icon: {
    marginRight: 5
  },
  img: {
    width:50,
    maxHeight:100
  },
  container2: {
    flex: 1,
    backgroundColor: '#000000aa'
  },
});

export default styles;
