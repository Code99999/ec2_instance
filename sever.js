// Import dependencies
const express = require('express'); // Express framework
const bodyParser = require('body-parser'); // Body parsing middleware
const cors = require('cors'); // Enable CORS

// Initialize app
const app = express(); // Create Express app
const PORT = process.env.PORT || 3000; // Set port from env or default 3000

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies

// In-memory store for advice submissions
const adviceSubmissions = []; // Array to store advice entries

// Simple auth middleware to parse Authorization header
app.use((req, res, next) => {
  const authHeader = req.headers['authorization']; // Get auth header
  if (!authHeader) {
    return res.status(401).json({ message: 'Missing Authorization header' }); // Unauthorized if missing
  }

  // Parse basic auth token
  const token = authHeader.split(' ')[1]; // Extract base64 token
  if (!token) {
    return res.status(401).json({ message: 'Invalid Authorization format' }); // Invalid format
  }

  // Decode token to email:password
  const credentials = Buffer.from(token, 'base64').toString('utf8'); // Decode base64
  const [email, password] = credentials.split(':'); // Split email and password

  // Basic validation - In real app, check against DB
  if (!email || !password) {
    return res.status(401).json({ message: 'Invalid token' }); // Invalid token
  }

  // Attach user info to request for future use
  req.user = { email, password }; // Set user object
  next(); // Proceed to next middleware
});

// POST /api/advice route to receive advice submissions
app.post('/api/advice', (req, res) => {
  const { question, answer, harm, level } = req.body; // Extract fields

  // Basic validation
  if (!question || !answer || !harm || !level) {
    return res.status(400).json({ message: 'Missing required fields' }); // Bad request if missing
  }

  // Save advice with user email
  adviceSubmissions.push({
    email: req.user.email, // Submitter email
    question,
    answer,
    harm,
    level,
    submittedAt: new Date() // Timestamp
  });

  // Respond success
  res.status(201).json({ message: 'Advice submitted successfully' });
});

// Start server listening on PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log startup message
});
