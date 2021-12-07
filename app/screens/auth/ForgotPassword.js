import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton, ImageBackground } from 'react-native';
import { Button, InputField, ErrorMessage } from '../../components/auth/index';
import Firebase from '../../config/firebase';
import { Alert } from '../../components/common/Alert';
const auth = Firebase.auth();

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [loginError, setLoginError] = useState('');


  const showAlert = () => {
    Alert({
      title: 'Attention',
      description: "Please check your mail"
    });
  }

  const forgotPassword = async () => {
    setLoginError('')
    try {
      await auth.sendPasswordResetEmail(email).then(()=>showAlert())
    } catch (error) {
      setLoginError(error.message)
    }
  }

  const goBack = () => {
    navigation.navigate('Login')
  }

  const image = {uri : "https://github.com/khanhhung142/Group6/blob/master/src/pages/Auth/images/backapp.jpg?raw=true"};

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.container2}>
      <Text style={styles.title}>Forgot password</Text>
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
      {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
      <Button
        onPress={forgotPassword}
        backgroundColor='#f57c00'
        title='Send mail'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
      <Text onPress={goBack} style= {styles.text}>Go back login</Text>
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
    justifyContent: "center",
    marginHorizontal: 20
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
  text: {
    color: '#fff',
    fontSize: 18,
  }
});