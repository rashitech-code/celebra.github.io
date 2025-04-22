// ✅ Import Firebase config and functions
import { db, ref, set } from './firebase-config.js'; // Adjust path if needed

// ✅ Generate a unique ID using timestamp
function generateUniqueId() {
    return 'decoration_' + Date.now();
}

// ✅ Form submission handler
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('decorationForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // ✅ Collect form data
        const formData = {
            eventName: document.getElementById('event-name').value.trim(),
            eventType: document.getElementById('event-type').value.trim(),
            contactNumber: document.getElementById('contact-number').value.trim(),
            email: document.getElementById('email').value.trim(),
            location: document.getElementById('location').value.trim(),
            eventDate: document.getElementById('event-date').value,

            lighting: document.getElementById('lighting').value.trim(),
            flowers: document.getElementById('flowers').value.trim(),
            balloons: document.getElementById('balloons').value.trim(),
            customDecor: document.getElementById('custom-decor').value.trim(),

            decorationLocation: document.querySelector('input[name="decoration-location"]:checked')?.value || '',
            customLocation: document.getElementById('custom-location').value.trim(),
            additionalInfo: document.getElementById('additional-info').value.trim(),

            submittedAt: new Date().toISOString()
        };

        // ✅ Basic validation
        if (!formData.eventName || !formData.eventType || !formData.contactNumber || !formData.email || !formData.location || !formData.eventDate || !formData.decorationLocation) {
            alert('Please fill in all required fields.');
            return;
        }

        // ✅ Generate a unique ID and save to Firebase
        const formId = generateUniqueId();

        try {
            await set(ref(db, 'eventDecorations/' + formId), formData);
            alert('Your decoration plan has been submitted successfully!');
            form.reset(); // Clear the form
        } catch (error) {
            console.error('Error submitting decoration form:', error);
            alert('Something went wrong while submitting the form. Please try again.');
        }
    });
});
