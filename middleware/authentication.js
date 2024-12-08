import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

const authenticateUser = async (req, res, next) => {


    const token = req.headers['authorization']?.split(' ')[1]; // Assuming token is passed in the "Authorization" header as "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied.' });
    }

    try {
        // Verify the token using the secret key (from .env or config)
        const decoded = await jwt.verify(token,
            'your_jwt_secret'
        );

        // Attach the decoded user information to the request object for further use
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

export default authenticateUser;
