import { db, ref, set } from "./firebaseConfig.js"; // Make sure this path is correct

// 🔁 Helper to get all checked values of a group of checkboxes
function getCheckedValues(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(cb => cb.value);
}

// ✅ Reference the form and listen for submission
const form = document.getElementById("anniversaryForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 🔍 Collect all input values
    const formData = {
        hostName: form["host-name"].value,
        coupleName: form["couple-name"].value,
        anniversaryType: form["anniversary-type"].value,
        contact1: form["contact-number-1"].value,
        contact2: form["contact-number-2"].value,
        email: form["email"].value,
        location: form["location"].value,
        eventName: form["event-name"].value,
        eventDate: form["event-date"].value,
        guestNumber: parseInt(form["guest-number"].value),
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

        dressCode: form["dress-code"].value,
        mensDress: {
            type: form["mens-dress-type"].value,
            quantity: parseInt(form["mens-dress-quantity"].value),
            size: form["mens-dress-size"].value
        },
        womensDress: {
            type: form["womens-dress-type"].value,
            quantity: parseInt(form["womens-dress-quantity"].value),
            size: form["womens-dress-size"].value
        },
        kidsDress: {
            type: form["kids-dress-type"].value,
            quantity: parseInt(form["kids-dress-quantity"].value),
            size: form["kids-dress-size"].value
        },
        elderlyDress: {
            type: form["elderly-dress-type"].value,
            quantity: parseInt(form["elderly-dress-quantity"].value),
            size: form["elderly-dress-size"].value
        },

        eventManagement: getCheckedValues("management"),
        handwrittenNote: form["handwritten-note"].value,
        additionalInfo: form["additional-info"].value
    };

    try {
        const eventId = `anniversary_${Date.now()}`; // Unique ID using timestamp
        await set(ref(db, "anniversaryEvents/" + eventId), formData);
        alert("✅ Your event plan has been submitted successfully!");
        form.reset(); // Clear form
    } catch (error) {
        console.error("❌ Error saving data:", error);
        alert("❌ Failed to submit event plan. Please try again.");
    }
});
