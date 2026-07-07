// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDd1v9IS-nYrWcwsirK2-6JReaw71q4lhQ",
  authDomain: "codexa-3ccf2.firebaseapp.com",
  projectId: "codexa-3ccf2",
  storageBucket: "codexa-3ccf2.firebasestorage.app",
  messagingSenderId: "290541722798",
  appId: "1:290541722798:web:019ba0face245a6fce213f",
  measurementId: "G-8T035SL01D"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Analytics (only in browser)
export const analytics = typeof window !== "undefined" ? isSupported().then(yes => yes ? getAnalytics(app) : null) : null;

export const auth = typeof window !== "undefined" ? getAuth(app) : ({} as any);
export const db = typeof window !== "undefined" ? getFirestore(app) : ({} as any);
export default app;
