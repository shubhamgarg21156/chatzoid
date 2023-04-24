import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";

const apiKey = process.env.REACT_APP_API_KEY;

const firebaseConfig = {
  apiKey: `${apiKey}`,
  authDomain: "chat-app-2ba81.firebaseapp.com",
  projectId: "chat-app-2ba81",
  storageBucket: "chat-app-2ba81.appspot.com",
  messagingSenderId: "155774530503",
  appId: "1:155774530503:web:1e68fee7dd79c42dd71fe2",
  measurementId: "G-S5NL94SZ6V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
//npm i firebase
