import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import { ThemeContext } from '../../components/context/ThemeContext';
import { Alert } from '../../components/common/Alert';
import { Share } from '../../components/common/Share';
import Screen from '../../components/common/Screen';
import { TouchableOpacity } from '../../components/common/TouchableOpacity';
import { Switch } from '../../components/common/Switch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import styles from './styles';

const Configuration = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { colors } = useTheme();
  const [hasAdultContent, setHasAdultContent] = useState(false);
  const [toggleLanguage, setToggleLanguage] = useState(false);
  const { handleChangeTheme } = useContext(ThemeContext);
  const handleLanguage = async (value) => {
    setToggleLanguage(value);
    if (value === true) {
      await AsyncStorage.setItem('@LanguageKey', 'vi');
      i18n.changeLanguage('vi');
    }
    if (value === false) {
      await AsyncStorage.setItem('@LanguageKey', 'en');
      i18n.changeLanguage('en');
    }
  };

  const handleChangeAdultContent = async (value) => {
    try {
      setHasAdultContent(value);
      await AsyncStorage.setItem('@hasAdultContent', JSON.stringify(value));
    } catch (error) {
      showError();
    }
  };

  const showError = () => {
    Alert({
      title: 'Attention',
      description: t('notificationCard-error')
    });
  };

  const handleShare = () => {
    Share({
      message: `${t('setting-shareMessage')} \u{1F37F}`,
      url: 'https://www.themoviedb.org/',
      title: 'AmoCinema',
      dialogTitle: `${t('setting-shareMessage')} \u{1F37F}`
    });
  };

  const handleRating = () => {
    Alert({
      title: 'Attention',
      description: t('setting-rate')
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const Storage = await AsyncStorage.multiGet([
          '@hasAdultContent',
          '@LanguageKey'
        ]);
        if (Storage[1][1] === 'vi') {
          setToggleLanguage(true);
        }
        if (Storage[1][1] === 'en') {
          setToggleLanguage(false);
        }
        setHasAdultContent(JSON.parse(Storage[0][1]));
      } catch (error) {
        showError();
      }
    })();
  }, [hasAdultContent]);

  return (
    <Screen>
      <ScrollView style={{ backgroundColor: colors.white }}>
        <View style={{ ...styles.container, backgroundColor: colors.white }}>
          <View style={styles.section}>
            <Text
              style={[
                styles.itemText,
                styles.sectionText,
                { color: colors.darkBlue }
              ]}
              numberOfLines={2}
            >
              {t('setting-interface')}
            </Text>
            <View
              style={[
                styles.item,
                styles.itemNoBorder,
                {
                  backgroundColor: colors.white,
                  borderBottomColor: colors.lightGray
                }
              ]}
            >
              <Text
                style={{ ...styles.itemText, color: colors.darkBlue }}
                numberOfLines={2}
              >
                {t('setting-adult')}
              </Text>
              <Switch
                accessibilityLabel="Include adult content"
                value={hasAdultContent}
                onValueChange={handleChangeAdultContent}
              />
            </View>
            <View
              style={[
                styles.item,
                styles.itemNoBorder,
                {
                  backgroundColor: colors.white,
                  borderBottomColor: colors.lightGray
                }
              ]}
            >
              <Text
                style={{ ...styles.itemText, color: colors.darkBlue }}
                numberOfLines={2}
              >
                {t('setting-vietnamese')}
              </Text>
              <Switch
                accessibilityLabel="Vietnamese"
                value={toggleLanguage}
                onValueChange={handleLanguage}
              />
            </View>
            <View
              style={[
                styles.item,
                styles.itemNoBorder,
                {
                  backgroundColor: colors.white,
                  borderBottomColor: colors.lightGray
                }
              ]}
            >
              <Text
                style={{ ...styles.itemText, color: colors.darkBlue }}
                numberOfLines={2}
              >
                {t('setting-darkMode')}
              </Text>
              <Switch
                accessibilityLabel="Dark Mode"
                value={theme.dark}
                onValueChange={handleChangeTheme}
              />
            </View>
          </View>
          <View>
            <Text
              style={[
                styles.itemText,
                styles.sectionText,
                { color: colors.darkBlue }
              ]}
              numberOfLines={2}
            >
              {t('setting-app')}
            </Text>
            <TouchableOpacity onPress={handleShare}>
              <View
                style={{
                  ...styles.item,
                  backgroundColor: colors.white,
                  borderBottomColor: colors.lightGray
                }}
              >
                <Text
                  style={{ ...styles.itemText, color: colors.darkBlue }}
                  numberOfLines={2}
                >
                  {t('setting-share')}
                </Text>
                <Feather
                  name="share"
                  size={22}
                  color={colors.darkBlue}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRating}>
              <View
                style={{
                  ...styles.item,
                  backgroundColor: colors.white,
                  borderBottomColor: colors.lightGray
                }}
              >
                <Text
                  style={{ ...styles.itemText, color: colors.darkBlue }}
                  numberOfLines={2}
                >
                  {t('setting-rate')}
                </Text>
                <Feather
                  name="star"
                  size={22}
                  color={colors.darkBlue}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            <View
              style={[
                styles.item,
                styles.itemNoBorder,
                {
                  backgroundColor: colors.white,
                  borderBottomColor: colors.lightGray
                }
              ]}
            >
              <Text
                style={{ ...styles.itemTextVersion, color: colors.blue }}
                numberOfLines={2}
              >
                {t('setting-version')} {Constants.manifest.version}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default Configuration;
