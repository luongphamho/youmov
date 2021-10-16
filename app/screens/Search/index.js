import React from 'react';
import { ScrollView, View, Text } from 'react-native';

import Screen from '../../components/common/Screen';
import InputSearch from '../../components/common/InputSearch';
import { TouchableOpacity } from '../../components/common/TouchableOpacity';

import { ROUTES } from '../../navigation/routes';

import genres from '../../data/genres.json';

import styles from './styles';
import { useTheme } from '@react-navigation/native';

const Search = ({ navigation }) => {
  const { navigate } = navigation;
  const {colors} = useTheme()
  const handleSearch = (id) => {
    navigate(ROUTES.SEARCH_RESULTS, {
      typeRequest: 'discover',
      name: genres[id].name,
      id
    });
  };

  return (
    <Screen>
      <View style={{...styles.container, backgroundColor: colors.white}}>
        <InputSearch navigate={navigate} />
        <ScrollView style={styles.containerList}>
          {Object.keys(genres).map((id) => (
            <TouchableOpacity
              key={id}
              style={styles.item}
              onPress={() => handleSearch(id)}
            >
              <Text style={{...styles.itemText, color:colors.darkBlue}}>{genres[id].name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Screen>
  );
};

export default Search;
