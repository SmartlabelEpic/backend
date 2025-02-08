import User from './model.js';
import userService from './service.js';

const registerController = async (req, res) => {
    try {
        const { user, token, refreshToken } = await userService.register(req.body, req.file);
        if (!user || !token) {
            return res.status(400).json({ message: "Failed to register user" });
        }
        return res.status(200).json({ user, token, message: "User Created" });
    } catch (error) {
        console.log(error.message, 'sdfjkalk')
        res.status(400).json({ error: error.message });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await userService.login(email, password, res);
        // console.log(refreshToken,

        //     'refreshToken'
        // )

        // Set refresh token in HTTP-only cookie
        // res.cookie('refreshToken', refreshToken, {
        //     httpOnly: true,
        //     secure: false,
        //     maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        // });

        res.status(200).json({ message: 'User logged in', user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const logoutController = async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]; // Get token from headers


        res.clearCookie('refreshToken'); // Clear the refresh token (if you're using refresh tokens)
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// New controller for refreshing access token
const refreshTokenController = async (req, res) => {
    const refreshToken = req.cookies.refreshToken; // Get the refresh token from the cookie
    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token not found' });
    }

    try {
        const newAccessToken = await userService.refreshAccessToken(refreshToken);
        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(403).json({ error: error.message });
    }
};


const getProfile = async (req, res) => {
    try {
        const user = req.user; // Populated by the authentication middleware
        console.log(user,

            'user'
        )
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const profile = await User.findOne({ _id: user.id })

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({
            user: profile
        });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Retrieved from authentication middleware
        const { username, email, image } = req.body;

        const file = req.file;
        console.log(image, 'dkfjal')
        // Find and update the user
        const imageUrl = file ? `http://localhost:8080/uploads/${file.filename}` : null;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, email, image: imageUrl },
            { new: true, runValidators: true } // Return updated user, validate fields
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                phone: updatedUser.phone,
                image: updatedUser.image,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
};

export { getProfile, updateProfile, registerController, loginController, logoutController, refreshTokenController };
