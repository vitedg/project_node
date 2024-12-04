require('dotenv').config()
const jwt = require('jsonwebtoken');




// Middleware to verify token
const verifyToken = (token) => {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log("Decoded Payload:", decoded);
      return decoded;
    } catch (err) {
      console.error("Token verification failed:", err.message);
      return null;
    }
  };

  // Authentication middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
    if (!token) return res.status(401).send("Access Denied");
  
    try {
      const verified = jwt.verify(token, secretKey);
      req.user = verified; // Attach user info to the request
      next();
    } catch (err) {
      res.status(403).send("Invalid Token");
    }
  };
  

  export {verifyToken, authenticateToken}






