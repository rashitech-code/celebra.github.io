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
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const signupBtn = document.querySelector('.signup-btn');
    const errorMessage = document.getElementById('error-message');
    
    // Add floating label effect
    const inputFields = document.querySelectorAll('.input-group input');
    
    inputFields.forEach(input => {
      // Create password visibility toggle for password fields
      if (input.type === 'password') {
        const toggleBtn = document.createElement('span');
        toggleBtn.innerHTML = '👁️';
        toggleBtn.className = 'password-toggle';
        toggleBtn.addEventListener('click', () => {
          if (input.type === 'password') {
            input.type = 'text';
            toggleBtn.innerHTML = '👁️‍🗨️';
          } else {
            input.type = 'password';
            toggleBtn.innerHTML = '👁️';
          }
        });
        input.parentElement.appendChild(toggleBtn);
        
        // Add password strength indicator for the main password field
        if (input.id === 'password') {
          const strengthIndicator = document.createElement('div');
          strengthIndicator.className = 'password-strength';
          const strengthBar = document.createElement('div');
          strengthBar.className = 'password-strength-bar';
          strengthIndicator.appendChild(strengthBar);
          input.parentElement.appendChild(strengthIndicator);
          
          // Check password strength
          input.addEventListener('input', () => {
            const password = input.value;
            const strengthClass = getPasswordStrength(password);
            
            // Remove all strength classes
            strengthIndicator.classList.remove('strength-weak', 'strength-medium', 'strength-strong');
            
            if (password.length > 0) {
              strengthIndicator.classList.add(strengthClass);
            }
            
            // Check if passwords match
            if (confirmPasswordInput.value && confirmPasswordInput.value !== password) {
              errorMessage.style.display = 'block';
              confirmPasswordInput.parentElement.classList.add('error');
            } else {
              errorMessage.style.display = 'none';
              confirmPasswordInput.parentElement.classList.remove('error');
            }
          });
        }
      }
      
      // Add focus class to parent when input is focused
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      // Remove focus class when input loses focus
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
    
    // Check if passwords match when confirm password changes
    confirmPasswordInput.addEventListener('input', () => {
      if (passwordInput.value !== confirmPasswordInput.value) {
        errorMessage.style.display = 'block';
        confirmPasswordInput.parentElement.classList.add('error');
      } else {
        errorMessage.style.display = 'none';
        confirmPasswordInput.parentElement.classList.remove('error');
      }
    });
    
    // Add ripple effect to button
    signupBtn.addEventListener('mousedown', (e) => {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      signupBtn.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
    
    // Form submission handling
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Validate passwords match
      if (passwordInput.value !== confirmPasswordInput.value) {
        errorMessage.style.display = 'block';
        confirmPasswordInput.parentElement.classList.add('error');
        
        // Shake the error message
        errorMessage.style.animation = 'none';
        setTimeout(() => {
          errorMessage.style.animation = 'shake 0.5s ease-in-out';
        }, 10);
        
        return;
      }
      
      // Show loading state
      signupBtn.classList.add('loading');
      signupBtn.textContent = 'Creating Account...';
      
      // Simulate API call
      setTimeout(() => {
        // This is where you would normally make an API call to create the account
        console.log('Sign up attempt:', {
          email: emailInput.value,
          password: passwordInput.value
        });
        
        // Reset button state
        signupBtn.classList.remove('loading');
        signupBtn.textContent = 'Sign Up';
        
        // For demo purposes, show success and redirect
        alert('Account created successfully!');
        // window.location.href = 'login.html';
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
    
    // Function to determine password strength
    function getPasswordStrength(password) {
      if (!password) return '';
      
      // Basic password strength check
      const hasLowerCase = /[a-z]/.test(password);
      const hasUpperCase = /[A-Z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const length = password.length;
      
      let strength = 0;
      if (length > 6) strength += 1;
      if (length > 10) strength += 1;
      if (hasLowerCase && hasUpperCase) strength += 1;
      if (hasNumber) strength += 1;
      if (hasSpecialChar) strength += 1;
      
      if (strength <= 2) return 'strength-weak';
      if (strength <= 4) return 'strength-medium';
      return 'strength-strong';
    }
  });