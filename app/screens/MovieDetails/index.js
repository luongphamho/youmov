import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import ReadMore from 'react-native-read-more-text';
import { Feather } from '@expo/vector-icons';

import { Alert } from '../../components/common/Alert';
import { Share } from '../../components/common/Share';
import Screen from '../../components/common/Screen';
import Spinner from '../../components/common/Spinner';
import NotificationCard from '../../components/cards/NotificationCard';
import PosterRow from '../../components/cards/rows/PosterRow';
import PersonModal from '../../components/modals/PersonModal';
import PersonListRow from '../../components/cards/rows/PersonListRow';
import PersonRow from '../../components/cards/rows/PersonRow';
import SectionRow from '../../components/cards/rows/SectionRow';
import MainInfoRow from '../../components/cards/rows/MainInfoRow';
import { TouchableOpacity } from '../../components/common/TouchableOpacity';

import request from '../../services/api';

import { getImageApi } from '../../utils/images';
import { convertMinsToHrsMins } from '../../utils/time';
import { convertToUpperCaseFirstLetter } from '../../utils/letters';
import { convertToDate } from '../../utils/dates';
import { convertToDolar } from '../../utils/currency';
import { convertToGenres } from '../../utils/genre';
import { sliceArrayLength } from '../../utils/array';

import isoLanguage from '../../data/iso.json';


import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import styles from './styles';

const UNINFORMED = 'Uninformed';
const INITIAL_INFO = {
  id: '',
  backdropPath: '',
  title: '',
  voteAverage: 0,
  video: [],
  overview: UNINFORMED,
  cast: [],
  crew: [],
  productionCompanies: [],
  images: [],
  infosDetail: {
    Duration: UNINFORMED,
    Genre: UNINFORMED,
    Language: UNINFORMED,
    Release: UNINFORMED,
    Budget: UNINFORMED,
    Revenue: UNINFORMED,
    Adult: UNINFORMED
  }
};
const ADULT_RATE = {
  true: 'No',
  false: 'Yes'
};

const renderReadMoreFooter = (text, handlePress) => { 
  // const {colors} = useTheme()
  return(
  <TouchableOpacity onPress={handlePress}>
    <Text style={{...styles.readMore, color: "#f95f62"}}>{text}</Text>
  </TouchableOpacity>
)};

