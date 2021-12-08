import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, Modal, Button } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import { ThemeContext } from '../../components/context/ThemeContext';
import { Alert } from '../../components/common/Alert';
import { Share } from '../../components/common/Share';
import Screen from '../../components/common/Screen';
import { TouchableOpacity } from '../../components/common/TouchableOpacity';
import { Switch } from '../../components/common/Switch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import styles from './styles';
import { getImageApi } from '../../utils/images';
import { Image } from '../../components/common/Image';
import { InputField } from '../../components/auth/index';
import { IconButton } from '../../components/auth/';
import { AuthenticatedUserContext } from '../../components/context/AuthenticatedUserProvider';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { color } from 'react-native-reanimated';

const Configuration = () => {
  const { t } = useTranslation();
  const { user } = useContext(AuthenticatedUserContext);
  const db = firebase.firestore();
  const [historyList, setHistoryList] = useState([]);
  const theme = useTheme();
  const { colors } = useTheme();
  const [hasAdultContent, setHasAdultContent] = useState(false);
  const [toggleLanguage, setToggleLanguage] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { handleChangeTheme } = useContext(ThemeContext);
  const [passwordVisibility2, setPasswordVisibility2] = useState(true);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [rightIcon2, setRightIcon2] = useState('eye');
  const [changePasswordError, setChangePasswordError] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };
  const handlePasswordVisibility2 = () => {
    if (rightIcon2 === 'eye') {
      setRightIcon2('eye-off');
      setPasswordVisibility2(!passwordVisibility2);
    } else if (rightIcon2 === 'eye-off') {
      setRightIcon2('eye');
      setPasswordVisibility2(!passwordVisibility2);
    }
  };
  const handleLanguage = async (value) => {
    setToggleLanguage(value);
    if (value === true) {
      await AsyncStorage.setItem('@LanguageKey', 'vi');
      i18n.changeLanguage('vi');
    }
    if (value === false) {
      await AsyncStorage.setItem('@LanguageKey', 'en');
      i18n.changeLanguage('en');
    }
  };

  const handleViewInfo = () => {
    Alert({
      title: t('setting-infoTitle'),
      description:
        t('setting-username') +
        ': ' +
        user.displayName +
        '\n' +
        t('setting-email') +
        ': ' +
        user.email
    });
  };

  const reAuthenticating = (oldPassword) => {
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      oldPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  const handleChangePassword = () => {
    reAuthenticating(oldPassword)
      .then(() => {
        user
          .updatePassword(newPassword)
          .then(() => {
            Alert({
              // title: 'Attention',
              description: t('setting-password-successfull')
            });
            setModalVisible(!modalVisible);
            setOldPassword('');
            setNewPassword('');
          })
          .catch((error) => {
            Alert({
              // title: 'Attention',
              description: error.message
            });
          });
      })
      .catch((error) => {
        Alert({
          // title: 'Attention',
          description: error.message
        });
      });
  };

  const toggleModalPassword = () => {
    setModalVisible(!modalVisible);
  };
  const handleChangeAdultContent = async (value) => {
    try {
      setHasAdultContent(value);
      await AsyncStorage.setItem('@hasAdultContent', JSON.stringify(value));
    } catch (error) {
      showError();
    }
  };

  const showError = () => {
    Alert({
      title: 'Attention',
      description: t('notificationCard-error')
    });
  };

  const handleShare = () => {
    Share({
      message: `${t('setting-shareMessage')} \u{1F37F}`,
      url: 'https://www.themoviedb.org/',
      title: 'AmoCinema',
      dialogTitle: `${t('setting-shareMessage')} \u{1F37F}`
    });
  };

  const handleRating = () => {
    Alert({
      title: 'Attention',
      description: t('setting-rate')
    });
  };
  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('@user');
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };
  const renderModalPassContent = () => {
    return (
      <View style={styles.container2}>
        <View
          style={{
            backgroundColor: '#ffffff',
            margin: 50,
            marginBottom: 150,
            marginTop:150,
            padding: 15,
            borderRadius: 10,
            flex: 1,
          }}
        >
          <Text style={styles.modalTitle}>{t('setting-password-title')}</Text>
          <View style={{marginBottom:20}}>
            <Text>{t('setting-password-oldpass')}</Text>
            <InputField
              inputStyle={{
                fontSize: 14
              }}
              containerStyle={{
                // backgroundColor: '#000000aa',
                marginBottom: 20
              }}
              leftIcon="lock"
              placeholder="Enter password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={passwordVisibility}
              textContentType="password"
              rightIcon={rightIcon}
              value={oldPassword}
              onChangeText={(text) => setOldPassword(text)}
              handlePasswordVisibility={handlePasswordVisibility}
            />
            <Text>{t('setting-password-newpass')}</Text>
            <InputField
              inputStyle={{
                fontSize: 14
              }}
              containerStyle={{
                // backgroundColor: '#000000aa',
                marginBottom: 20
              }}
              leftIcon="lock"
              placeholder="Enter new password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={passwordVisibility2}
              textContentType="password"
              rightIcon={rightIcon2}
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              handlePasswordVisibility={handlePasswordVisibility2}
            />
            <TouchableOpacity
              style={{ ...styles.actions, backgroundColor: '#dc3545' }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.actionText}>
                {t('setting-password-cancel')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ ...styles.actions, backgroundColor: '#28a745' }}
              onPress={() => handleChangePassword()}
            >
              <Text style={styles.actionText}>{t('setting-password-ok')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  useEffect(() => {
    const unsubscribe = db
      .collection('users')
      .doc(user.uid)
      .onSnapshot((query) => setHistoryList(query.data().listHis));
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const Storage = await AsyncStorage.multiGet([
          '@hasAdultContent',
          '@LanguageKey'
        ]);
        if (Storage[1][1] === 'vi') {
          setToggleLanguage(true);
        }
        if (Storage[1][1] === 'en') {
          setToggleLanguage(false);
        }
        setHasAdultContent(JSON.parse(Storage[0][1]));
      } catch (error) {
        showError();
      }
    })();
  }, []);

  return (
    <Screen>
      <ScrollView style={{ backgroundColor: colors.white }}>
        <View style={{ ...styles.container, backgroundColor: colors.white }}>
          <View style={styles.section}>
            <Text
              style={[
                styles.itemText,
                styles.sectionText,
                { color: colors.darkBlue }
              ]}
              numberOfLines={2}
            >
              {t('setting-user')}
            </Text>
            <TouchableOpacity onPress={handleViewInfo}>
              <View
                style={{
                  ...styles.item,
                  backgroundColor: colors.white,
                  borderBottomColor: colors.lightGray
                }}
              >
                <Text
                  style={{ ...styles.itemText, color: colors.darkBlue }}
                  numberOfLines={2}
                >
                  {t('setting-viewInfo')}
                </Text>
                <Feather
                  name="user"
                  size={22}
                  color={colors.darkBlue}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModalPassword}>
              <View
                style={{
                  ...styles.item,
                  backgroundColor: colors.white,
                  borderBottomColor: colors.lightGray
                }}
              >
                <Text
                  style={{ ...styles.itemText, color: colors.darkBlue }}
                  numberOfLines={2}
                >
                  {t('setting-changePassword')}
                </Text>
                <Feather
                  name="lock"
                  size={22}
                  color={colors.darkBlue}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              {renderModalPassContent()}
            </Modal>
          </View>
          <View style={styles.section}>
            <Text
              style={[
                styles.itemText,
                styles.sectionText,
                { color: colors.darkBlue }
              ]}
              numberOfLines={2}
            >
              {t('setting-history')}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {historyList
                .slice(0)
                .reverse()
                .map((item, index) => {
                  // Style banner phim tại đây
                  // mỗi item là backDropPath của phim. Kết hợp với hàm getImageApi sẽ lấy được api phim
                  // getImageApi(item) = {uri:"...api..."
                  // return <Image key={item} style={styles.img} source={url} />;
                  return (
                    <Image
                      key={index}
                      uri={getImageApi(item)}
                      width={50}
                      height={100}
                      style={{
                        padding: 100,
                        margin: 10
                      }}
                    />
                  );
                })}
            </ScrollView>
          </View>
          <View style={styles.section}>
            <Text
              style={[
                styles.itemText,
                styles.sectionText,
                { color: colors.darkBlue }
              ]}
              numberOfLines={2}
            >
              {t('setting-interface')}
            </Text>
            <View
              style={[
                styles.item,
                styles.itemNoBorder,
                {
                  backgroundColor: colors.white,
                  borderBottomColor: colors.lightGray
                }
              ]}
            >
              <Text
                style={{ ...styles.itemText, color: colors.darkBlue }}
                numberOfLines={2}
              >
                {t('setting-adult')}
              </Text>
              <Switch
                accessibilityLabel="Include adult content"
                value={hasAdultContent}
                onValueChange={handleChangeAdultContent}
              />
            </View>
            <View
              style={[
                styles.item,
                styles.itemNoBorder,
                {
                  backgroundColor: colors.white,
                  borderBottomColor: colors.lightGray
                }
              ]}
            >
              <Text
                style={{ ...styles.itemText, color: colors.darkBlue }}
                numberOfLines={2}
              >
                {t('setting-vietnamese')}
              </Text>
              <Switch
                accessibilityLabel="Vietnamese"
                value={toggleLanguage}
                onValueChange={handleLanguage}
              />
            </View>
            <View
              style={[
                styles.item,
                styles.itemNoBorder,
                {
                  backgroundColor: colors.white,
                  borderBottomColor: colors.lightGray
                }
              ]}
            >
              <Text
                style={{ ...styles.itemText, color: colors.darkBlue }}
                numberOfLines={2}
              >
                {t('setting-darkMode')}
              </Text>
              <Switch
                accessibilityLabel="Dark Mode"
                value={theme.dark}
                onValueChange={handleChangeTheme}
              />
            </View>
          </View>
          <View>
            <Text
              style={[
                styles.itemText,
                styles.sectionText,
                { color: colors.darkBlue }
              ]}
              numberOfLines={2}
            >
              {t('setting-app')}
            </Text>
            <TouchableOpacity onPress={handleShare}>
              <View
                style={{
                  ...styles.item,
                  backgroundColor: colors.white,
                  borderBottomColor: colors.lightGray
                }}
              >
                <Text
                  style={{ ...styles.itemText, color: colors.darkBlue }}
                  numberOfLines={2}
                >
                  {t('setting-share')}
                </Text>
                <Feather
                  name="share"
                  size={22}
                  color={colors.darkBlue}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRating}>
              <View
                style={{
                  ...styles.item,
                  backgroundColor: colors.white,
                  borderBottomColor: colors.lightGray
                }}
              >
                <Text
                  style={{ ...styles.itemText, color: colors.darkBlue }}
                  numberOfLines={2}
                >
                  {t('setting-rate')}
                </Text>
                <Feather
                  name="star"
                  size={22}
                  color={colors.darkBlue}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignOut}>
              <View
                style={{
                  ...styles.item,
                  backgroundColor: colors.white,
                  borderBottomColor: colors.lightGray
                }}
              >
                <Text
                  style={{ ...styles.itemText, color: colors.darkBlue }}
                  numberOfLines={2}
                >
                  {t('setting-signout')}
                </Text>
                <IconButton
                  name="logout"
                  size={22}
                  color={colors.darkBlue}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            <View
              style={[
                styles.item,
                styles.itemNoBorder,
                {
                  backgroundColor: colors.white,
                  borderBottomColor: colors.lightGray
                }
              ]}
            >
              <Text
                style={{ ...styles.itemTextVersion, color: colors.blue }}
                numberOfLines={2}
              >
                {t('setting-version')} {Constants.manifest.version}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default Configuration;
