const express = require('express');
const router = express.Router();
const { registerUser, loginUser, adminLogin, getUsersCount } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/adminlogin', adminLogin);  

// Protected routes
router.get('/profile', protect, (req, res) => {
  res.json(req.user);
});

// Users count route
router.get('/count', getUsersCount);

module.exports = router;