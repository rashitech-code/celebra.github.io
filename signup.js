// ✅ Import Firebase SDK modules (v9.6.1)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// ✅ Sign Up Logic
document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();
    const errorMessage = document.getElementById("error-message");

    // ✅ Check if passwords match
    if (password !== confirmPassword) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Entered passwords do not match!";
        return;
    } else {
        errorMessage.style.display = "none";
    }

    // ✅ Create user with Firebase Auth
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // ✅ Store user data in Realtime Database
            set(ref(db, 'users/' + user.uid), {
                email: email,
                uid: user.uid,
                createdAt: new Date().toISOString()
            }).then(() => {
                alert("User registered successfully!");
                window.location.href = "login.html"; // Redirect to login
            }).catch((error) => {
                console.error("Database Error:", error.message);
                alert("Failed to save user data: " + error.message);
            });
        })
        .catch((error) => {
            console.error("Auth Error:", error.message);
            alert("Sign up failed: " + error.message);
        });
});
