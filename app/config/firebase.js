import firebase from 'firebase/app';
import 'firebase/auth';
// import Constants from 'expo-constants';

// Initialize Firebase
// const firebaseConfig = {
//     apiKey: "AIzaSyA3AW-pi86zDqbPvF9R0SEKs1A6qbXphYM",
//     authDomain: "fir-auth-b6e4a.firebaseapp.com",
//     projectId: "fir-auth-b6e4a",
//     storageBucket: "fir-auth-b6e4a.appspot.com",
//     messagingSenderId: "83150735561",
//     appId: "1:83150735561:web:4419d708c1611baab1e518"
//   };
  const firebaseConfig = {
    apiKey: "AIzaSyAtIMtiQlLHxd8kgTszTuoe6tJMVVt2MCA",
    authDomain: "youmov-609b4.firebaseapp.com",
    projectId: "youmov-609b4",
    storageBucket: "youmov-609b4.appspot.com",
    messagingSenderId: "342100733139",
    appId: "1:342100733139:web:12b59d3fc2f4d06bdbf826",
    measurementId: "G-LDCQGQVSX1"
  };
let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;