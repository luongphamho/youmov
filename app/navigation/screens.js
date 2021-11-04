import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import MovieList from '../screens/MovieList';
import Configuration from '../screens/Configuration';
import MovieDetails from '../screens/MovieDetails';
import Search from '../screens/Search';
import Favorite from '../screens/Favorite';
import { useTranslation } from 'react-i18next';
import { ROUTES } from './routes';

const screenOptions = {};

const HomeStack = createStackNavigator();
export const MoviesStackScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const TABS = {
    HOME: t("TAB-HOME"),
    SEARCH: t("TAB-SEARCH"),
    FAVORITE: t("TAB-FAVORITE"),
    CONFIGURATION: t("TAB-CONFIGURATION")
  };
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.white
        },
        headerTintColor: colors.darkBlue,
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <HomeStack.Screen
        name={ROUTES.MOVIE_LIST}
        component={MovieList}
        options={{
          title: TABS.HOME
        }}
      />
      <HomeStack.Screen
        name={ROUTES.MOVIE_DETAILS}
        component={MovieDetails}
        options={({ route }) => {
          const { title } = route.params || {};

          return {
            title
          };
        }}
      />
    </HomeStack.Navigator>
  );
};

const SearchStack = createStackNavigator();
export const SearchStackScreen = () => { 
  const { colors } = useTheme();
  const { t } = useTranslation();
  const TABS = {
    HOME: t("TAB-HOME"),
    SEARCH: t("TAB-SEARCH"),
    FAVORITE: t("TAB-FAVORITE"),
    CONFIGURATION: t("TAB-CONFIGURATION")
  };
  // screenOptions = {
  //   headerStyle: {
  //     backgroundColor: colors.white
  //   },
  //   headerTintColor: colors.darkBlue,
  //   headerTitleStyle: {
  //     fontWeight: 'bold'
  //   }
  // }
  return(
  <SearchStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.white
      },
      headerTintColor: colors.darkBlue,
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}
  >
    <SearchStack.Screen
      name={ROUTES.SEARCH}
      component={Search}
      options={{ title: TABS.SEARCH }}
    />
    <SearchStack.Screen
      name={ROUTES.SEARCH_RESULTS}
      component={MovieList}
      options={{ title: 'Search results' }}
    />
    <SearchStack.Screen
      name={ROUTES.MOVIE_DETAILS}
      component={MovieDetails}
      options={({ route }) => {
        const { title } = route.params || {};

        return {
          title
        };
      }}
    />
  </SearchStack.Navigator>
)};

const FavoriteStack = createStackNavigator();
export const FavoriteStackScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const TABS = {
    HOME: t("TAB-HOME"),
    SEARCH: t("TAB-SEARCH"),
    FAVORITE: t("TAB-FAVORITE"),
    CONFIGURATION: t("TAB-CONFIGURATION")
  };
  // screenOptions = {
  //   headerStyle: {
  //     backgroundColor: colors.white
  //   },
  //   headerTintColor: colors.darkBlue,
  //   headerTitleStyle: {
  //     fontWeight: 'bold'
  //   }
  // }
  return(
  <FavoriteStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.white
      },
      headerTintColor: colors.darkBlue,
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}
  >
    <FavoriteStack.Screen
      name={ROUTES.FAVORITE}
      component={Favorite}
      options={{ title: TABS.FAVORITE }}
    />
  </FavoriteStack.Navigator>
)};

const ConfigurationStack = createStackNavigator();
export const ConfigurationStackScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const TABS = {
    HOME: t("TAB-HOME"),
    SEARCH: t("TAB-SEARCH"),
    FAVORITE: t("TAB-FAVORITE"),
    CONFIGURATION: t("TAB-CONFIGURATION")
  };
  // screenOptions = {
  //   headerStyle: {
  //     backgroundColor: colors.white
  //   },
  //   headerTintColor: colors.darkBlue,
  //   headerTitleStyle: {
  //     fontWeight: 'bold'
  //   }
  // }
  return (
  <ConfigurationStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.white
      },
      headerTintColor: colors.darkBlue,
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}
  >
    <ConfigurationStack.Screen
      name={ROUTES.CONFIGURATION}
      component={Configuration}
      options={{ title: TABS.CONFIGURATION }}
    />
  </ConfigurationStack.Navigator>
)};
