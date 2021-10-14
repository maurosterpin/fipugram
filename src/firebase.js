import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9ZnrOhpr53KwDiAcnunANWTYUPuLFfQQ",
  authDomain: "fipugram-6fd66.firebaseapp.com",
  projectId: "fipugram-6fd66",
  storageBucket: "fipugram-6fd66.appspot.com",
  messagingSenderId: "500559306058",
  appId: "1:500559306058:web:12cbaa18cda8c5e1e5f5b3"
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const storage = app.storage();

export { db, storage };
export default firebase;