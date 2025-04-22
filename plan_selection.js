import { auth, db, ref, get, update, onAuthStateChanged } from "./firebaseConfig.js";

// ✅ Extract eventId from URL
function getEventIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("eventId") || null;

    console.log("🔍 Extracted eventId from URL:", eventId); // Debug log
    return eventId;
}

// ✅ Fetch event details from Firebase under the logged-in user's path
async function getEventDetails() {
    console.log("🚀 getEventDetails() started...");

    return new Promise((resolve, reject) => {
        console.log("👀 Checking user authentication status...");

        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                console.error("❌ No user is logged in.");
                alert("You must be logged in to access event details.");
                window.location.href = "/login.html"; // Redirect to login
                return reject("User not logged in");
            }

            console.log("✅ User authenticated:", user.email);

            // Sanitize email for Firebase key usage
            const sanitizedEmail = user.email.replace(/\./g, "_");
            console.log("🛠️ Sanitized email for Firebase:", sanitizedEmail);

            const eventId = getEventIdFromURL();
            if (!eventId) {
                console.error("❌ No eventId found in URL!");
                alert("Invalid Event ID. Redirecting to home.");
                window.location.href = "/index.html";
                return reject("Event ID missing");
            }

            console.log(`📌 Fetching event details for user: ${sanitizedEmail}, event: ${eventId}`);
            const eventRef = ref(db, `users/${sanitizedEmail}/events/${eventId}`);

            try {
                console.log("📡 Fetching event data from Firebase...");
                const snapshot = await get(eventRef);

                if (snapshot.exists()) {
                    console.log("✅ Event data retrieved successfully:", snapshot.val());
                    const eventData = snapshot.val();
                    resolve({ eventId, eventName: `${eventData.groomName} & ${eventData.brideName}` });
                } else {
                    console.error("❌ Event not found in Firebase.");
                    alert("Event not found! Redirecting to home.");
                    window.location.href = "/index.html";
                    reject("Event not found");
                }
            } catch (error) {
                console.error("⚠️ Error fetching event:", error);
                alert("An error occurred while fetching event details.");
                reject(error);
            }
        });
    });
}

// ✅ Plans object
const plans = {
    starter: { name: "Starter Gathering", price: "₹8,000", details: "Includes 10 guests, basic decor, music system, and snacks." },
    smallFamily: { name: "Small Family Event", price: "₹12,000", details: "Includes 15 guests, basic decor, 1 cake, light snacks, and drinks." },
    budget: { name: "Budget Celebration", price: "₹15,000", details: "Includes 20 guests, basic decor, music system, snacks, and dessert." },
    simpleBirthday: { name: "Simple Birthday Party", price: "₹18,000", details: "Includes 25 guests, 1 small cake, balloons, and snacks." },
    miniParty: { name: "Mini Party Plan", price: "₹20,000", details: "Includes 30 guests, simple decor, music, and a buffet setup." },
    advancedKitty: { name: "Advanced Kitty Party", price: "₹25,000", details: "Includes 30 guests, upgraded decor, games, and snacks." },
    familyGathering: { name: "Family Gathering Plan", price: "₹35,000", details: "Includes 40 guests, thematic decor, music, and food." },
    birthdayBash: { name: "Birthday Bash", price: "₹40,000", details: "Includes 50 guests, vibrant decor, music, games, and catering." },
    wedding: { name: "Advanced Wedding Celebration", price: "₹50,000", details: "Includes 60 guests, elegant decor, 2 cakes, and a buffet." },
    thematic: { name: "Thematic Small Party", price: "₹60,000", details: "Includes 70 guests, customized themed decor, and a buffet." },
    luxuryFamily: { name: "Luxury Family Plan", price: "₹75,000", details: "Includes 80 guests, premium decor, live DJ, and a buffet." },
    premiumWedding: { name: "Premium Wedding Package", price: "₹1,00,000", details: "Includes 100 guests, grand decor, live music, and gourmet dining." }
};

// ✅ Display selected plan details
document.getElementById("planSelector").addEventListener("change", function () {
    const selectedPlan = this.value;
    const planDetails = document.getElementById("planDetails");

    if (plans[selectedPlan]) {
        planDetails.innerHTML = `<h3>${plans[selectedPlan].name}</h3>
                                 <p>${plans[selectedPlan].details}</p>
                                 <p class="price">${plans[selectedPlan].price}</p>`;
        planDetails.style.display = "block";
    }
});

// ✅ Show dialog with all plans
document.getElementById("showPlans").addEventListener("click", function () {
    const dialog = document.getElementById("plansDialog");
    const plansList = document.getElementById("plansList");

    plansList.innerHTML = Object.values(plans).map(plan =>
        `<div><h3>${plan.name}</h3><p>${plan.details}</p><p class="price">${plan.price}</p></div><hr>`
    ).join("");

    dialog.showModal();
});

// ✅ Close dialog
document.getElementById("closeDialog").addEventListener("click", function () {
    document.getElementById("plansDialog").close();
});

// ✅ Submit selected plan
document.getElementById("submitPlan").addEventListener("click", async function () {
    const selectedPlanKey = document.getElementById("planSelector").value;

    if (!selectedPlanKey) {
        alert("❌ Please select a plan before submitting.");
        return;
    }

    const selectedPlan = plans[selectedPlanKey];
    const eventDetails = await getEventDetails();

    if (!eventDetails) {
        alert("❌ Failed to fetch event details.");
        return;
    }

    console.log("📝 Selected Plan:", selectedPlan);
    console.log("📋 Event Details for Update:", eventDetails);

    // ✅ Update Firebase with the selected plan
    const sanitizedEmail = auth.currentUser.email.replace(/\./g, "_");
    const eventRef = ref(db, `users/${sanitizedEmail}/events/${eventDetails.eventId}`);

    try {
        await update(eventRef, { selectedPlan });
        console.log("✅ Plan successfully saved to Firebase.");
        alert(`Plan '${selectedPlan.name}' added to event '${eventDetails.eventName}' successfully!`);
        window.location.href = "/index.html";
    } catch (error) {
        console.error("🚨 Error updating event plan:", error);
        alert("Failed to save plan. Please try again.");
    }
});

// ✅ Call function for debugging
getEventDetails().then(data => {
    console.log("🎉 Event Details Retrieved:", data);

    // Check if the eventTitle element exists before updating
    const eventTitle = document.getElementById("eventTitle");
    if (!eventTitle) {
        console.error("⚠️ Missing element: eventTitle. Make sure the element exists in HTML.");
        return;
    }

    eventTitle.innerText = data.eventName;
}).catch(error => {
    console.error("🚨 Error in getEventDetails:", error);
});
