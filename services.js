// ✅ Import Firebase SDK (v9.6.1 modules)
import { db, ref, set } from "./firebaseConfig.js";

// ✅ Function to get current timestamp
function getCurrentTimestamp() {
    return new Date().toISOString();
}

// ✅ Track all service clicks
const serviceLinks = document.querySelectorAll('.service-detail');

serviceLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const serviceName = link.querySelector('h3')?.textContent.trim();
        const timestamp = Date.now();

        const serviceData = {
            serviceName,
            clickedAt: getCurrentTimestamp(),
            page: window.location.pathname
        };

        // ✅ Store in Firebase under 'service_interests'
        set(ref(db, `service_interests/${timestamp}`), serviceData)
            .then(() => {
                console.log(`✅ Click recorded for: ${serviceName}`);
            })
            .catch((error) => {
                console.error("❌ Error saving click to Firebase:", error);
            });
    });
});
