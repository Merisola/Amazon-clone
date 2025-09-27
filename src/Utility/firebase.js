// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore";
// import "firebase/compact/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6QjBNV6SOqNmXiEZD5Dg5m_pzr0cRiIo",
  authDomain: "clone-4e23e.firebaseapp.com",
  projectId: "clone-4e23e",
  storageBucket: "clone-4e23e.firebasestorage.app",
  messagingSenderId: "888031490043",
  appId: "1:888031490043:web:715ebbb6a9f1743548255e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)