import { auth, sendPasswordResetEmail } from './firebaseConfig.js';

document.getElementById('reset-password-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('reset-email').value.trim();
  const messageEl = document.getElementById('reset-message');

  if (!email) {
    messageEl.textContent = "Please enter your email.";
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    messageEl.textContent = "✅ Reset link sent! Check your inbox.";
    messageEl.style.color = "green";
  } catch (error) {
    console.error("Password reset error:", error);
    messageEl.textContent = "❌ " + (error.message || "Failed to send reset email.");
    messageEl.style.color = "red";
  }
});
