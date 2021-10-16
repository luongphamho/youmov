import React, { forwardRef, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Modal } from '../Modal';
import { TouchableOpacity } from '../../common/TouchableOpacity';
import { Switch } from '../../common/Switch';

import styles from './styles';

const Filter = ({ title, type, selected, onChange }) => {
  const {colors} = useTheme();
  return(
  <View style={styles.containerRow}>
    <Text style={{...styles.optionTitle, color: colors.darkBlue}} numberOfLines={2}>
      {title}
    </Text>
    <Switch
      accessibilityLabel={title}
      value={type === selected}
      onValueChange={() => onChange(type, title)}
    />
  </View>
)};

const FilterModal = forwardRef(
  ({ filter, onVisible, onFilter, style }, ref) => {
    const [filters, setFilters] = useState({
      type: filter.type,
      name: filter.name
    });
    const { type = 'popularity.desc' } = filters;

    const changeValues = (type, name) => {
      setFilters({ type, name });
    };
    const {colors} = useTheme();
    return (
      <Modal ref={ref} onClose={onVisible} style={style}>
        <View style={{...styles.containerModal, backgroundColor: colors.white}}>
          <Text style={{...styles.modalTitle, color: colors.darkBlue}}>Filter</Text>
          <ScrollView>
            <View style={styles.containerScroll}>
              <View style={styles.containerSection}>
                <Text style={{...styles.optionSectionTitle, color: colors.darkBlue}} numberOfLines={2}>
                  Date
                </Text>
                <Filter
                  title="Releases"
                  type="release_date.desc"
                  selected={type}
                  onChange={changeValues}
                />
                <Filter
                  title="Old"
                  type="release_date.asc"
                  selected={type}
                  onChange={changeValues}
                />
              </View>
              <View style={styles.containerSection}>
                <Text style={{...styles.optionSectionTitle, color: colors.darkBlue}} numberOfLines={2}>
                  Popularity
                </Text>
                <Filter
                  title="Most popular"
                  type="popularity.desc"
                  selected={type}
                  onChange={changeValues}
                />
                <Filter
                  title="Less popular"
                  type="popularity.asc"
                  selected={type}
                  onChange={changeValues}
                />
              </View>
              <View>
                <Text style={{...styles.optionSectionTitle, color: colors.darkBlue}} numberOfLines={2}>
                  Revenue
                </Text>
                <Filter
                  title="Higher revenue"
                  type="revenue.desc"
                  selected={type}
                  onChange={changeValues}
                />
                <Filter
                  title="Lowest revenue"
                  type="revenue.asc"
                  selected={type}
                  onChange={changeValues}
                />
              </View>
            </View>
          </ScrollView>
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={[styles.button, styles.buttonSave, {backgroundColor: colors.darkBlue, borderColor: colors.darkBlue}]}
              onPress={() => onFilter(filters)}
            >
              <Text style={[styles.buttonText, styles.buttonTextSave, {color: colors.white}]}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
);

export default FilterModal;
