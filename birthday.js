// ✅ Import Firebase modules
import { firebaseApp, db, ref, set } from './firebaseConfig.js'; // Adjust path if different

// ✅ Select the form
const form = document.getElementById('eventForm');

// ✅ Handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // ✅ Get form values
    const formData = {
        hostName: form['host-name'].value.trim(),
        birthdayPersonName: form['birthday-person-name'].value.trim(),
        gender: form['gender'].value,
        contact1: form['contact-number-1'].value.trim(),
        contact2: form['contact-number-2'].value.trim(),
        email: form['email'].value.trim(),
        location: form['location'].value.trim(),
        eventName: form['event-name'].value.trim(),
        eventDate: form['event-date'].value,
        guestNumber: parseInt(form['guest-number'].value),
        venue: form['venue'].value.trim(),
        theme: form['theme'].value.trim(),

        decoration: Array.from(form.querySelectorAll('input[name="decoration"]:checked')).map(el => el.value),
        customDecor: form['custom-decor'].value.trim(),

        catering: {
            type: form['catering-type'].value,
            cuisine: form['cuisine'].value.trim(),
            mainCourse: form['main-course'].value.trim(),
            snacks: form['snacks'].value.trim(),
            desserts: form['desserts'].value.trim(),
            drinks: form['drinks'].value.trim(),
            cakeFlavor: form['cake-flavor'].value.trim(),
            cakeSize: form['cake-size'].value.trim(),
        },

        dressCode: form['dress-code'].value.trim(),
        dresses: {
            men: {
                type: form['mens-dress-type'].value.trim(),
                quantity: parseInt(form['mens-dress-quantity'].value),
                sizes: form['mens-dress-size'].value.trim(),
            },
            women: {
                type: form['womens-dress-type'].value.trim(),
                quantity: parseInt(form['womens-dress-quantity'].value),
                sizes: form['womens-dress-size'].value.trim(),
            },
            kids: {
                type: form['kids-dress-type'].value.trim(),
                quantity: parseInt(form['kids-dress-quantity'].value),
                sizes: form['kids-dress-size'].value.trim(),
            },
            elderly: {
                type: form['elderly-dress-type'].value.trim(),
                quantity: parseInt(form['elderly-dress-quantity'].value),
                sizes: form['elderly-dress-size'].value.trim(),
            }
        },

        management: Array.from(form.querySelectorAll('input[name="management"]:checked')).map(el => el.value),
        invitationNote: form['handwritten-note'].value.trim(),
        additionalInfo: form['additional-info'].value.trim(),
        timestamp: new Date().toISOString()
    };

    try {
        const uniqueId = Date.now(); // Can also use a UUID
        await set(ref(db, `birthdayEvents/${uniqueId}`), formData);

        alert("🎉 Birthday Event submitted successfully!");
        form.reset();
    } catch (error) {
        console.error("❌ Error submitting event:", error);
        alert("Failed to submit event. Please try again.");
    }
});
