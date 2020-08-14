import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDtT4XouqY-4pma0MgqAOESE0rVyFBkVAM",
  authDomain: "instagram-clone-3811e.firebaseapp.com",
  databaseURL: "https://instagram-clone-3811e.firebaseio.com",
  projectId: "instagram-clone-3811e",
  storageBucket: "instagram-clone-3811e.appspot.com",
  messagingSenderId: "493975836815",
  appId: "1:493975836815:web:54f1f1e48c421b85ea38fa",
  measurementId: "G-Y9Q3XYJYZF",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
