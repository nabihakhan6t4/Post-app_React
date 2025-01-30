// Firebase import karo
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ Auth import karo
import { getFirestore } from "firebase/firestore"; // ✅ Firestore import karo

// Tumhara Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA59Ctx12MyIO8-rJ4XANXPHY1-SClLiQ4",
  authDomain: "post-app-react-bc9d6.firebaseapp.com",
  projectId: "post-app-react-bc9d6",
  storageBucket: "post-app-react-bc9d6.appspot.com",
  messagingSenderId: "169435159919",
  appId: "1:169435159919:web:709d09f50b375665c99c9a"
};

// Firebase initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ✅ Yahan initialize ho raha hai
const db = getFirestore(app); // ✅ Firestore bhi initialize ho raha hai

// Export
export { auth, db };
