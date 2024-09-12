// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDw82FgOAP6IsKdH0fIHDM0dpyHW-ynpdA",
  authDomain: "vite-contact-bcc1c.firebaseapp.com",
  projectId: "vite-contact-bcc1c",
  storageBucket: "vite-contact-bcc1c.appspot.com",
  messagingSenderId: "1061868329839",
  appId: "1:1061868329839:web:7c6ca8b0761de7c15be69a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
