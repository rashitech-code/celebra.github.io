// ✅ Import Firebase SDK modules
import { db, ref, set } from "./firebaseConfig.js"; // Adjust path if needed

// ✅ Reference to the form
const form = document.getElementById("professionalEventForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ✅ Collect form values
    const hostName = document.getElementById("host-name").value;
    const eventName = document.getElementById("event-name").value;
    const eventType = document.getElementById("event-type").value;
    const contactNumber = document.getElementById("contact-number").value;
    const email = document.getElementById("email").value;
    const location = document.getElementById("location").value;
    const eventDate = document.getElementById("event-date").value;
    const guestNumber = document.getElementById("guest-number").value;
    const venue = document.getElementById("venue").value;

    // ✅ Customizations
    const setupOptions = Array.from(document.querySelectorAll('input[name="setup"]:checked')).map(cb => cb.value);
    const customSetup = document.getElementById("custom-setup").value;

    const cateringType = document.getElementById("catering-type").value;
    const cuisine = document.getElementById("cuisine").value;
    const dietaryRestrictions = document.getElementById("dietary-restrictions").value;

    const managementOptions = Array.from(document.querySelectorAll('input[name="management"]:checked')).map(cb => cb.value);

    const additionalServices = document.getElementById("additional-services").value;

    // ✅ Generate unique ID using timestamp
    const timestamp = Date.now();

    // ✅ Data object
    const eventData = {
        hostName,
        eventName,
        eventType,
        contactNumber,
        email,
        location,
        eventDate,
        guestNumber,
        venue,
        setupOptions,
        customSetup,
        cateringType,
        cuisine,
        dietaryRestrictions,
        managementOptions,
        additionalServices,
        submittedAt: new Date(timestamp).toISOString()
    };

    // ✅ Save to Firebase
    try {
        await set(ref(db, `professional_events/${timestamp}`), eventData);
        alert("Event details submitted successfully!");
        form.reset(); // Optional: Reset the form after submission
    } catch (error) {
        console.error("Error submitting event data:", error);
        alert("Something went wrong. Please try again.");
    }
});
