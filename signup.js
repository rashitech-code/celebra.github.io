import { auth, db, ref, set, createUserWithEmailAndPassword } from "./firebaseConfig.js";

// Get form elements
const signupForm = document.getElementById("signup-form");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const confirmPasswordField = document.getElementById("confirm-password");
const errorMessage = document.getElementById("error-message");

// Handle form submission
signupForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission

    const email = emailField.value;
    const password = passwordField.value;
    const confirmPassword = confirmPasswordField.value;

    // Check if passwords match
    if (password !== confirmPassword) {
        errorMessage.style.display = "block";
        return;
    } else {
        errorMessage.style.display = "none";
    }

    // Create user with Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed up:", user.email);

            // Convert email to a valid key format
            const emailKey = email.replace(/\./g, "_"); // Replace dots with underscores

            // Save user data in Firebase Database
            saveUserData(emailKey, user.uid, email, "user") // Default role as "user"
                .then(() => {
                    alert("User created successfully!");
                    window.location.href = "/login.html"; // Redirect to login
                })
                .catch((error) => {
                    console.error("Error saving user data:", error);
                    alert("Error saving user data: " + error.message);
                });
        })
        .catch((error) => {
            console.error("Sign-up error:", error.code, error.message);
            alert("Sign-up failed: " + error.message);
        });
});

// ✅ Function to store user data in Firebase Database
function saveUserData(emailKey, uid, email, role) {
    return set(ref(db, "users/" + emailKey), {
        uid: uid,  // Store UID as a property
        email: email,
        role: role
    });
}
