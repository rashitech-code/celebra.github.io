// ✅ Import necessary Firebase functions
import { db, ref, set } from './firebase-config.js'; // Adjust the path if needed

// ✅ Generate a unique ID for each event coordination submission
function generateUniqueId() {
    return 'coordination_' + Date.now();
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('eventForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // ✅ Gather basic event details
        const formData = {
            eventName: document.getElementById('event-name').value.trim(),
            eventType: document.getElementById('event-type').value.trim(),
            contactNumber: document.getElementById('contact-number').value.trim(),
            email: document.getElementById('email').value.trim(),
            location: document.getElementById('location').value.trim(),
            eventDate: document.getElementById('event-date').value,
            staffDressCode: document.querySelector('input[name="staff-dress-code"]:checked')?.value || '',
            customStaffDress: document.getElementById('custom-staff-dress').value.trim(),
            additionalInfo: document.getElementById('additional-info').value.trim(),
            submittedAt: new Date().toISOString()
        };

        // ✅ Staff Requirements
        const staffFields = ['choreographers', 'caterers', 'photographers', 'videographers', 'waiters', 'jokers', 'magicians', 'singers', 'musicians', 'bands'];
        formData.staff = {};
        staffFields.forEach(field => {
            formData.staff[field] = parseInt(document.querySelector(`input[name="${field}"]`).value) || 0;
        });

        // ✅ Management Team Requirements
        formData.management = {
            onSiteCoordinator: parseInt(document.getElementById('on-site-coordinator').value) || 0,
            host: parseInt(document.getElementById('host').value) || 0,
            security: parseInt(document.getElementById('security').value) || 0,
            photographers: parseInt(document.getElementById('photographer').value) || 0,
            choreographers: parseInt(document.getElementById('choreographer').value) || 0
        };

        // ✅ Basic validation
        if (!formData.eventName || !formData.eventType || !formData.contactNumber || !formData.email || !formData.location || !formData.eventDate || !formData.staffDressCode) {
            alert("Please fill in all required fields.");
            return;
        }

        // ✅ Save to Firebase
        const formId = generateUniqueId();
        try {
            await set(ref(db, 'eventCoordinations/' + formId), formData);
            alert('Your event coordination plan has been submitted successfully!');
            form.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your form. Please try again.');
        }
    });
});
