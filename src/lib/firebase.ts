import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyALdu4u_E_D2yjXrVqVuAQ37wCqq4ljVnM",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "bring-the-menu.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "bring-the-menu",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "bring-the-menu.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "604846926162",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:604846926162:web:98ebed229c039fb396b28b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
