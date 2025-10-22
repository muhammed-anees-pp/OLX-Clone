import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgE2nNN_5-WBrRYneW5HWc733p-GunSoY",
  authDomain: "olx-clone-project-7244f.firebaseapp.com",
  projectId: "olx-clone-project-7244f",
  storageBucket: "olx-clone-project-7244f.firebasestorage.app",
  messagingSenderId: "618748124237",
  appId: "1:618748124237:web:e5a3e30998f3a62dd99004"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);