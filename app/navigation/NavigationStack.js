import React, { useMemo } from 'react';
import { enableScreens } from 'react-native-screens';
import {
  NavigationContainer,
  useTheme
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { Host } from 'react-native-portalize';
import { ThemeContext } from '../components/context/ThemeContext';

import {
  MoviesStackScreen,
  SearchStackScreen,
  ConfigurationStackScreen,
  FavoriteStackScreen
} from './screens';
import { ROUTES, TABS } from './routes';

import {
  CustromDefaultTheme,
  CustomDarkTheme
} from '../utils/colors';

enableScreens();


const AppNavigator = () => {
  const themeColor = useTheme();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const defaultNavigationOptions = {
    headerShown: false
  };
  
  const Tab = createBottomTabNavigator();
  const TabsConfig = {
    tabBarOptions: {
      activeTintColor: themeColor.colors.pink,
      inactiveTintColor: themeColor.colors.blue,
      labelStyle: {
        margin: 0,
        padding: 1
      },
      style: {
        backgroundColor: themeColor.colors.white //"#121212"
      }
    }
  };
  const themeContext = useMemo(() => ({
  handleChangeTheme: () => {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }
}),[]);
  const theme = isDarkMode ? CustomDarkTheme : CustromDefaultTheme;
  return (
    <ThemeContext.Provider value={themeContext}>
      <NavigationContainer theme={theme}>
        <Host>
          <Tab.Navigator initialRouteName={ROUTES.MOVIE_LIST} {...TabsConfig}>
            <Tab.Screen
              name={TABS.HOME}
              component={MoviesStackScreen}
              options={{
                ...defaultNavigationOptions,
                tabBarIcon: ({ color }) => (
                  <Feather name="home" size={20} color={color} />
                )
              }}
            />
            <Tab.Screen
              name={TABS.SEARCH}
              component={SearchStackScreen}
              options={{
                ...defaultNavigationOptions,
                tabBarIcon: ({ color }) => (
                  <Feather name="search" size={20} color={color} />
                )
              }}
            />
            <Tab.Screen
              name={TABS.FAVORITE}
              component={FavoriteStackScreen}
              options={{
                ...defaultNavigationOptions,
                tabBarIcon: ({ color }) => (
                  <Feather name="heart" size={20} color={color} />
                )
              }}
            />
            <Tab.Screen
              name={TABS.CONFIGURATION}
              component={ConfigurationStackScreen}
              options={{
                ...defaultNavigationOptions,
                tabBarIcon: ({ color }) => (
                  <Feather name="settings" size={20} color={color} />
                )
              }}
            />
          </Tab.Navigator>
        </Host>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

export default AppNavigator;
