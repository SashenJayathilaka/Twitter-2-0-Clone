// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiUXK_0qv_UIsabR_AdLvjpnn7q9e4KUA",
  authDomain: "tinder-clone-ce8d7.firebaseapp.com",
  projectId: "tinder-clone-ce8d7",
  storageBucket: "tinder-clone-ce8d7.appspot.com",
  messagingSenderId: "1011891498066",
  appId: "1:1011891498066:web:a9bfa9fba4ddb386f7c38b",
  measurementId: "G-1XSRG7G0TT",
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, storage };
export default db;
