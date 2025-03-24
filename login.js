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
const auth = getAuth(app);

// Get form elements
const loginForm = document.getElementById('login-form');
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');
const loginBtn = document.querySelector('.login-btn');
const errorMessage = document.getElementById('error-message'); // Error message container

// Function to display error messages
function showError(message) {
    errorMessage.textContent = message; // Set error text
    errorMessage.style.display = "block"; // Show error
}

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset previous error message
    showError("");

    // Get user input
    const username = usernameField.value.trim();
    const password = passwordField.value.trim();

    // Show loading state on button
    loginBtn.classList.add('loading');
    loginBtn.textContent = 'Logging in...';

    // Firebase Authentication
    signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            window.location.href = '/dashboard.html'; // Redirect on success
        })
        .catch((error) => {
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                showError("❌ Incorrect email or password.");
            } else if (error.code === "auth/invalid-email") {
                showError("⚠️ Please enter a valid email address.");
            } else {
                showError("⚠️ Something went wrong. Please try again later.");
            }
        })
        .finally(() => {
            // Reset button state
            loginBtn.classList.remove('loading');
            loginBtn.textContent = 'Login';
        });
});

// UI Enhancements (Floating Labels, Ripple Effects, Bubbles)
document.addEventListener('DOMContentLoaded', () => {
    const inputFields = document.querySelectorAll('.input-group input');

    inputFields.forEach(input => {
        input.addEventListener('focus', () => input.parentElement.classList.add('focused'));
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });

    // Add ripple effect to button
    loginBtn.addEventListener('mousedown', (e) => {
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;

        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        loginBtn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });

    // Create background bubbles dynamically
    const backgroundBubbles = document.querySelector('.background-bubbles');
    for (let i = 0; i < 6; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.width = `${Math.random() * 60 + 20}px`;
        bubble.style.height = bubble.style.width;
        bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        backgroundBubbles.appendChild(bubble);
    }
});
