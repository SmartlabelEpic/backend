import User from './model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Store in env variable
const JWT_EXPIRY = process.env.JWT_EXPIRY || '100h'; // Access token expiry
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || '1h'; // Refresh token expiry

// Generate access token
const generateAccessToken = async (user) => {
    console.log(user, 'user')
    let token = await jwt.sign({ id: user._id }, 'secret', {
        expiresIn: "120h",
    });
    console.log(token);
    return token;
};

// Generate refresh token
const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
};

// Register user function
const register = async (userData) => {
    console.log(userData, 'flakj');

    const { username, email, password, mobile } = userData;
    console.log(password, 'pass register');

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { message: 'User already exists' };
        }

        // Hash password before saving
        // const hashedPassword = await bcrypt.hash(password, 12);
        // console.log('hashed psd', hashedPassword);
        console.log('hashed psd', password);

        // Create new user
        const user = new User({
            username,
            email,
            password,
            mobile: mobile,
        });

        const savedUser = await user.save();
        console.log(savedUser, 'savedUser');

        // Generate token
        const token = await generateAccessToken(savedUser);

        // Return user and token
        return {
            user: savedUser,
            token,
        };
    } catch (error) {
        console.log(error.message, 'service');
        return { message: 'Error during registration', error: error.message };
    }
};


// Login function
const login = async (email, password, res) => {
    try {
        console.log(email, password, 'fkafl');

        // Find the user by email
        const user = await User.findOne({ email: email });

        console.log(user, 'user')
        // If no user is found, return an error
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid, 'isPasswordValid');

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate token
        const token = await generateAccessToken(user);
        console.log(token, 'generated token');

        return { token, user };
    } catch (error) {
        console.log(error.message, 'login error');
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
};


// Refresh access token function
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

export default { register, login, refreshAccessToken };
