// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMPZe4VT1CbW4FGJmOFQlVVaqpGk3wxoA",
    authDomain: "cda-tp-react-native.firebaseapp.com",
    projectId: "cda-tp-react-native",
    storageBucket: "cda-tp-react-native.appspot.com",
    messagingSenderId: "630256386528",
    appId: "1:630256386528:web:da6d9f149d100191ba6b85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})