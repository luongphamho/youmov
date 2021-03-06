import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from '../../common/TouchableOpacity';

import { getResponsiveWidth } from '../../../utils/dimensions';
import styles from './styles';
import { useTranslation } from 'react-i18next';
const WIDTH = getResponsiveWidth(20);

const NotificationCard = ({
  style = styles.containerError,
  icon = 'alert-octagon',
  onPress = null
}) => { 
  const {t} = useTranslation();
  const textError = t("notificationCard-error")
  const textButton = t("notificationCard-textBtn")
  const { colors } = useTheme();
  return(
  <View style={{...style, backgroundColor: colors.white}}>
    <Feather name={icon} size={WIDTH} color={colors.darkBlue} />
    <Text style={{...styles.errorInfo, color: colors.blue}}>{textError}</Text>
    {onPress && (
      <TouchableOpacity style={{...styles.loadingButton, borderColor: colors.lightGray}} onPress={onPress}>
        <Text style={{...styles.loadingText, color: colors.blue}}>{textButton}</Text>
      </TouchableOpacity>
    )}
  </View>
)};

export default NotificationCard;
