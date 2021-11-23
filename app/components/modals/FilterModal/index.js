import React, { forwardRef, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Modal } from '../Modal';
import { TouchableOpacity } from '../../common/TouchableOpacity';
import { Switch } from '../../common/Switch';
import { useTranslation } from 'react-i18next';
import styles from './styles';

const Filter = ({ title, type, selected, onChange }) => {
  const {t} = useTranslation();
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
    const {t} = useTranslation();
    return (
      <Modal ref={ref} onClose={onVisible} style={style}>
        <View style={{...styles.containerModal, backgroundColor: colors.white}}>
          <Text style={{...styles.modalTitle, color: colors.darkBlue}}>{t("filterModal-title")}</Text>
          <ScrollView>
            <View style={styles.containerScroll}>
              <View style={styles.containerSection}>
                <Text style={{...styles.optionSectionTitle, color: colors.darkBlue}} numberOfLines={2}>
                  {t("filterModal-date")}
                </Text>
                <Filter
                  title={t("filterModal-date-releases")}
                  type="release_date.desc"
                  selected={type}
                  onChange={changeValues}
                />
                <Filter
                  title={t("filterModal-date-old")}
                  type="release_date.asc"
                  selected={type}
                  onChange={changeValues}
                />
              </View>
              <View style={styles.containerSection}>
                <Text style={{...styles.optionSectionTitle, color: colors.darkBlue}} numberOfLines={2}>
                  {t("filterModal-optionTitle-populary")}
                </Text>
                <Filter
                  title={t("filterModal-optionTitle-most")}
                  type="popularity.desc"
                  selected={type}
                  onChange={changeValues}
                />
                <Filter
                  title={t("filterModal-optionTitle-less")}
                  type="popularity.asc"
                  selected={type}
                  onChange={changeValues}
                />
              </View>
              <View>
                <Text style={{...styles.optionSectionTitle, color: colors.darkBlue}} numberOfLines={2}>
                  {t("filterModal-optionTitle-revenue")}
                </Text>
                <Filter
                  title={t("filterModal-optionTitle-hight")}
                  type="revenue.desc"
                  selected={type}
                  onChange={changeValues}
                />
                <Filter
                  title={t("filterModal-optionTitle-low")}
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
                {t("filterModal-optionTitle-btnText")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
);

export default FilterModal;
