import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import styles from './styles';

const SectionRow = ({
  title = '',
  isLast = false,
  hasSubTitle = false,
  children = null
}) => { 
  const {colors} = useTheme();
  return(
  <View
    style={[
      !hasSubTitle && styles.container,
      isLast && styles.containerLast,
      hasSubTitle && styles.containerSubTitle
    ]}
  >
    <Text style={{...styles.title, color: colors.darkBlue}}>{title}</Text>
    {children}
  </View>
)};

export default SectionRow;
