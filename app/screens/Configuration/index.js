import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import {ThemeContext} from '../../components/context/ThemeContext'

import { Alert } from '../../components/common/Alert';
import { Share } from '../../components/common/Share';
import Screen from '../../components/common/Screen';
import { TouchableOpacity } from '../../components/common/TouchableOpacity';
import { Switch } from '../../components/common/Switch';

import { getItem, setItem } from '../../utils/asyncStorage';


import styles from './styles';

const Configuration = () => {
  const theme = useTheme();
  const {colors} = useTheme()
  const [hasAdultContent, setHasAdultContent] = useState(false);
  const {handleChangeTheme} = useContext(ThemeContext);
  // console.log(i)
  const showError = () => {
    Alert({
      title: 'Attention',
      description: 'Something wrong has happened, please try again later.'
    });
  };

  const handleChangeAdultContent = async (value) => {
    try {
      setHasAdultContent(value);
      await setItem('@ConfigKey', `{"hasAdultContent": ${value}}`);
    } catch (error) {
      showError();
    }
  };
  const handleShare = () => {
    Share({
      message: 'Learn all about movies and series \u{1F37F}',
      url: 'https://www.themoviedb.org/',
      title: 'AmoCinema',
      dialogTitle: 'Learn all about movies and series \u{1F37F}'
    });
  };

  const handleRating = () => {
    Alert({
      title: 'Attention',
      description:
        'Nothing happens now. In the future you will be redirected to store.'
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const adultContentStorage = await getItem(
          '@ConfigKey',
          'hasAdultContent'
        );

        setHasAdultContent(adultContentStorage);
      } catch (error) {
        showError();
      }
    })();
  }, [hasAdultContent]);

  return (
    <Screen>
      <ScrollView style={{backgroundColor: colors.white}}>
        <View style={{...styles.container, backgroundColor: colors.white}}>
          <View style={styles.section}>
            <Text
              style={[styles.itemText, styles.sectionText, {color: colors.darkBlue}]}
              numberOfLines={2}
            >
              Interface
            </Text>
            <View style={[styles.item, styles.itemNoBorder, {backgroundColor: colors.white, borderBottomColor: colors.lightGray}]}>
              <Text style={{...styles.itemText, color: colors.darkBlue}} numberOfLines={2}>
                Include adult content
              </Text>
              <Switch
                accessibilityLabel="Include adult content"
                value={hasAdultContent}
                onValueChange={handleChangeAdultContent}
              />
            </View>
            <View style={[styles.item, styles.itemNoBorder, {backgroundColor: colors.white, borderBottomColor: colors.lightGray}]}>
              <Text style={{...styles.itemText, color: colors.darkBlue}} numberOfLines={2}>
                Vietnamese
              </Text>
              <Switch
                accessibilityLabel="Include adult content"
                value={hasAdultContent}
                onValueChange={handleChangeAdultContent}
              />
            </View>
            <View style={[styles.item, styles.itemNoBorder, {backgroundColor: colors.white, borderBottomColor: colors.lightGray}]}>
              <Text style={{...styles.itemText, color: colors.darkBlue}} numberOfLines={2}>
                Dark Mode
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
              style={[styles.itemText, styles.sectionText, {color: colors.darkBlue}]}
              numberOfLines={2}
            >
              Application
            </Text>
            <TouchableOpacity onPress={handleShare}>
              <View style={{...styles.item, backgroundColor: colors.white, borderBottomColor: colors.lightGray}}>
                <Text style={{...styles.itemText, color: colors.darkBlue}} numberOfLines={2}>
                  Tell a friend
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
              <View style={{...styles.item, backgroundColor: colors.white, borderBottomColor: colors.lightGray}}>
                <Text style={{...styles.itemText, color: colors.darkBlue}} numberOfLines={2}>
                  Rate the app
                </Text>
                <Feather
                  name="star"
                  size={22}
                  color={colors.darkBlue}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            <View style={[styles.item, styles.itemNoBorder, {backgroundColor: colors.white, borderBottomColor: colors.lightGray}]}>
              <Text style={{...styles.itemTextVersion, color: colors.blue}} numberOfLines={2}>
                Version {Constants.manifest.version}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default Configuration;
