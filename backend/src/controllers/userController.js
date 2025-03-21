const User = require('../models/User');
const userService = require('../services/userService');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const { generateToken } = require('../utils/generateToken');

// Register a new user
const registerUser = async (req, res) => {
    try {
        // Validate required fields
        const { username, email, password, accountType, termsAccepted } = req.body;
        
        if (!username || !email || !password || !accountType) {
            return errorResponse(res, 'All fields are required', 400);
        }
        
        if (!termsAccepted) {
            return errorResponse(res, 'You must accept the Terms of Service and Privacy Policy', 400);
        }
        
        const user = await userService.createUser(req.body);
        return successResponse(res, user, 201);
    } catch (error) {
        // Handle duplicate key errors (username or email already exists)
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return errorResponse(res, `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`, 400);
        }
        return errorResponse(res, error.message, 400);
    }
};

// Login a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return errorResponse(res, 'Email and password are required', 400);
        }
        
        const { token, user } = await userService.loginUser(req.body);
        return successResponse(res, { token, user });
    } catch (error) {
        return errorResponse(res, error.message, 401);
    }
};

// Admin login
const adminLogin = async (req, res) => {
    try {
      const { password } = req.body;
      
      // Use environment variable for admin password
      const adminPassword = process.env.ADMIN_PASSWORD;
      
      if (!adminPassword) {
        return errorResponse(res, 'Admin password not configured', 500);
      }
  
      if (password !== adminPassword) {
        return errorResponse(res, 'Invalid admin password', 401);
      }
  
      // Generate admin token
      const token = generateToken('admin');
      
      return successResponse(res, {
        token,
        user: {
          accountType: 'Admin'
        }
      });
    } catch (error) {
      return errorResponse(res, error.message, 401);
    }
  };

// Users count controller
const getUsersCount = async (req, res) => {
    try {
        const usersCount = await userService.getUsersCount();
        return successResponse(res, { usersCount });
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};
module.exports = {
    registerUser,
    loginUser,
    adminLogin,
    getUsersCount,
};