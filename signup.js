// Import necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

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
const signupForm = document.getElementById('signup-form');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const confirmPasswordField = document.getElementById('confirm-password');
const errorMessage = document.getElementById('error-message');

// Handle form submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from submitting the traditional way

    const email = emailField.value;
    const password = passwordField.value;
    const confirmPassword = confirmPasswordField.value;

    // Check if the passwords match
    if (password !== confirmPassword) {
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';

        // Sign up the user with Firebase Authentication
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User signed up as:', user.email);

                // Redirect to the login page (or another page after signup)
                alert("user created succesfully");
                window.location.href = '/login.html'; // Change this URL as needed
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error during sign up:', errorCode, errorMessage);
                alert('Sign up failed: ' + errorMessage); // Show error message to user
            });
    }
});