const MovieDetails = ({ navigation, route }) => {
  const {t} = useTranslation();
  const {colors} = useTheme()
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [creditId, setCreditId] = useState(null);
  const [info, setInfo] = useState(INITIAL_INFO);
  const personModalRef = useRef(null);

  const getInfosDetail = ({
    runtime = 0,
    genres = '',
    original_language = '',
    release_date = '',
    budget = 0,
    revenue = 0,
    adult = ''
  }) => ({
    Duration: convertMinsToHrsMins(runtime),
    Genre: convertToGenres(sliceArrayLength(genres, 2)),
    Language: convertToUpperCaseFirstLetter(isoLanguage[original_language]),
    Release: convertToDate(release_date),
    Budget: convertToDolar(budget),
    Revenue: convertToDolar(revenue),
    Adult: ADULT_RATE[adult] || UNINFORMED
  });
  /* eslint-enable camelcase */

  const formatImageUrl = (images) =>
    sliceArrayLength(images, 15).map((item) =>
      getImageApi(item.file_path, 'uri', 'original')
    );

  const handlePersonModal = () => {
    personModalRef.current?.open();
  };

  const handlePerson = (id) => {
    setCreditId(id);
    handlePersonModal();
  };

  const handleImage = () => {
    setShowImage(!showImage);
  };

  const handleShare = (title, id) => {
    if (isError) {
      Alert({
        title: 'Attention',
        description: t("notificationCard-error")
      });
    } else {
      Share({
        message: `${title}, know everything about this movie \u{1F37F}`,
        url: `https://www.themoviedb.org/movie/${id}`,
        title: 'YouMov',
        dialogTitle: `${title}, know everything about this movie \u{1F37F}`
      });
    }
  };

  const requestMoviesInfo = async () => {
    try {
      setIsLoading(true);

      const { id } = route.params;
      console.log(id)
      const data = await request(`movie/${id}`, {
        include_image_language: 'en,null',
        append_to_response: 'credits,videos,images'
      });
      // console.log(data)
      setIsLoading(false);
      setIsError(false);
      setInfo({
        id,
        backdropPath: data.backdrop_path || INITIAL_INFO.backdropPath,
        title: data.title || INITIAL_INFO.title,
        voteAverage: data.vote_average || INITIAL_INFO.voteAverage,
        video: data.videos.results[0] || INITIAL_INFO.video,
        overview: data.overview || INITIAL_INFO.overview,
        cast: sliceArrayLength(data.credits.cast, 15),
        crew: sliceArrayLength(data.credits.crew, 15),
        productionCompanies: sliceArrayLength(data.production_companies, 10),
        images: formatImageUrl(data.images.backdrops),
        infosDetail: getInfosDetail(data)
      });
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  const renderItem = (item, type, handleTeamDetail) => (
    <PersonRow item={item} type={type} onTeamDetail={handleTeamDetail} />
  );

  const renderListEmpty = (colors) => (
    <View>
      <Text style={{...styles.subTitleInfo, color: colors.blue,}}>{t("personModal-uninformed")}</Text>
    </View>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.buttonShare}
          onPress={() => handleShare(route.params.title, route.params.id)}
        >
          <Feather name="share" size={23} color={colors.darkBlue} />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  useEffect(() => {
    requestMoviesInfo();
  }, []);

  {
    const {
      backdropPath,
      voteAverage,
      video,
      title,
      infosDetail,
      overview,
      cast,
      crew,
      productionCompanies,
      images
    } = info;

    return (
      <Screen>
        <View style={{...styles.container, backgroundColor: colors.white}}>
          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <NotificationCard
              icon="alert-octagon"
              onPress={requestMoviesInfo}
            />
          ) : (
            <ScrollView>
              <PosterRow
                title={title}
                backdropPath={backdropPath}
                voteAverage={voteAverage}
                images={images}
                video={video}
                showImage={showImage}
                onPress={handleImage}
              />
              <View style={styles.containerMovieInfo}>
                <MainInfoRow data={infosDetail} />
                <SectionRow title="Synopsis">
                  <ReadMore
                    numberOfLines={3}
                    renderTruncatedFooter={(handlePress) =>
                      renderReadMoreFooter(t("movieDetails-readMore"), handlePress)
                    }
                    renderRevealedFooter={(handlePress) =>
                      renderReadMoreFooter(t("movieDetails-readLess"), handlePress)
                    }
                  >
                    <Text style={{...styles.subTitleInfo, color: colors.blue,}}>{overview}</Text>
                  </ReadMore>
                </SectionRow>
                <SectionRow title={t("movieDetails-mainCast")}>
                  <PersonListRow
                    data={cast}
                    type="character"
                    keyItem="creditId"
                    ListEmptyComponent={renderListEmpty}
                    onTeamDetail={handlePerson}
                    renderItem={renderItem}
                  />
                </SectionRow>
                <SectionRow title={t("movieDetails-mainTech")}>
                  <PersonListRow
                    data={crew}
                    type="job"
                    keyItem="creditId"
                    ListEmptyComponent={renderListEmpty}
                    onTeamDetail={handlePerson}
                    renderItem={renderItem}
                  />
                </SectionRow>
                <SectionRow title={t("movieDetails-producer")} isLast>
                  <PersonListRow
                    data={productionCompanies}
                    type="production"
                    keyItem="id"
                    ListEmptyComponent={renderListEmpty}
                    onTeamDetail={handlePerson}
                    renderItem={renderItem}
                  />
                </SectionRow>
              </View>
            </ScrollView>
          )}
          <PersonModal
            ref={personModalRef}
            creditId={creditId}
            style={styles.bottomModal}
            onClose={handlePersonModal}
          />
        </View>
      </Screen>
    );
  }
};

export default MovieDetails;
