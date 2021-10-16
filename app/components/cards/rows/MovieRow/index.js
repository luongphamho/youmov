import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from '../../../common/TouchableOpacity';
import { Image } from '../../../common/Image';

import { getResponsiveWidth } from '../../../../utils/dimensions';
import { getImageApi } from '../../../../utils/images';
import { convertToUpperCaseFirstLetter } from '../../../../utils/letters';
import { convertToYear } from '../../../../utils/dates';
import { convertTypeWithGenre } from '../../../../utils/genre';

import { ROUTES } from '../../../../navigation/routes';

import isoLanguage from '../../../../data/iso.json';

import styles from './styles';

const WIDTH = getResponsiveWidth(30);
const HEIGHT = getResponsiveWidth(40);

const getLanguage = (value) => {
  const str = isoLanguage[value] || '';

  return convertToUpperCaseFirstLetter(str);
};

const renderDivider = (releaseDate, originalLanguage) =>
{
  const {colors} = useTheme();
  return releaseDate && originalLanguage !== 'xx' ? (
    <Text style={{...styles.trace, color: colors.blue}}>|</Text>
  ) : null;
}


const renderScore = (voteAverage) => {
  const {colors} = useTheme();
  const colorRate =
    voteAverage < 5
      ? {backgroundColor: colors.lightRed}
      : voteAverage >= 5 && voteAverage < 7
      ? {backgroundColor: colors.lightYellow}
      : {backgroundColor: colors.lightGreen};

  return (
    <View style={[styles.score, colorRate]}>
      <Text style={{...styles.textPercent, color: colors.white}}>{voteAverage}</Text>
    </View>
  );
};

const MovieRow = memo(
  ({ numColumns, item, type, isSearch, navigate }) => {
    const {colors} = useTheme();
    return(
    <>
      {numColumns === 1 ? (
        <TouchableOpacity
          onPress={() =>
            navigate(ROUTES.MOVIE_DETAILS, { id: item.id, title: item.title })
          }
        >
          <View style={styles.containerItem}>
            <Image
              accessibilityRole="imagebutton"
              accessibilityLabel={`${item.title} image`}
              uri={getImageApi(item.poster_path)}
              width={WIDTH}
              height={HEIGHT}
              style={styles.photo}
            />
            <View style={styles.item}>
              <View>
                <Text numberOfLines={2} style={{...styles.textTitle, color: colors.darkBlue,}}>
                  {item.title}
                </Text>
                <View style={[styles.textRow, styles.containerSubTitle]}>
                  <Text style={{...styles.textSmall, color: colors.blue}}>
                    {convertToYear(item.release_date)}
                  </Text>
                  {renderDivider(item.release_date, item.original_language)}
                  <Text numberOfLines={1} style={{...styles.textSmall, color: colors.blue}}>
                    {getLanguage(item.original_language)}
                  </Text>
                </View>
                <Text numberOfLines={1} style={{...styles.textSmall, color: colors.blue}}>
                  {convertTypeWithGenre(item.genre_ids, type, isSearch)}
                </Text>
              </View>
              <View style={[styles.textRow, styles.containerReview]}>
                {renderScore(item.vote_average)}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.containerTwoItem}
          onPress={() =>
            navigate(ROUTES.MOVIE_DETAILS, { id: item.id, title: item.title })
          }
        >
          <View>
            <Image
              accessibilityRole="imagebutton"
              accessibilityLabel={`${item.title} image`}
              uri={getImageApi(item.poster_path)}
              style={styles.photo}
              width={WIDTH}
              height={HEIGHT}
            />
          </View>
          <Text numberOfLines={2} style={{...styles.textTwoTitle, color: colors.darkBlue}}>
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
    </>
  )},
  (prevProps, nextProps) => prevProps.item.id === nextProps.item.id
);

export default MovieRow;
