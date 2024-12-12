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
    let token = await jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRY,
    });
    console.log(token);
    return token;
};

// Generate refresh token
const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
};

// Register user function
const register = async (userData, req, res) => {
    console.log(userData,

        'flakj'
    )
    const { username, email, password, profilePic } = userData;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Handle file upload using formidable
        const form = new formidable.IncomingForm();
        form.uploadDir = path.join(__dirname, '../uploads');
        form.keepExtensions = true;
        form.maxFileSize = 10 * 1024 * 1024; // Max 10MB file size

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({ message: 'Error during file upload', error: err });
            }

            // Handle profile picture
            let profilePicPath = '';
            if (files.profilePic) {
                const profilePic = files.profilePic;
                const newFileName = `${Date.now()}_${profilePic.originalFilename}`;
                profilePicPath = path.join(__dirname, '../uploads', newFileName);

                // Move the uploaded file
                fs.renameSync(profilePic.filepath, profilePicPath);
            }

            // Hash password before saving
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create new user
            const user = new User({
                username,
                email,
                password: hashedPassword,
                profilePic: profilePicPath, // Save file path to user record
            });

            await user.save();

            // Generate tokens
            const token = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            // Return response
            res.status(200).json({
                message: 'User registered successfully',
                data: {
                    user,
                    token,
                    refreshToken,
                    profilePic: profilePicPath, // Include file path in response
                },
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error during registration', error: error.message });
    }
};

// Login function
const login = async (email, password, res) => {
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password' });

        // Generate tokens
        const token = await generateAccessToken(user);
        console.log(token,

            'kfajfl'
        )
        // const refreshToken = generateRefreshToken(user);

       return {token ,user}
    } catch (error) {
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
