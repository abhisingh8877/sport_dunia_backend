const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY;  // This fetches the secret key from the environment variable

const protect = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No token provided' ,isSuccess:false});
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);  // Use the secret key to verify the JWT
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' ,isSuccess:false});
  }
};

module.exports = protect;


