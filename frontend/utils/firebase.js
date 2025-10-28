import { initializeApp } from "firebase/app";

import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-ee241.firebaseapp.com",
  projectId: "loginonecart-ee241",
  storageBucket: "loginonecart-ee241.firebasestorage.app",
  messagingSenderId: "332175294515",
  appId: "1:332175294515:web:80ac9da10da731117ce346"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const Provider = new GoogleAuthProvider()

export {auth,Provider}