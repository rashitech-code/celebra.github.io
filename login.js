// Import the necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCwMTD0A7oggStNAgkefBYadpuGXNrCoyI",
  authDomain: "celebra-1dec0.firebaseapp.com",
  projectId: "celebra-1dec0",
  storageBucket: "celebra-1dec0.firebasestorage.app",
  messagingSenderId: "483845558432",
  appId: "1:483845558432:web:634c81ff7a870504af39c5"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firebase Authentication instance
const auth = getAuth(app);

// Get form elements
const loginForm = document.getElementById('login-form');
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from submitting the traditional way

    // Get user input
    const username = usernameField.value;
    const password = passwordField.value;

    // Sign in with email and password using Firebase Authentication
    signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Logged in as: ', user.email);

            // Redirect to another page (e.g., dashboard) on successful login
            // window.location.href = '/dashboard.html'; // Modify this URL as needed
            alert('login successful');
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error('Error during login:', errorMessage);
            alert('Login failed: ' + errorMessage); // Show error message to user
        });
});
