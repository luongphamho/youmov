import React, { forwardRef, useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Spinner from '../../common/Spinner';
import NotificationCard from '../../cards/NotificationCard';
import { Modal } from '../Modal';
import { Image } from '../../common/Image';
import { useTranslation } from 'react-i18next';
import request from '../../../services/api';

import { getResponsiveWidth } from '../../../utils/dimensions';
import { getImageApi } from '../../../utils/images';

import styles from './styles';



const WIDTH = getResponsiveWidth(30);
const HEIGHT = getResponsiveWidth(40);

const PersonModal = forwardRef(({ creditId, style, onClose }, ref) => {
  const {t} = useTranslation();
  const UNINFORMED = t("personModal-uninformed");
const INITIAL_INFO = {
  profilePath: '',
  name: `${UNINFORMED} ${t("personModal-name")}`,
  knownForDepartment: `${UNINFORMED} ${t("personModal-department")}`,
  birthday: '',
  placeOfBirth: `${UNINFORMED} ${"personModal-birth"}`,
  biography: UNINFORMED
};
  
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState(INITIAL_INFO);
  const {colors} = useTheme();
  const {
    name,
    profilePath,
    knownForDepartment,
    placeOfBirth,
    biography
  } = info;

  const getAge = () => {
    const { birthday } = info;

    if (birthday) {
      const today = new Date();
      const birthDate = new Date(birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age -= 1;
      return `${age} ${t("personModal-years")}`;
    }

    return `${UNINFORMED} ${t("personModal-age")}`;
  };

  const requestTeamInfo = async () => {
    try {
      if (creditId) {
        setIsLoading(true);

        const data = await request(`person/${parseInt(creditId)}`);

        setIsLoading(false);
        setIsError(false);
        setInfo({
          profilePath: data.profile_path || INITIAL_INFO.profilePath,
          name: data.name || INITIAL_INFO.name,
          knownForDepartment:
            data.known_for_department || INITIAL_INFO.knownForDepartment,
          birthday: data.birthday || INITIAL_INFO.birthday,
          placeOfBirth: data.place_of_birth || INITIAL_INFO.placeOfBirth,
          biography: data.biography || INITIAL_INFO.biography
        });
      }
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    requestTeamInfo();
  }, [creditId]);

  return (
    <Modal ref={ref} style={style} onClose={onClose}>
      <View style={{...styles.containerModal, backgroundColor: colors.white}}>
        {isLoading ? (
          <Spinner style={styles.containerCenter} />
        ) : isError ? (
          <ScrollView style={styles.containerScroll}>
            <NotificationCard icon="alert-octagon" onPress={requestTeamInfo} />
          </ScrollView>
        ) : (
          <ScrollView style={styles.containerScroll}>
            <View style={styles.containerMainText}>
              <Image
                accessibilityLabel={`${name} image`}
                uri={getImageApi(profilePath)}
                width={WIDTH}
                height={HEIGHT}
                style={styles.photo}
              />
              <View style={styles.textItens}>
                <Text style={{...styles.titleName, color: colors.darkBlue}}>{name}</Text>
                <View style={styles.containerTitleMargin}>
                  <Text
                    numberOfLines={2}
                    style={[styles.textSmall, styles.textJustify, {color: colors.blue}]}
                  >
                    {knownForDepartment}
                  </Text>
                </View>
                <View style={styles.containerTitleMargin}>
                  <Text
                    numberOfLines={2}
                    style={[styles.textSmall, styles.textJustify, {color: colors.blue}]}
                  >
                    {getAge()}
                  </Text>
                </View>
                <View style={styles.containerTitleMargin}>
                  <Text
                    numberOfLines={2}
                    style={[styles.textSmall, styles.textJustify, {color: colors.blue}]}
                  >
                    {placeOfBirth}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={{...styles.titleInfo, color: colors.darkBlue}}>{t("personModal-infoTitle")}</Text>
            <Text
              style={[
                styles.textSmall,
                styles.textLineHeight,
                styles.textJustify, {color: colors.blue}
              ]}
            >
              {biography}
            </Text>
          </ScrollView>
        )}
      </View>
    </Modal>
  );
});

export default PersonModal;
