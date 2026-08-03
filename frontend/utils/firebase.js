// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "multimind-df04f.firebaseapp.com",
  projectId: "multimind-df04f",
  storageBucket: "multimind-df04f.firebasestorage.app",
  messagingSenderId: "996837835534",
  appId: "1:996837835534:web:91c10e097c2b89f3de8d5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app)
export const googleProvider = new GoogleAuthProvider()