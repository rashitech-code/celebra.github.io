import { auth, db, ref, set, get, child, onAuthStateChanged } from "./firebaseConfig.js";

// Form submission handler
document.getElementById("weddingForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Check if the user is logged in
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Get the logged-in user's email and sanitize it for Firebase path
      const sanitizedEmail = user.email.replace(/\./g, "_"); // Firebase doesn't allow '.' in keys

      // Reference to the user's events
      const userEventsRef = ref(db, `users/${sanitizedEmail}/wedding_events`);

      // Fetch existing event count
      get(userEventsRef).then((snapshot) => {
        let eventCount = 1; // Default first event

        if (snapshot.exists()) {
          eventCount = Object.keys(snapshot.val()).length + 1;
        }

        const eventKey = `event${eventCount}`; // Generate event ID (event1, event2, ...)

        // Capture form data
        const formData = {
          groomName: document.getElementById("groom-name").value.trim(),
          brideName: document.getElementById("bride-name").value.trim(),
          contactNumber1: document.getElementById("contact-number-1").value.trim(),
          contactNumber2: document.getElementById("contact-number-2").value.trim(),
          email: document.getElementById("email").value.trim(),
          location: document.getElementById("location").value.trim(),
          eventDate: document.getElementById("event-date").value,
          guestNumber: parseInt(document.getElementById("guest-number").value),
          venue: document.getElementById("venue").value.trim(),
          theme: document.getElementById("theme").value.trim(),
          handwrittenNote: document.getElementById("handwritten-note").value.trim(),
          decoration: [...document.querySelectorAll("input[name='decoration']:checked")].map(el => el.value),
          customDecor: document.getElementById("custom-decor").value.trim(),
          cateringType: document.getElementById("catering-type").value,
          cuisine: document.getElementById("cuisine").value.trim(),
          mainCourse: document.getElementById("main-course").value.trim(),
          snacks: document.getElementById("snacks").value.trim(),
          desserts: document.getElementById("desserts").value.trim(),
          drinks: document.getElementById("drinks").value.trim(),
          cakeFlavor: document.getElementById("cake-flavor").value.trim(),
          cakeSize: document.getElementById("cake-size").value.trim(),
          dressCode: document.getElementById("dress-code").value.trim(),
          groomDress: {
            type: document.getElementById("groom-dress-type").value.trim(),
            quantity: parseInt(document.getElementById("groom-dress-quantity").value) || 0,
            size: document.getElementById("groom-dress-size").value.trim(),
          },
          brideDress: {
            type: document.getElementById("bride-dress-type").value.trim(),
            quantity: parseInt(document.getElementById("bride-dress-quantity").value) || 0,
            size: document.getElementById("bride-dress-size").value.trim(),
          }
        };

        // Save to Firebase under the user's events
        set(ref(db, `users/${sanitizedEmail}/wedding_events/${eventKey}`), formData)
          .then(() => {
            document.getElementById("successMessage").innerText = `Wedding details saved successfully!`;
            document.getElementById("successMessage").style.display = "block";

            // Wait for 1 second before resetting the form and redirecting
            setTimeout(() => {
              document.getElementById("weddingForm").reset();
              // Redirect with eventId in URL
              // window.location.href = `plan_selection.html?eventId=${eventKey}`;
            }, 1000);
          })
          .catch(error => {
            console.error("Error saving data:", error);
            alert("Failed to save data. Please try again.");
          });

      }).catch(error => {
        console.error("Error fetching event count:", error);
      });

    } else {
      // User not logged in, show error and redirect to login page
      alert("You must be logged in to save wedding details.");
      window.location.href = "/login.html";
    }
  });
});
