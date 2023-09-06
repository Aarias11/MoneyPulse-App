const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET_KEY } = process.env

function authMiddleware(req, res, next) {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    // Ensure you access userId from the decoded token and assign it to req.user._id
    req.user = { _id: decoded.userId };
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
}

module.exports = authMiddleware;
