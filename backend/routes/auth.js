// routes/auth.js

const express = require('express'); // Import the express library
const router = express.Router(); // Create a new express router instance
const { register, login } = require('../controllers/authController'); // Import the register and login controller functions

// Route to handle user registration
router.post('/register', register); // When a POST request is made to '/register', call the 'register' function from authController

// Route to handle user login
router.post('/login', login); // When a POST request is made to '/login', call the 'login' function from authController

// Export the router to be used in the main server file
module.exports = router;
