const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');

const app = express();
const initial_path = path.join(__dirname, "public");

// Middleware
app.use(express.static(initial_path));
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());

// Firebase Admin (for Firestore)
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json'); // Update with your own service account key

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Serving Login Page
app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "login.html"));
});

// Handle Login POST Request
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Implement Firebase Authentication logic
        const userRecord = await admin.auth().getUserByUsername(username);
        // Add logic to authenticate user with password

        // Redirect to home page upon successful login
        res.redirect('/home');
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(401).send("Authentication Failed");
    }
});

// Serve Home Page (requires authentication)
app.get('/home', (req, res) => {
    // Implement authentication check here (e.g., Firebase Authentication)
    // If authenticated, serve home.html; otherwise, redirect to login
    res.sendFile(path.join(initial_path, "home.html"));
});

// Serve Editor Page (requires authentication)
app.get('/editor', (req, res) => {
    // Implement authentication check here (e.g., Firebase Authentication)
    // If authenticated, serve editor.html; otherwise, redirect to login
    res.sendFile(path.join(initial_path, "editor.html"));
});

// Handle Uploads
app.post('/upload', (req, res) => {
    // Implement file upload logic here
});

// Serve Blog Pages
app.get("/:blogId", (req, res) => {
    // Implement logic to serve individual blog pages based on blogId
});

// Handle 404 Not Found
app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
