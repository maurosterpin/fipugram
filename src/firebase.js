// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9ZnrOhpr53KwDiAcnunANWTYUPuLFfQQ",
  authDomain: "fipugram-6fd66.firebaseapp.com",
  projectId: "fipugram-6fd66",
  storageBucket: "fipugram-6fd66.appspot.com",
  messagingSenderId: "500559306058",
  appId: "1:500559306058:web:12cbaa18cda8c5e1e5f5b3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);