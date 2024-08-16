
// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwRCPVZJbBZRjrnAmJ-CTbvt_gN4swHls",
    authDomain: "login-page-3abf7.firebaseapp.com",
    projectId: "login-page-3abf7",
    storageBucket: "login-page-3abf7.appspot.com",
    messagingSenderId: "890039837119",
    appId: "1:890039837119:web:a81aa46bde16c59584810a",
    measurementId: "G-R8TCSRH1KR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);