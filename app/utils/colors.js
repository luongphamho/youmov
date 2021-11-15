// export const defaultWhite = '#ffffff';
// export const defaultDarkBlue = '#47525e';
// export const defaultWhite = '#ffffff';
// export const defaultDarkBlue = '#47525e';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
export const CustromDefaultTheme = {
  dark: false,
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    white: '#ffffff',
    freeze: '#f6f6f6',
    gray: '#e9e9e9',
    lightGray: '#f0f0f0',
    darkGray: '#a1.a1a4',
    blue: '#8190a5',
    darkBlue: '#47525e',
    pink: '#f95f62',
    lightRed: '#ff7f7f',
    lightYellow: '#eab079',
    lightGreen: '#82c596',
  }
};
export const CustomDarkTheme = {
  dark: true,
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    white: '#121212',
    freeze: '#f6f6f6',
    gray: '#e9e9e9',
    lightGray: '#f0f0f0',
    darkGray: '#a1.a1a4',
    blue: '#8190a5',
    darkBlue: '#F6F6F6',
    pink: '#f95f62',
    lightRed: '#ff7f7f',
    lightYellow: '#eab079',
    lightGreen: '#82c596',
  }
};