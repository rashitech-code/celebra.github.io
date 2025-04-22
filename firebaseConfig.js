// ✅ Import Firebase SDK modules (version 9.6.1)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, get, update, child,db} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail , createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// ✅ Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwMTD0A7oggStNAgkefBYadpuGXNrCoyI",
    authDomain: "celebra-1dec0.firebaseapp.com",
    projectId: "celebra-1dec0",
    storageBucket: "celebra-1dec0.appspot.com",
    messagingSenderId: "483845558432",
    appId: "1:483845558432:web:634c81ff7a870504af39c5"
};

// ✅ Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp); // ✅ Initialize Authentication

// ✅ Export necessary functions and instances
export { firebaseApp, db, auth, onAuthStateChanged, ref, set, get,db, update, child,  sendPasswordResetEmail ,signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };
