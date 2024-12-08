import User from './model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Store this in an env variable
const JWT_EXPIRY = process.env.JWT_EXPIRY; // Access token expiry
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY; // Refresh token expiry

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id }, "your_jwt_secret", {
        expiresIn:
            '100h'
    });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: '1h' });
};

const register = async (userData, res) => {
    const { username, email, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    // Create new user
    const user = new User({ username, email, password });
    await user.save();

    // Generate access and refresh tokens
    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store refresh token in an HTTP-only cookie
    
    // Return access token and user
    return { user, token, refreshToken };
};


const login = async (email, password, res) => {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid email or password');

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid email or password');

    // Generate access and refresh tokens
    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store refresh token in an HTTP-only cookie
    // res.cookie('refreshToken', refreshToken, {
    //     httpOnly: true,         // Prevents access by client-side JavaScript
    //     secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent over HTTPS in production
    //     sameSite: 'strict',     // Prevents CSRF attacks
    //     maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expires in 7 days
    // });

    // Return access token and user
    return { token, user, refreshToken };
};



const logout = async () => {
    // Handle logout logic if needed (e.g., blacklist refresh token)
};

const refreshAccessToken = async (refreshToken) => {
    if (!refreshToken) throw new Error('No refresh token provided');
    try {
        const payload = jwt.verify(refreshToken, JWT_SECRET);
        const user = await User.findById(payload.id);
        if (!user) throw new Error('User not found');

        return generateAccessToken(user);
    } catch (error) {
        throw new Error('Invalid refresh token');
    }
};

export default { register, login, logout, refreshAccessToken };
