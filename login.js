// ✅ Import Firebase Auth functions from your config file
import { auth, signInWithEmailAndPassword } from './firebaseConfig.js';

// ✅ Get references to form elements
const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

// ✅ Login Form Submit Handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // ✅ Get input values
    const email = loginForm['username'].value.trim();
    const password = loginForm['password'].value;

    // ✅ Clear previous error
    errorMessage.textContent = '';

    try {
        // ✅ Attempt login with Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // ✅ Redirect or notify on successful login
        alert('✅ Login successful!');
        window.location.href = 'dashboard.html'; // Change to your target page
    } catch (error) {
        // ✅ Handle login errors
        console.error('Login failed:', error);
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage.textContent = '❌ User not found.';
                break;
            case 'auth/wrong-password':
                errorMessage.textContent = '❌ Incorrect password.';
                break;
            case 'auth/invalid-email':
                errorMessage.textContent = '❌ Invalid email format.';
                break;
            default:
                errorMessage.textContent = `❌ ${error.message}`;
        }
    }
});
