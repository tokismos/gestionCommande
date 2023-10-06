// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjepNfr5hGZ6sPVxqEfW4cLerMj5xGwJQ",
  authDomain: "gestionlunette.firebaseapp.com",
  projectId: "gestionlunette",
  storageBucket: "gestionlunette.appspot.com",
  messagingSenderId: "476658825288",
  appId: "1:476658825288:web:aad7a64635d2cd9e23007d",
  databaseURL:
    "https://gestionlunette-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { database, ref, set, push, get };
