const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

// Register a new user service logic
const createUser = async (userData) => {
    const { username, email, password, accountType, termsAccepted } = userData;
    
    // Validate terms acceptance
    if (!termsAccepted) {
        throw new Error('You must accept the Terms of Service and Privacy Policy');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        accountType,
        termsAccepted
    });

    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        accountType: user.accountType
    };
};

// Login user service logic
const loginUser = async (userData) => {
    const { email, password } = userData;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        return {
            token: generateToken(user._id),
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                accountType: user.accountType
            }
        };
    }
    throw new Error('Invalid email or password');
};

module.exports = {
    createUser,
    loginUser
};