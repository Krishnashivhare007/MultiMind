

import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "multimind-20cf1.firebaseapp.com",
  projectId: "multimind-20cf1",
  storageBucket: "multimind-20cf1.firebasestorage.app",
  messagingSenderId: "632092137416",
  appId: "1:632092137416:web:2188dc9c278ce52cf6d2fd"
};

console.log("API KEY CHECK:", import.meta.env.VITE_FIREBASE_API_KEY);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()