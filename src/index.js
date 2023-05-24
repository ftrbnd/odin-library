// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABQ_G9FGLX-KOFsD09FO9BLwnn4sdt2t0",
  authDomain: "odin-library-62dc1.firebaseapp.com",
  projectId: "odin-library-62dc1",
  storageBucket: "odin-library-62dc1.appspot.com",
  messagingSenderId: "1047536753714",
  appId: "1:1047536753714:web:a58bda38f20129bb43b02b",
  measurementId: "G-22GZ2HPKCM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);