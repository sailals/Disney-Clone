import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
const firebaseConfig = {
  apiKey: "AIzaSyCEZxxfKh-ACWyTLMzH3GCSt0h3hmGj50w",

  authDomain: "disney-clone-d5bfb.firebaseapp.com",

  projectId: "disney-clone-d5bfb",

  storageBucket: "disney-clone-d5bfb.appspot.com",

  messagingSenderId: "308272995890",

  appId: "1:308272995890:web:0b29e95ef72dae15dea62b",

  measurementId: "G-SW8TL6SLPG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
