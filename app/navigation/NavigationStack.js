import React, { useMemo, useEffect, useState } from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { Host } from 'react-native-portalize';
import { ThemeContext } from '../components/context/ThemeContext';
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import translationsEn from '../components/common/languages/en';
import translationsVn from '../components/common/languages/vn';
import {
  MoviesStackScreen,
  SearchStackScreen,
  ConfigurationStackScreen,
  FavoriteStackScreen
} from './screens';
import { ROUTES } from './routes';

import { CustromDefaultTheme, CustomDarkTheme } from '../utils/colors';
import rootReducer from '../store/reducer/rootReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
enableScreens();

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: translationsEn },
      vi: { translation: translationsVn }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

const AppNavigator = () => {
  const { t } = useTranslation();
  const themeColor = useTheme();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const defaultNavigationOptions = {
    headerShown: false
  };
  const middleware = applyMiddleware(thunk);
  const enhancer = compose(
    middleware // middleware
  );
  const store = createStore(rootReducer, enhancer);
  const ROUTES = {
    MOVIE_LIST: 'MovieList',
    MOVIE_DETAILS: 'MovieDetails',
    SEARCH: 'Search',
    SEARCH_RESULTS: 'SearchResults',
    FAVORITE: 'Favorite',
    CONFIGURATION: 'Configuration'
  };

  const TABS = {
    HOME: t('TAB-HOME'),
    SEARCH: t('TAB-SEARCH'),
    FAVORITE: t('TAB-FAVORITE'),
    CONFIGURATION: t('TAB-CONFIGURATION')
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
  const themeContext = useMemo(
    () => ({
      handleChangeTheme: () => {
        setIsDarkMode((isDarkMode) => !isDarkMode);
      }
    }),
    []
  );
  useEffect(() => {
    (async () => {
      try {
        const language = await AsyncStorage.getItem(
          '@LanguageKey'
        );
        i18n.changeLanguage(language);
      } catch (error) {
        console.log(error)
      }
    })();
  }, [])
  const theme = isDarkMode ? CustomDarkTheme : CustromDefaultTheme;
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default AppNavigator;
