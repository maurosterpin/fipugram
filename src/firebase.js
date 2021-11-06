import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhe6Tm-o-mIcmzYEWcMuKpR3_qgVZ9JSw",
  authDomain: "fipugram2.firebaseapp.com",
  projectId: "fipugram2",
  storageBucket: "fipugram2.appspot.com",
  messagingSenderId: "743146023763",
  appId: "1:743146023763:web:9db48fb5431633f8c1cfa6",
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const storage = app.storage();

export { db, storage };
export default firebase;
