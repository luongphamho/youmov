import React from 'react';
import { ScrollView, Text } from 'react-native';

import SectionRow from '../SectionRow';

import styles from './styles';
import { useTheme } from '@react-navigation/native';
const MainInfoRow = ({ data = {} }) => {
  const {colors} = useTheme();
  return (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.container}
  >
    {Object.keys(data).map((key) => (
      <SectionRow key={key} title={key} hasSubTitle>
        <Text style={{...styles.description,color: colors.blue}}>{data[key]}</Text>
      </SectionRow>
    ))}
  </ScrollView>
)};

export default MainInfoRow;
