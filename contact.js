// ✅ Import Firebase SDK modules
import { db, ref, set } from './firebase-config.js'; // Make sure firebase-config.js is in the same folder and exports db and ref

// ✅ Generate a unique ID for each message
function generateMessageId() {
    return 'msg-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
}

// ✅ Handle form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // ✅ Get values from form inputs
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }

        // ✅ Generate a unique ID for this message
        const messageId = generateMessageId();

        // ✅ Save to Firebase
        try {
            await set(ref(db, `contactMessages/${messageId}`), {
                name,
                email,
                subject,
                message,
                timestamp: new Date().toISOString()
            });

            alert('Your message has been sent successfully!');
            form.reset(); // Clear the form
        } catch (error) {
            console.error('Error saving contact message:', error);
            alert('Oops! Something went wrong. Please try again later.');
        }
    });
});
