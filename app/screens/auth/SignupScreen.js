import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton, ImageBackground } from 'react-native';

import { Button, InputField, ErrorMessage } from '../../components/auth/index';
import Firebase from '../../config/firebase';

import firebase from 'firebase/app';
import 'firebase/firestore';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verification, setVerification] = useState('');
  const [name, setName] = useState('');
  const [passwordVisibility2, setPasswordVisibility2] = useState(true);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [rightIcon2, setRightIcon2] = useState('eye');
  const [signupError, setSignupError] = useState('');
  // console.log(firestore)
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

  const onHandleSignup = async () => {
    if (password !== verification) {
      return setSignupError('Your verifiation password is false')
    }
    try {
      if (email !== '' && password !== '') {
        await firebase.auth().createUserWithEmailAndPassword(email, password).then((result)=>{
          return result.user.updateProfile({displayName: name})
        });
        const currentUser = firebase.auth().currentUser;
        const db = firebase.firestore();
        db.collection('users').doc(currentUser.uid).set({
          email: currentUser.email,
          // name: name,
          listHis: [],
          listFav: []
        });
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  const image = {uri : "https://github.com/khanhhung142/Group6/blob/master/src/pages/Auth/images/backapp.jpg?raw=true"};
  
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <StatusBar style="dark-content" />
      <View style={styles.container2}>
      <Text style={styles.title}>Create new account</Text>
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon="account"
        placeholder="Enter your name"
        autoCapitalize="none"
        // keyboardType="email-address"
        // textContentType="emailAddress"
        autoFocus={true}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon="email"
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        // autoFocus={true}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon="lock"
        placeholder="Enter password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType="password"
        rightIcon={rightIcon}
        value={password}
        onChangeText={(text) => setPassword(text)}
        handlePasswordVisibility={handlePasswordVisibility}
      />
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon="lock"
        placeholder="Verification"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={passwordVisibility2}
        textContentType="password"
        rightIcon={rightIcon2}
        value={verification}
        onChangeText={(text) => setVerification(text)}
        handlePasswordVisibility={handlePasswordVisibility2}
      />
      {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
      <Button
        onPress={onHandleSignup}
        backgroundColor="#F35369"
        title="Signup"
        tileColor="#fff"
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
      <Button
        onPress={() => navigation.navigate('Login')}
        title="Go to Login"
        backgroundColor="#1B84F5"
        titleSize={20}
      />
      </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 35,
    fontWeight: '600',
    color: '#fff',
    alignSelf: 'center',
    paddingBottom: 24
  },
  image: {
    flex: 1,
    justifyContent: "center"
  }
});
