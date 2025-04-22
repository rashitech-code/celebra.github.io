// ✅ Import Firebase modules and instances from your config file
import { db, ref, set, push } from './firebase-config.js';

// ✅ Reference to the form
const eventForm = document.getElementById('eventForm');

eventForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // ✅ Get form values
    const eventType = document.getElementById('event-type').value;
    const hostName = document.getElementById('host-name').value.trim();
    const location = document.getElementById('event-location').value.trim();
    const date = document.getElementById('event-date').value;
    const guestNumber = parseInt(document.getElementById('guest-number').value);
    const contact = document.getElementById('contact-number').value.trim();
    const email = document.getElementById('email').value.trim();

    // ✅ Surprise Elements (checkboxes)
    const surpriseElements = [];
    document.querySelectorAll('input[name="surprise-element"]:checked').forEach((checkbox) => {
        surpriseElements.push(checkbox.value);
    });
    const customSurprise = document.getElementById('custom-surprise').value.trim();

    // ✅ Proposal Options
    const proposalTheme = document.getElementById('proposal-theme').value.trim();
    const proposalDecor = document.getElementById('proposal-decor').value.trim();
    const proposalMusic = document.getElementById('proposal-music').value.trim();

    // ✅ Milestone Celebration
    const milestoneType = document.getElementById('milestone-type').value.trim();
    const specialActivities = document.getElementById('special-activities').value.trim();
    const milestoneDecor = document.getElementById('milestone-decor').value.trim();

    // ✅ Event Management Options
    const managementOptions = [];
    document.querySelectorAll('input[name="management"]:checked').forEach((checkbox) => {
        managementOptions.push(checkbox.value);
    });

    // ✅ Personal Note
    const personalNote = document.getElementById('personal-note').value.trim();

    // ✅ Structure the data object
    const eventData = {
        eventType,
        hostName,
        location,
        date,
        guestNumber,
        contact,
        email,
        surpriseElements,
        customSurprise,
        proposalTheme,
        proposalDecor,
        proposalMusic,
        milestoneType,
        specialActivities,
        milestoneDecor,
        managementOptions,
        personalNote,
        timestamp: new Date().toISOString(),
    };

    try {
        // ✅ Generate a new unique entry in the database
        const eventRef = push(ref(db, 'specialEventPlans'));
        await set(eventRef, eventData);

        alert("✅ Event plan submitted successfully!");
        eventForm.reset(); // Clear the form after submission
    } catch (error) {
        console.error("❌ Error submitting event plan:", error);
        alert("❌ Failed to submit event. Please try again.");
    }
});
