const express = require('express');
const router = express.Router();
const { 
  createApi, 
  getAllApis, 
  getApisByProvider, 
  getApiById, 
  updateApi, 
  deleteApi,
  getProviderStats
} = require('../controllers/apiController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Public routes
router.get('/', getAllApis); // Get all APIs for marketplace
router.get('/details/:id', getApiById); // Get API details

// Provider routes (protected)
// Changed 'Provider' to 'API Provider' to match the account type
router.post('/', protect, authorize('API Provider'), createApi); // Create API
router.get('/provider', protect, authorize('API Provider'), getApisByProvider); // Get provider's APIs
router.put('/:id', protect, authorize('API Provider'), updateApi); // Update API
router.delete('/:id', protect, authorize('API Provider'), deleteApi); // Delete API
router.get('/provider/stats', protect, authorize('API Provider'), getProviderStats); // Get provider stats

module.exports = router;