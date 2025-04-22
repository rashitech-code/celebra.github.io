// ✅ Import Firebase dependencies
import { db, ref, set } from './firebase-config.js'; // Make sure firebase-config.js exports db

// ✅ Utility: Generate a unique ID using timestamp
const generateUniqueId = () => `coordination_${Date.now()}`;

// ✅ Handle form submission when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('eventForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // ✅ Basic Info
        const eventName = form['event-name'].value.trim();
        const eventType = form['event-type'].value.trim();
        const contactNumber = form['contact-number'].value.trim();
        const email = form['email'].value.trim();
        const location = form['location'].value.trim();
        const eventDate = form['event-date'].value;
        const dressCode = form.querySelector('input[name="staff-dress-code"]:checked')?.value || '';
        const customDress = form['custom-staff-dress'].value.trim();
        const additionalInfo = form['additional-info'].value.trim();

        // ✅ Validate required fields
        if (!eventName || !eventType || !contactNumber || !email || !location || !eventDate || !dressCode) {
            alert('⚠️ Please fill in all required fields.');
            return;
        }

        // ✅ Staff Fields
        const staffRoles = [
            'choreographers', 'caterers', 'photographers', 'videographers',
            'waiters', 'jokers', 'magicians', 'singers', 'musicians', 'bands'
        ];
        const staff = {};
        staffRoles.forEach(role => {
            const val = parseInt(form[role].value) || 0;
            staff[role] = val;
        });

        // ✅ Management Fields
        const management = {
            onSiteCoordinator: parseInt(form['on-site-coordinator'].value) || 0,
            host: parseInt(form['host'].value) || 0,
            security: parseInt(form['security'].value) || 0,
            photographers: parseInt(form['photographer'].value) || 0,
            choreographers: parseInt(form['choreographer'].value) || 0,
        };

        // ✅ Build final data object
        const data = {
            eventName,
            eventType,
            contactNumber,
            email,
            location,
            eventDate,
            staffDressCode: dressCode,
            customStaffDress: customDress,
            additionalInfo,
            staff,
            management,
            submittedAt: new Date().toISOString()
        };

        // ✅ Store in Firebase under a unique key
        const formId = generateUniqueId();
        try {
            await set(ref(db, `eventCoordinations/${formId}`), data);
            alert('✅ Event coordination plan submitted successfully!');
            form.reset();
        } catch (err) {
            console.error('❌ Firebase error:', err);
            alert('Submission failed. Please try again later.');
        }
    });
});
