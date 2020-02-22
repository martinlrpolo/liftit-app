import firebase from 'firebase';

const config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyCJ0nMtkLZOSsUHrkDMB7iLaQgdJRLg81o",
  authDomain: "rutas-a21ba.firebaseapp.com",
  databaseURL: "https://rutas-a21ba.firebaseio.com",
  projectId: "rutas-a21ba",
  storageBucket: "rutas-a21ba.appspot.com",
  messagingSenderId: "1035987498892",
  appId: "1:1035987498892:web:c03d6bfb2a62b7fb3108a9"
};
const fire = firebase.initializeApp(config);
export default fire;
