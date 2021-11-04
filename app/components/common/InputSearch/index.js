import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from '../TouchableOpacity';

import { ROUTES } from '../../../navigation/routes';

import { useTranslation } from 'react-i18next';
import styles from './styles';

const InputSearch = ({ navigate }) => {
  const {t} = useTranslation();
  const [search, setSearch] = useState('');
  const {colors} = useTheme();
  const onChangeSearch = value => {
    setSearch(value);
  };

  const handleClearSearch = () => {
    setSearch('');
  };

  const handleSubmit = () => {
    if (search) {
      navigate(ROUTES.SEARCH_RESULTS, {
        typeRequest: 'search',
        name: search
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{...styles.containerInput, backgroundColor: colors.freeze}}>
        <View style={styles.inputDirection}>
          <Feather
            style={styles.icon}
            name="search"
            size={20}
            color={colors.darkGray}
          />
          <TextInput
            style={{...styles.textInput, color: colors.darkBlue}}
            onSubmitEditing={handleSubmit}
            onChangeText={value => onChangeSearch(value)}
            value={search}
            accessibilityRole="search"
            returnKeyType="search"
            keyboardType="default"
            blurOnSubmit
            multiline={false}
            autoCorrect={false}
            underlineColorAndroid="transparent"
            placeholderTextColor={colors.darkGray}
            placeholder= {t("inputSearch-search")}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch}>
              <Feather
                style={styles.icon}
                name="x"
                size={20}
                color={colors.darkGray}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default InputSearch;
