// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "twitter-clone-9bebf.firebaseapp.com",
  projectId: "twitter-clone-9bebf",
  storageBucket: "twitter-clone-9bebf.appspot.com",
  messagingSenderId: "215864295026",
  appId: "1:215864295026:web:d80b270dc53bd6713ccceb",
  measurementId: "G-V4QP6K27WN",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
// const analytics = getAnalytics(app);

export { app, db, storage };
