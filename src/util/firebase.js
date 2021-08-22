import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCqS53TWX8m1LiksppoJgBKpmV_uf_77aY",
  authDomain: "office-c622a.firebaseapp.com",
  projectId: "office-c622a",
  storageBucket: "office-c622a.appspot.com",
  messagingSenderId: "615772913822",
  appId: "1:615772913822:web:aec4b12bdd700ba0517b8f",
  measurementId: "G-E8LCL28GK5",
  databaseURL: "https://office-c622a-default-rtdb.firebaseio.com/",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
