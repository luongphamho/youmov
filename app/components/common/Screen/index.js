import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import styles from './styles';

const Screen = ({ children }) => {
  const {colors, dark} = useTheme();
  return(
  <SafeAreaView style={{...styles.container, backgroundColor: colors.white}}>
    <StatusBar barStyle={dark ? "light-content" : "dark-content"} />
    {children}
  </SafeAreaView>
)};

export default Screen;
