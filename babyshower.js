// Import Firebase
import { getDatabase, ref, push, set } from "./firebaseConfig.js";

// Form element
const form = document.getElementById("babyShowerForm");

// Helper: get all checked values from a checkbox group
const getCheckedValues = (name) => {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(cb => cb.value);
};

// Submit form handler
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {
        hostName: form["host-name"].value,
        motherName: form["mother-name"].value,
        fatherName: form["father-name"].value,
        contactNumber1: form["contact-number-1"].value,
        contactNumber2: form["contact-number-2"].value,
        email: form["email"].value,
        location: form["location"].value,
        eventName: form["event-name"].value,
        eventDate: form["event-date"].value,
        guestNumber: form["guest-number"].value,
        venue: form["venue"].value,
        theme: form["theme"].value,
        decoration: getCheckedValues("decoration"),
        customDecor: form["custom-decor"].value,
        catering: {
            type: form["catering-type"].value,
            cuisine: form["cuisine"].value,
            mainCourse: form["main-course"].value,
            snacks: form["snacks"].value,
            desserts: form["desserts"].value,
            drinks: form["drinks"].value,
            cakeFlavor: form["cake-flavor"].value,
            cakeSize: form["cake-size"].value
        },
        games: getCheckedValues("games"),
        specialRequests: form["special-requests"].value,
        giftRegistry: form["gift-registry"].value,
        personalMessage: form["personal-message"].value
    };

    // Save data to Firebase under "babyShowerPlans"
    const plansRef = ref(database, "babyShowerPlans");
    const newPlanRef = push(plansRef);

    set(newPlanRef, formData)
        .then(() => {
            alert("🎉 Baby shower planning details submitted successfully!");
            form.reset();
        })
        .catch((error) => {
            console.error("❌ Error saving data:", error);
            alert("Something went wrong. Please try again.");
        });
});
