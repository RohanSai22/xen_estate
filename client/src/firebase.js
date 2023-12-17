// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-6f824.firebaseapp.com",
  projectId: "mern-estate-6f824",
  storageBucket: "mern-estate-6f824.appspot.com",
  messagingSenderId: "769419675653",
  appId: "1:769419675653:web:c5243ea7113ff9674cf46c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);