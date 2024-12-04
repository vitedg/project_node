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
    
    token = req.cookies.token;
    if (!token) return res.status(401).render("error");
  
    try {
      const verified = jwt.verify(token, process.env.SECRET_KEY);
      req.user = verified; // Attach user info to the request
      next();
    } catch (err) {
      res.status(403).send("Invalid Token");
    }
  };

  // Middleware pour vérifier les rôles
const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
        token = req.cookies.token;
        const user = jwt.decode(token);
      if (!allowedRoles.includes(user.role)) {
        console.log(user.role);
        return res.status(403).render('error');
      }
      next();
    };
};
  

  module.exports = {verifyToken, authenticateToken, authorizeRole}






