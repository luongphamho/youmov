import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, InputField, ErrorMessage } from '../../components/auth/index';
import Firebase from '../../config/firebase';

const auth = Firebase.auth();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };
  const image = {uri : "https://github.com/khanhhung142/Group6/blob/master/src/pages/Auth/images/backapp.jpg?raw=true"};
  const onLogin = async () => {
    setLoginError('')
    try {
      if (email !== '' && password !== '') {
        await AsyncStorage.setItem('@user', email);
        await auth.signInWithEmailAndPassword(email, password);
        
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };

  const goToForgotPassword = () => {
    navigation.navigate('ForgotPassword')
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <StatusBar style='dark-content' />
      <View style={styles.container2}>
      <Text style={styles.title}>Login</Text>
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='email'
        placeholder='Enter email'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        autoFocus={true}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='lock'
        placeholder='Enter password'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType='password'
        rightIcon={rightIcon}
        value={password}
        onChangeText={text => setPassword(text)}
        handlePasswordVisibility={handlePasswordVisibility}
      />
      {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
      <Button
        onPress={onLogin}
        backgroundColor='#F35369'
        title='Login'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
      <Button
        onPress={() => navigation.navigate('Signup')}
        title='Go to Signup'
        backgroundColor='#1B84F5'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
      
      <Text onPress={goToForgotPassword} style={styles.text}>Forgot password </Text>
      </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
    color: '#fff',
    alignSelf: 'center',
    paddingBottom: 24
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20
  },
  text: {
    color: '#fff',
    fontSize: 18,
  }
});