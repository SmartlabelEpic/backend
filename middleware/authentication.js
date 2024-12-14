import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

const authenticateUser = async (req, res, next) => {
    // Extract token from the Authorization header (Bearer token format)
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied.' });
    }

    try {
        // Use environment variable for the secret key
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded, 'Decoded user info');
        // Attach the decoded user information to the request object for further use
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle specific error cases
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired.' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token.' });
        } else {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};


export default authenticateUser;
