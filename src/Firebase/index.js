// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth";
import * as firebase from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAVU5wHdAouYoOFyd1j39u4ZDiQFifP1jw",
  authDomain: "ezrental-a72d8.firebaseapp.com",
  databaseURL: "https://ezrental-a72d8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ezrental-a72d8",
  storageBucket: "ezrental-a72d8.appspot.com",
  messagingSenderId: "14211979679",
  appId: "1:14211979679:web:40d1af493981d4a9b145aa",
  measurementId: "G-WX1YG1DB20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
const metaprovider = new FacebookAuthProvider();

export { analytics,db,auth,storage,provider,metaprovider };
export default firebase;