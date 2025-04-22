import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-XMgZcZl63aSKa5d1rHHCEgya3loVOCo",
  authDomain: "event-management-website-3bc47.firebaseapp.com",
  databaseURL: "https://event-management-website-3bc47-default-rtdb.firebaseio.com",
  projectId: "event-management-website-3bc47",
  storageBucket: "event-management-website-3bc47.appspot.com",
  messagingSenderId: "179251566734",
  appId: "1:179251566734:web:5007fa61b5c59d51891cfb"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Elements
const categoryDropdown = document.getElementById("category");
const eventDropdown = document.getElementById("event");
const form = document.getElementById("planBookingForm");

// Load categories
function loadCategories() {
  const categoriesRef = ref(db, 'categories');
  get(categoriesRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const categories = snapshot.val();
        categoryDropdown.innerHTML = `<option value="">Select Category</option>`;
        Object.keys(categories).forEach((key) => {
          const option = document.createElement("option");
          option.value = key;
          option.textContent = categories[key].name;
          categoryDropdown.appendChild(option);
        });
      } else {
        console.log("No categories found.");
      }
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
    });
}

// Load events based on category
function loadEventsByCategory(categoryId) {
  if (!categoryId) {
    eventDropdown.innerHTML = `<option value="">Select Event</option>`;
    return;
  }

  const eventsRef = ref(db, 'events');
  get(eventsRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const events = snapshot.val();
        eventDropdown.innerHTML = `<option value="">Select Event</option>`;
        Object.keys(events).forEach((key) => {
          const event = events[key];
          if (event.categoryId === categoryId) {
            const option = document.createElement("option");
            option.value = key;
            option.textContent = event.name;
            eventDropdown.appendChild(option);
          }
        });
      } else {
        console.log("No events found.");
      }
    })
    .catch((error) => {
      console.error("Error fetching events:", error);
    });
}

// Event listener: category change
categoryDropdown.addEventListener("change", () => {
  const selectedCategory = categoryDropdown.value;
  loadEventsByCategory(selectedCategory);
});

// Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const bookingData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    categoryId: categoryDropdown.value,
    eventId: eventDropdown.value,
    date: document.getElementById("date").value,
    guests: document.getElementById("guests").value,
    location: document.getElementById("location").value,
    decoration: document.getElementById("decoration").value,
    food: document.getElementById("food").value,
    budget: document.getElementById("budget").value,
    notes: document.getElementById("notes").value,
    timestamp: new Date().toISOString()
  };

  const bookingsRef = ref(db, 'bookings');
  const newBookingRef = push(bookingsRef);
  set(newBookingRef, bookingData)
    .then(() => {
      alert("Booking submitted successfully!");
      form.reset();
    })
    .catch((error) => {
      console.error("Error saving booking:", error);
      alert("Failed to submit booking. Please try again.");
    });
});

// Initialize on load
loadCategories();
