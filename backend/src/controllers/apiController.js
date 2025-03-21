const Api = require('../models/Api');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// Create a new API
const createApi = async (req, res) => {
  try {
    const { name, description, endpoint, documentation, pricing, category } = req.body;
    
    // Validate required fields
    if (!name || !description || !endpoint || !documentation || !pricing || !category) {
      return errorResponse(res, 'All fields are required', 400);
    }
    
    // Create the API with the provider set to the current user
    const api = await Api.create({
      name,
      description,
      provider: req.user._id, // From auth middleware
      endpoint,
      documentation,
      pricing,
      category,
      isActive: true
    });
    
    return successResponse(res, api, 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// Get all APIs (for marketplace)
const getAllApis = async (req, res) => {
  try {
    const apis = await Api.find({ isActive: true })
      .populate('provider', 'username email')
      .sort({ createdAt: -1 });
    
    return successResponse(res, apis);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// Get APIs by provider
const getApisByProvider = async (req, res) => {
  try {
    const apis = await Api.find({ provider: req.user._id })
      .sort({ createdAt: -1 });
    
    return successResponse(res, apis);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// Get API by ID
const getApiById = async (req, res) => {
  try {
    // Clean the ID parameter
    const apiId = req.params.id.replace(/^:/, '');
    
    const api = await Api.findById(apiId)
      .populate('provider', 'username email');
    
    if (!api) {
      return errorResponse(res, 'API not found', 404);
    }
    
    return successResponse(res, api);
  } catch (error) {
    console.error('Get API by ID error:', error);
    return errorResponse(res, error.message, 500);
  }
};

// Update API
const updateApi = async (req, res) => {
  try {
    const { name, description, endpoint, documentation, pricing, category, isActive } = req.body;
    
    // Clean the ID parameter - remove any colon prefix if present
    const apiId = req.params.id.replace(/^:/, '');
    
    // Find the API
    const api = await Api.findById(apiId);
    
    if (!api) {
      return errorResponse(res, 'API not found', 404);
    }
    
    // Check if the current user is the provider
    if (api.provider.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Not authorized to update this API', 403);
    }
    
    // Update the API
    if (name) api.name = name;
    if (description) api.description = description;
    if (endpoint) api.endpoint = endpoint;
    if (documentation) api.documentation = documentation;
    if (pricing) api.pricing = pricing;
    if (category) api.category = category;
    if (isActive !== undefined) api.isActive = isActive;
    api.updatedAt = Date.now();
    
    const updatedApi = await api.save();
    
    return successResponse(res, updatedApi);
  } catch (error) {
    console.error('Update API error:', error);
    return errorResponse(res, error.message, 500);
  }
};

// Delete API
const deleteApi = async (req, res) => {
  try {
    // Clean the ID parameter
    const apiId = req.params.id.replace(/^:/, '');
    
    const api = await Api.findById(apiId);
    
    if (!api) {
      return errorResponse(res, 'API not found', 404);
    }
    
    // Check if the current user is the provider
    if (api.provider.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Not authorized to delete this API', 403);
    }
    
    await api.deleteOne(); // Using deleteOne instead of remove which is deprecated
    
    return successResponse(res, { message: 'API removed' });
  } catch (error) {
    console.error('Delete API error:', error);
    return errorResponse(res, error.message, 500);
  }
};

// Get provider stats
const getProviderStats = async (req, res) => {
  try {
    // Count published APIs
    const publishedApis = await Api.countDocuments({ provider: req.user._id });
    
    // For now, return basic stats
    // In the future, you can add revenue calculations from transactions
    return successResponse(res, {
      publishedApis,
      totalRevenue: 0 // Placeholder for future implementation
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  createApi,
  getAllApis,
  getApisByProvider,
  getApiById,
  updateApi,
  deleteApi,
  getProviderStats
};