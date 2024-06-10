// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGy3MVLbP84MKYDkfc1XbRu-h7jnWdBrw",
  authDomain: "danila-df317.firebaseapp.com",
  projectId: "danila-df317",
  storageBucket: "danila-df317.appspot.com",
  messagingSenderId: "392995818434",
  appId: "1:392995818434:web:69eeaa2af4b1d592eee45b",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
