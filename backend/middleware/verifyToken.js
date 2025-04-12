// middleware/verifyToken.js

const jwt = require('jsonwebtoken'); // Import the jwt library for token verification

module.exports = (req, res, next) => {
  // Extract the token from the Authorization header (expects "Bearer <token>")
  const token = req.header('Authorization')?.replace('Bearer ', ''); 

  // If no token is provided, respond with a 401 (Unauthorized) error
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    // Verify the token using the secret stored in the environment variable
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If valid, attach the decoded user data to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, respond with a 400 (Bad Request) error
    res.status(400).json({ message: 'Invalid token' });
  }
};
