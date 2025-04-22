// ✅ Import Firebase SDK modules (version 9.6.1)
import { auth, db, ref, set, get, child, onAuthStateChanged } from "./firebaseConfig.js";


// ✅ Firebase Configuration (Already provided)
const firebaseConfig = {
    apiKey: "AIzaSyCwMTD0A7oggStNAgkefBYadpuGXNrCoyI",
    authDomain: "celebra-1dec0.firebaseapp.com",
    projectId: "celebra-1dec0",
    storageBucket: "celebra-1dec0.appspot.com",
    messagingSenderId: "483845558432",
    appId: "1:483845558432:web:634c81ff7a870504af39c5"
};

// ✅ Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

// Handle form submission
document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload on form submission

    // Get form data
    const eventName = document.getElementById('event-name').value;
    const eventType = document.getElementById('event-type').value;
    const contactNumber = document.getElementById('contact-number').value;
    const email = document.getElementById('email').value;
    const location = document.getElementById('location').value;
    const eventDate = document.getElementById('event-date').value;

    // Staff requirements
    const staffRequirements = {
        choreographers: document.querySelector('input[name="choreographers"]').value,
        caterers: document.querySelector('input[name="caterers"]').value,
        photographers: document.querySelector('input[name="photographers"]').value,
        videographers: document.querySelector('input[name="videographers"]').value,
        waiters: document.querySelector('input[name="waiters"]').value,
        jokers: document.querySelector('input[name="jokers"]').value,
        magicians: document.querySelector('input[name="magicians"]').value,
        singers: document.querySelector('input[name="singers"]').value,
        musicians: document.querySelector('input[name="musicians"]').value,
        bands: document.querySelector('input[name="bands"]').value,
    };

    // Staff dress code
    const staffDressCode = document.querySelector('input[name="staff-dress-code"]:checked')?.value;
    const customDress = document.getElementById('custom-staff-dress').value;

    // Management team
    const managementTeam = {
        onSiteCoordinator: document.getElementById('on-site-coordinator').value,
        host: document.getElementById('host').value,
        security: document.getElementById('security').value,
        photographer: document.getElementById('photographer').value,
        choreographer: document.getElementById('choreographer').value
    };

    // Additional information
    const additionalInfo = document.getElementById('additional-info').value;

    // Generate a unique ID for the event
    const eventId = 'event_' + Date.now(); // Unique ID based on current timestamp

    // Save event data to Firebase
    set(ref(db, 'events/' + eventId), {
        eventName,
        eventType,
        contactNumber,
        email,
        location,
        eventDate,
        staffRequirements,
        staffDressCode,
        customDress,
        managementTeam,
        additionalInfo,
    })
    .then(() => {
        alert('Event details submitted successfully!');
        document.getElementById('eventForm').reset(); // Clear the form
    })
    .catch((error) => {
        console.error('Error saving event data:', error);
        alert('An error occurred while submitting the event details. Please try again.');
    });
});
