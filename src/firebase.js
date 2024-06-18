// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuYRfFu0BEhnj9ilfg1OC99BYkCVOOwJY",
  authDomain: "my-todo-list-995ec.firebaseapp.com",
  projectId: "my-todo-list-995ec",
  storageBucket: "my-todo-list-995ec.appspot.com",
  messagingSenderId: "927949783039",
  appId: "1:927949783039:web:5de085f2468f1ed670b1ca",
  measurementId: "G-8G6H19S1Z5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// const analytics = getAnalytics(app);