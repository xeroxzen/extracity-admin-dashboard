import firebase from "firebase/app";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_MESSAGING_APP_ID,
//   // measurementId: "G-776MMG1FPL",
// };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZE0XhUYOfAnZkHx9mV2R56xIFrpfBko0",
  authDomain: "extracitywebhook.firebaseapp.com",
  databaseURL: "https://extracitywebhook.firebaseio.com",
  projectId: "extracitywebhook",
  storageBucket: "extracitywebhook.appspot.com",
  messagingSenderId: "1092492776927",
  appId: "1:1092492776927:web:51c38326a035e8722e606a",
  measurementId: "G-776MMG1FPL",
};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const analytics = firebase.analytics();
// const db = firebase.firestore();

export default firebase;
