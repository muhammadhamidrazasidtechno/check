
// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: "AIzaSyCwRCPVZJbBZRjrnAmJ-CTbvt_gN4swHls",
    // authDomain: "login-page-3abf7.firebaseapp.com",
    // projectId: "login-page-3abf7",
    // storageBucket: "login-page-3abf7.appspot.com",
    // messagingSenderId: "890039837119",
    // appId: "1:890039837119:web:a81aa46bde16c59584810a",
    // measurementId: "G-R8TCSRH1KR"
    apiKey: "AIzaSyDl1xXCTAIXFMnJ1P6cxgt7HpYC_keSSI8",
    authDomain: "otp-send-670f5.firebaseapp.com",
    projectId: "otp-send-670f5",
    storageBucket: "otp-send-670f5.appspot.com",
    messagingSenderId: "243137471169",
    appId: "1:243137471169:web:59e5ed23fd5709adbaaa40",
    measurementId: "G-SHZRDDL9BL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);