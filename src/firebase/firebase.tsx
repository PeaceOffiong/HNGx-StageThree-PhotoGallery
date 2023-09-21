import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGVrcsH6-4V_y6hv1WOi0iPLxExDXM-eA",
  authDomain: "uploadinggallery.firebaseapp.com",
  projectId: "uploadinggallery",
  storageBucket: "uploadinggallery.appspot.com",
  messagingSenderId: "489478413836",
  appId: "1:489478413836:web:d81998abcd60b4d2d99829",
  measurementId: "G-Z7GZDZV6M1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);