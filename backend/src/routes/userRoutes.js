const express = require('express');
const router = express.Router();
const { registerUser, loginUser, adminLogin } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/adminlogin', adminLogin);  // Changed to match what your frontend is calling

// Protected routes
router.get('/profile', protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;