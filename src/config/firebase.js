import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyA59Ctx12MyIO8-rJ4XANXPHY1-SClLiQ4",
  authDomain: "post-app-react-bc9d6.firebaseapp.com",
  projectId: "post-app-react-bc9d6",
  storageBucket: "post-app-react-bc9d6.appspot.com",
  messagingSenderId: "169435159919",
  appId: "1:169435159919:web:709d09f50b375665c99c9a"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Storage

export { auth, createUserWithEmailAndPassword, db, signInWithEmailAndPassword, storage }; // Export storage
