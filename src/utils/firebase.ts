// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_FIRABASE_APIKEY,
  authDomain: import.meta.env.VITE_API_FIRABASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_API_PROJECTID,
  storageBucket: import.meta.env.VITE_API_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_API_FIRABASE_MESSINGSENDERID,
  appId: import.meta.env.VITE_API_FIRABASE_APPID,
  measurementId: import.meta.env.VITE_API_FIRABASE_MEASUEMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export {app,auth}
