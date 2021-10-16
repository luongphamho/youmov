import React from 'react';
import { Platform, ActivityIndicator, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

const Spinner = ({ style = {}, size = 50 }) => {
  const {colors} = useTheme();
  return(
  <View style={style}>
    {Platform.OS === 'ios' ? (
      <ActivityIndicator
        testID="activity-indicator"
        size="small"
        color={colors.darkBlue}
      />
    ) : (
      <ActivityIndicator
        testID="activity-indicator"
        size={size}
        color={colors.darkBlue}
      />
    )}
  </View>
)};

export default Spinner;
