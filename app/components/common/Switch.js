import React from 'react';
import { Switch } from 'react-native';
import { useTheme } from '@react-navigation/native';


const SwitchCustom = ({
  accessibilityLabel = '',
  value = false,
  onValueChange = () => null,
}) => {
  const {colors} = useTheme();
  return(
  <Switch
    accessibilityLabel={accessibilityLabel}
    accessibilityRole="switch"
    value={value}
    onValueChange={onValueChange}
    trackColor={{ false: colors.gray, true: colors.darkBlue }}
  />
)};

export { SwitchCustom as Switch };
