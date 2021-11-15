import React, { useContext, useEffect, useState, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';

import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../components/context/AuthenticatedUserProvider';
import AuthStack from './AuthStack';
import NavigationStack from './NavigationStack';

import { CustromDefaultTheme, CustomDarkTheme } from '../utils/colors';

import { Host } from 'react-native-portalize';
import { ThemeContext } from '../components/context/ThemeContext';

const auth = Firebase.auth();

export default function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const theme = isDarkMode ? CustomDarkTheme : CustromDefaultTheme;
  const themeContext = useMemo(
    () => ({
      handleChangeTheme: () => {
        setIsDarkMode((isDarkMode) => !isDarkMode);
      },
      // theme:theme
    }),
    []
  );

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(
      async (authenticatedUser) => {
        try {
          await (authenticatedUser
            ? setUser(authenticatedUser)
            : setUser(null));
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  
  return (
      <ThemeContext.Provider value={themeContext}>
        <NavigationContainer theme={theme}>
          <Host>{user ? <NavigationStack /> : <AuthStack />}</Host>
        </NavigationContainer>
      </ThemeContext.Provider>
  );
}
