// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJNec6xcXCeNdYeNXz30R62ZF3xH2A-m8",
  authDomain: "assignment2react.firebaseapp.com",
  projectId: "assignment2react",
  storageBucket: "assignment2react.appspot.com",
  messagingSenderId: "247524057670",
  appId: "1:247524057670:web:75ceef67815e6f7b286047",
  measurementId: "G-P0N06D1PZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

