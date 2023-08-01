import firebase from "firebase/compat";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "rn-instagram-clone-gh",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore();

export { firebase, db };
