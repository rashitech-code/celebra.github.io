// ✅ Import Firebase Authentication & Database functions
import { auth, db, ref, set, get, child, onAuthStateChanged } from "./firebaseConfig.js";

// ✅ Get form element
const spiritualEventForm = document.getElementById("spiritualEventForm");

// ✅ Function to handle form submission
const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // ✅ Check if user is logged in
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            alert("You must be logged in to submit an event.");
            window.location.href = "/login.html"; // Redirect to login page
            return;
        }

        // ✅ Sanitize user email for Firebase storage (replace '.' with '_')
        const sanitizedEmail = user.email.replace(/\./g, "_");

        // ✅ Reference to user's events in Firebase
        const userEventsRef = ref(db, `users/${sanitizedEmail}/spiritualEvents`);

        // ✅ Fetch the current event count
        try {
            const snapshot = await get(userEventsRef);
            let eventCount = 1;

            if (snapshot.exists()) {
                eventCount = Object.keys(snapshot.val()).length + 1;
            }

            const eventKey = `event${eventCount}`; // Generate event ID (event1, event2, ...)

            // ✅ Collect form data
            const eventData = {
                hostName: document.getElementById("host-name").value.trim(),
                eventName: document.getElementById("event-name").value.trim(),
                eventType: document.getElementById("event-type").value.trim(),
                eventDate: document.getElementById("event-date").value,
                guestNumber: parseInt(document.getElementById("guest-number").value) || 0,
                venue: document.getElementById("venue").value.trim(),
                location: document.getElementById("location").value.trim(),
                contactNumber: document.getElementById("contact-number").value.trim(),
                email: document.getElementById("email").value.trim(),
                decoration: [...document.querySelectorAll('input[name="decoration"]:checked')].map(el => el.value),
                customDecor: document.getElementById("custom-decor").value.trim(),
                cateringType: document.getElementById("catering-type").value.trim(),
                foodPreferences: document.getElementById("food-preferences").value.trim(),
                rituals: document.getElementById("rituals").value.trim(),
                spiritualLeader: document.getElementById("spiritual-leader").value.trim(),
                priestDetails: document.getElementById("priest-details").value.trim(),
                eventManagement: [...document.querySelectorAll('input[name="management"]:checked')].map(el => el.value),
                handwrittenNote: document.getElementById("handwritten-note").value.trim(),
                additionalInfo: document.getElementById("additional-info").value.trim(),
                createdAt: new Date().toISOString()
            };

            // ✅ Store data in Firebase under the user's events
            await set(ref(db, `users/${sanitizedEmail}/spiritualEvents/${eventKey}`), eventData);

            // ✅ Show success message
            alert("✅ Spiritual event plan submitted successfully!");

            // ✅ Reset form after 1 second
            setTimeout(() => {
                spiritualEventForm.reset();
                window.location.href = `plan_selection.html?eventId=${eventKey}`;
            }, 1000);
        } catch (error) {
            console.error("❌ Error saving event data:", error);
            alert("❌ Failed to submit event. Please try again.");
        }
    });
};

// ✅ Attach event listener to form
if (spiritualEventForm) {
    spiritualEventForm.addEventListener("submit", handleFormSubmit);
}
