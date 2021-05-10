import firebase from 'firebase';
import 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID
};


if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = firebase;

export const Database = firebase.firestore();
export const Storage = firebase.storage();

export default App
