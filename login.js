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
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.querySelector('.login-btn');
    
    // Add floating label effect
    const inputFields = document.querySelectorAll('.input-group input');
    
    inputFields.forEach(input => {
      // Add focus class to parent when input is focused
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      // Remove focus class when input loses focus and is empty
      input.addEventListener('blur', () => {
        if (input.value === '') {
          input.parentElement.classList.remove('focused');
        }
      });
      
      // Check initial state (for browser autofill)
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
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
    
    // Form submission handling
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Show loading state
      loginBtn.classList.add('loading');
      loginBtn.textContent = 'Logging in...';
      
      // Simulate API call
      setTimeout(() => {
        // This is where you would normally make an API call to verify credentials
        console.log('Login attempt:', {
          email: usernameInput.value,
          password: passwordInput.value
        });
        
        // Reset button state
        loginBtn.classList.remove('loading');
        loginBtn.textContent = 'Login';
        
        // For demo purposes, show success and redirect
        alert('Login successful!');
        // window.location.href = 'dashboard.html';
      }, 1500);
    });
    
    // Create more bubbles dynamically
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