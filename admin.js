import { auth, signInWithEmailAndPassword, signOut, db, ref, get } from "./firebaseConfig.js";

// Get form elements
const loginForm = document.getElementById('login-form');
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');
const loginBtn = document.querySelector('.login-btn');
const errorMessage = document.getElementById('error-message'); // 🔹 Get error message element

// Function to display error messages
function showError(message) {
    errorMessage.textContent = message; // Set text content
    errorMessage.style.display = "block"; // Make it visible
}

// Handle login submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset previous error messages
    showError(""); // Clear error before new attempt

    // Get user input
    const username = usernameField.value.trim();
    const password = passwordField.value.trim();

    // Show loading state on button
    loginBtn.classList.add('loading');
    loginBtn.textContent = 'Logging in...';

    try {
        // Firebase authentication
        const userCredential = await signInWithEmailAndPassword(auth, username, password);
        const user = userCredential.user;

        // Get sanitized email for Firebase key
        const sanitizedEmail = user.email.replace(/\./g, "_");

        // Check if user is admin
        const userRef = ref(db, `users/${sanitizedEmail}`);
        const snapshot = await get(userRef);

        if (snapshot.exists() && snapshot.val().role === "admin") {
            // Allow login and redirect
            window.location.href = '/dashboard.html'; // Change as needed
        } else {
            // Logout non-admin users
            await signOut(auth);
            showError("❌ Access Denied: Admins only.");
        }
    } catch (error) {
        // Handle different Firebase authentication errors
        if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
            showError("❌ Incorrect email or password.");
        } else if (error.code === "auth/invalid-email") {
            showError("⚠️ Please enter a valid email address.");
        } else {
            showError("⚠️ Something went wrong. Please try again later.");
            console.error("Firebase Auth Error:", error);
        }
    } finally {
        // Reset button state
        loginBtn.classList.remove('loading');
        loginBtn.textContent = 'Login';
    }
});

// UI Enhancements (Floating Labels, Ripple Effects, Bubbles)
document.addEventListener('DOMContentLoaded', () => {
    const inputFields = document.querySelectorAll('.input-group input');

    inputFields.forEach(input => {
        input.addEventListener('focus', () => input.parentElement.classList.add('focused'));
        input.addEventListener('blur', () => {
            if (input.value === '') input.parentElement.classList.remove('focused');
        });
        if (input.value !== '') input.parentElement.classList.add('focused');
    });

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

    // Create background bubbles
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
