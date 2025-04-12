// controllers/authController.js

const db = require('../db'); // Import the database connection
const bcrypt = require('bcryptjs'); // Library for hashing passwords
const jwt = require('jsonwebtoken'); // Library for creating JWT tokens

// Register Controller
exports.register = (req, res) => {
  const { username, password } = req.body;

  // Check if the username already exists in the database
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
      if (err) throw err;
      res.status(201).json({ message: 'User registered' });
    });
  });
};

// Login Controller
exports.login = (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) throw err;
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const user = results[0];

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate a JWT token if credentials are valid
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Respond with the token
    res.json({ message: 'Login successful', token });
  });
};
