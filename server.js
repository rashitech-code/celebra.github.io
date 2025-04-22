const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://celebra-1dec0.firebaseio.com"
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Firebase Authentication Middleware
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Routes
// Get all events
app.get('/api/events', async (req, res) => {
  try {
    const db = admin.firestore();
    const eventsSnapshot = await db.collection('events').get();
    const events = [];
    eventsSnapshot.forEach(doc => {
      events.push({ id: doc.id, ...doc.data() });
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// Get single event
app.get('/api/events/:id', async (req, res) => {
  try {
    const db = admin.firestore();
    const eventDoc = await db.collection('events').doc(req.params.id).get();
    if (!eventDoc.exists) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ id: eventDoc.id, ...eventDoc.data() });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event' });
  }
});

// Create new event (protected route)
app.post('/api/events', authenticateToken, async (req, res) => {
  try {
    const db = admin.firestore();
    const newEvent = {
      ...req.body,
      status: "Upcoming",
      createdBy: req.user.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    const docRef = await db.collection('events').add(newEvent);
    res.status(201).json({ id: docRef.id, ...newEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event' });
  }
});

// Update event (protected route)
app.put('/api/events/:id', authenticateToken, async (req, res) => {
  try {
    const db = admin.firestore();
    const eventRef = db.collection('events').doc(req.params.id);
    const eventDoc = await eventRef.get();
    
    if (!eventDoc.exists) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is the creator of the event
    if (eventDoc.data().createdBy !== req.user.uid) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }

    await eventRef.update({
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    const updatedEvent = await eventRef.get();
    res.json({ id: updatedEvent.id, ...updatedEvent.data() });
  } catch (error) {
    res.status(500).json({ message: 'Error updating event' });
  }
});

// Delete event (protected route)
app.delete('/api/events/:id', authenticateToken, async (req, res) => {
  try {
    const db = admin.firestore();
    const eventRef = db.collection('events').doc(req.params.id);
    const eventDoc = await eventRef.get();
    
    if (!eventDoc.exists) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is the creator of the event
    if (eventDoc.data().createdBy !== req.user.uid) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }

    await eventRef.delete();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event' });
  }
});

// Newsletter subscription
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const db = admin.firestore();
    await db.collection('newsletter').add({
      email,
      subscribedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.status(201).json({ message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    res.status(500).json({ message: 'Error subscribing to newsletter' });
  }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const db = admin.firestore();
    await db.collection('contact').add({
      name,
      email,
      message,
      receivedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.status(201).json({ message: 'Message received successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting contact form' });
  }
});

// User registration
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name
    });

    // Create user profile in Firestore
    const db = admin.firestore();
    await db.collection('users').doc(userRecord.uid).set({
      name,
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(201).json({ 
      message: 'User created successfully',
      uid: userRecord.uid
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// User login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const userRecord = await admin.auth().getUserByEmail(email);
    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    res.json({ 
      message: 'Login successful',
      customToken
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 