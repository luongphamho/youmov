import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useContext
} from 'react';
import { View, Text } from 'react-native';
import { Asset } from 'expo-asset';
import { Feather } from '@expo/vector-icons';
import { Assets as StackAssets } from '@react-navigation/stack';
import Screen from '../../components/common/Screen';
import Spinner from '../../components/common/Spinner';
import NotificationCard from '../../components/cards/NotificationCard';
import FilterModal from '../../components/modals/FilterModal';
import MovieListRow from '../../components/cards/rows/MovieListRow';
import MovieRow from '../../components/cards/rows/MovieRow';
import { TouchableOpacity } from '../../components/common/TouchableOpacity';
import firebase from 'firebase/app';
import 'firebase/firestore';
import ThemeContext from '../../components/context/ThemeContext';
import request from '../../services/api';

import { getTodayDate } from '../../utils/dates';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import styles from './styles';

import { AuthenticatedUserContext } from '../../components/context/AuthenticatedUserProvider';
const MovieList = ({ navigation, route, isFavorite }) => {
  // const user = firebase.auth().currentUser;
  const { user } = useContext(AuthenticatedUserContext);
  const db = firebase.firestore();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isError, setIsError] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState({
    type: 'popularity.desc',
    name: t('movieList-filterPopular')
  });
  const [view, setView] = useState({ numColumns: 1, keyGrid: 1 });
  // const [resetPageS, setResetPageS] = useState(null);
  const filterModalRef = useRef(null);

  const { params: { id = null, name = null, typeRequest = 'discover' } = {} } =
    route;

  const getQueryRequest = () => {
    if (typeRequest === 'discover') {
      return id ? { with_genres: `${id}` } : null;
    }

    if (typeRequest === 'search') {
      return { query: `${name.trim()}` };
    }

    return null;
  };

  const requestMoviesList = async (resetPage, filterPage) => {
    try {
      setIsLoading(true);

      const { type } = filterPage || filter;
      const dateRelease = getTodayDate();

      const data = await request(`${typeRequest}/movie`, {
        page: resetPage ? 1 : page + 1,
        'release_date.lte': dateRelease,
        sort_by: type,
        with_release_type: '1|2|3|4|5|6|7',
        ...getQueryRequest()
      });
      // console.log(data);
      setIsLoading(false);
      setIsLoadingMore(false);
      setIsRefresh(false);
      setIsError(false);
      setTotalPages(data.total_pages);
      setPage(data.page);
      // setResetPageS(resetPage)
      // setData(data)
      if (!isFavorite) {
        setResults(resetPage ? data.results : [...results, ...data.results]);
      } else if (isFavorite) {
        const array = data.results.filter(
          (item) => favoriteList.indexOf(item.id) >= 0
        );
        setResults(resetPage ? array : [...results, ...array]);
      }
    } catch (err) {
      setIsLoading(false);
      setIsLoadingMore(false);
      setIsRefresh(false);
      setIsError(true);
    }
  };

  const handleRefresh = async () => {
    await setIsRefresh(true);
    await requestMoviesList(true);
  };

  const handleLoadMore = async () => {
    await setIsLoadingMore(true);
    await requestMoviesList();
  };

  const handleGrid = () => {
    const { numColumns, keyGrid } = view;

    setView({ numColumns: numColumns === 1 ? 2 : 1, keyGrid: keyGrid + 1 });
  };

  const handleFilterModal = () => {
    filterModalRef.current?.open();
  };

  const handleSwitchMovie = async (newFilter) => {
    if (newFilter.type !== filter.type) {
      await setResults([]);
      await setFilter({ type: newFilter.type, name: newFilter.name });
      await requestMoviesList(true, {
        type: newFilter.type,
        name: newFilter.name
      });
    }

    filterModalRef.current?.close();
  };

  const renderItem = (item, type, isSearch, numColumns, navigate) => (
    <MovieRow
      item={item}
      type={type}
      isSearch={isSearch}
      numColumns={numColumns}
      navigate={navigate}
    />
  );

  const renderFooter = () => {
    if (isLoadingMore) return <Spinner size="small" />;

    if (totalPages !== page && results.length > 0) {
      return (
        <View style={styles.loadingMore}>
          <TouchableOpacity
            style={{ ...styles.loadingButton, borderColor: colors.lightGray }}
            onPress={handleLoadMore}
          >
            <Text style={{ ...styles.loadingText, color: colors.darkBlue }}>
              {t('movieList-loadMore')}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (results.length > 0) return <View style={styles.loadingMore} />;

    return null;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.buttonFilter}
          onPress={handleFilterModal}
        >
          <Feather name="filter" size={23} color={colors.darkBlue} />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  useEffect(() => {
    // UseEffect chạy lần đầu, lấy dữ liệu cho favoriteList
    const unsubscribe = db
      .collection('users')
      .doc(user.uid)
      .onSnapshot((query) => {
        return setFavoriteList(query.data().listFav);
      });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    // listen favorite list thay đổi
    (async () => {
      try {
        Asset.loadAsync(StackAssets);
        requestMoviesList();
      } catch (error) {
        requestMoviesList();
      }
    })();
  }, [favoriteList]);

  const { navigate } = navigation;
  const { numColumns, keyGrid } = view;
  if (isFavorite && results.length === 0) {
    // Nếu chưa thêm gì vào danh sách yêu thích. style phần return
    return (
      <Screen>
        <View style={{ ...styles.container, backgroundColor: colors.white }}>
          {isLoading && !isRefresh && !isLoadingMore ? (
            <Spinner />
          ) : isError ? (
            <NotificationCard
              icon="alert-octagon"
              onPress={requestMoviesList}
            />
          ) : (
            <View style={styles.containerList}>
              <View style={styles.containerMainText}>
                <Text
                  style={{ ...styles.textMain, color: colors.darkBlue }}
                  numberOfLines={1}
                >
                  {isFavorite
                    ? t('movieList-favorite')
                    : typeRequest === 'discover'
                    ? filter.name
                    : name}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.buttonGrid,
                    numColumns === 2 && { backgroundColor: colors.lightGray }
                  ]}
                  onPress={handleGrid}
                >
                  <Feather name="grid" size={22} color={colors.darkBlue} />
                </TouchableOpacity>
              </View>
              <MovieListRow
              data={results}
              type="normal"
              isSearch={false}
              keyGrid={keyGrid}
              numColumns={numColumns}
              refreshing={isRefresh}
              onRefresh={handleRefresh}
              ListFooterComponent={renderFooter}
              navigate={navigate}
              renderItem={renderItem}
            />
          </View>
          )}
        </View>
      </Screen>
    );
  }
  // forceUpdate()
  return (
    <Screen>
      <View style={{ ...styles.container, backgroundColor: colors.white }}>
        {isLoading && !isRefresh && !isLoadingMore ? (
          <Spinner />
        ) : isError ? (
          <NotificationCard icon="alert-octagon" onPress={requestMoviesList} />
        ) : results.length === 0 ? (
          <NotificationCard
            icon="thumbs-down"
            textError={t('movieList-textError')}
          />
        ) : (
          <View style={styles.containerList}>
            {results.length > 0 && (
              <View style={styles.containerMainText}>
                <Text
                  style={{ ...styles.textMain, color: colors.darkBlue }}
                  numberOfLines={1}
                >
                  {isFavorite
                    ? t('movieList-favorite')
                    : typeRequest === 'discover'
                    ? filter.name
                    : name}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.buttonGrid,
                    numColumns === 2 && { backgroundColor: colors.lightGray }
                  ]}
                  onPress={handleGrid}
                >
                  <Feather name="grid" size={22} color={colors.darkBlue} />
                </TouchableOpacity>
              </View>
            )}
            <MovieListRow
              data={results}
              type="normal"
              isSearch={false}
              keyGrid={keyGrid}
              numColumns={numColumns}
              refreshing={isRefresh}
              onRefresh={handleRefresh}
              ListFooterComponent={renderFooter}
              navigate={navigate}
              renderItem={renderItem}
            />
          </View>
        )}
        <FilterModal
          ref={filterModalRef}
          filter={filter}
          onVisible={handleFilterModal}
          onFilter={handleSwitchMovie}
          style={styles.bottomModal}
        />
      </View>
    </Screen>
  );
};

export default MovieList;
