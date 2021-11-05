import firebase from 'firebase/app';
import 'firebase/auth';
// import Constants from 'expo-constants';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA3AW-pi86zDqbPvF9R0SEKs1A6qbXphYM",
    authDomain: "fir-auth-b6e4a.firebaseapp.com",
    projectId: "fir-auth-b6e4a",
    storageBucket: "fir-auth-b6e4a.appspot.com",
    messagingSenderId: "83150735561",
    appId: "1:83150735561:web:4419d708c1611baab1e518"
  };

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;