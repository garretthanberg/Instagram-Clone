import firebase from "firebase/compat";

const firebaseConfig = {
  apiKey: "AIzaSyCdtUyQrs-IP6Zt6RMZKwN3MYMnOjvgzbk",
  authDomain: "rn-instagram-clone-gh.firebaseapp.com",
  projectId: "rn-instagram-clone-gh",
  storageBucket: "rn-instagram-clone-gh.appspot.com",
  messagingSenderId: "1050575719625",
  appId: "1:1050575719625:web:b24c9b08cd2bb2d9299118",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore();

export { firebase, db };
