// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAUOFl0SZvpaRVB4F-0YiETcRngSnqRo8",
  authDomain: "hirethebest-6d267.firebaseapp.com",
  projectId: "hirethebest-6d267",
  storageBucket: "hirethebest-6d267.appspot.com",
  messagingSenderId: "320564176285",
  appId: "1:320564176285:web:e9849c99e1a6d024abbb74",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}
