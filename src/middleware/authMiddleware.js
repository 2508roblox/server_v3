import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'
// protect by guess
const verifyTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (!accessToken) {
      return res.status(401).json({ message: 'Access token not found' });
    }
  
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
      req.user = decoded.data;
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid access token or expired' });
    }
  };
  
export {
    verifyTokenMiddleware
}