
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyBL2cb6Y7z1T-3LBJlwBIh18roNkaM7gfw",
    authDomain: "collab-connect-1c16e.firebaseapp.com",
    projectId: "collab-connect-1c16e",
    storageBucket: "collab-connect-1c16e.firebasestorage.app",
    messagingSenderId: "1046517032608",
    appId: "1:1046517032608:web:8a0e0abf17ebc775494bc5",
    measurementId: "G-4FTTP983KS"
  };



export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);