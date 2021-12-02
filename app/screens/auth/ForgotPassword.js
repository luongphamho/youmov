import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton } from 'react-native';
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
  return (
    <View style={styles.container}>
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
      <Text onPress={goBack}>Go back login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e93b81',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    alignSelf: 'center',
    paddingBottom: 24
  }
});