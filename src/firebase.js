import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = initializeApp({
    apiKey: "AIzaSyD9ZnrOhpr53KwDiAcnunANWTYUPuLFfQQ",
    authDomain: "fipugram-6fd66.firebaseapp.com",
    projectId: "fipugram-6fd66",
    storageBucket: "fipugram-6fd66.appspot.com",
    messagingSenderId: "500559306058",
    appId: "1:500559306058:web:12cbaa18cda8c5e1e5f5b3"
  });
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export { firebase };

  