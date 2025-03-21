import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, ArrowLeft } from 'lucide-react';

const PublishApiPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    endpoint: '',
    documentation: '',
    category: '',
    pricing: {
      amount: 0,
      currency: 'USD',
      billingCycle: 'monthly'
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('pricing.')) {
      const pricingField = name.split('.')[1];
      setFormData({
        ...formData,
        pricing: {
          ...formData.pricing,
          [pricingField]: pricingField === 'amount' ? parseFloat(value) : value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }
      
      const response = await fetch('http://localhost:3000/api/apis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to publish API');
      }
      
      setSuccess('API published successfully!');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        description: '',
        endpoint: '',
        documentation: '',
        category: '',
        pricing: {
          amount: 0,
          currency: 'USD',
          billingCycle: 'monthly'
        }
      });
      
      // Redirect to provider dashboard after 2 seconds
      setTimeout(() => {
        navigate('/providerDashboard');
      }, 2000);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-7xl px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6" />
            <span className="text-xl font-bold">APIMarket Provider</span>
          </div>
          <button 
            onClick={() => navigate('/providerDashboard')}
            className="text-sm font-medium text-primary flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
        </div>
      </header>
      
      <main className="container mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Publish New API</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              API Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="e.g., Weather API"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Describe what your API does and its features"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="endpoint" className="text-sm font-medium">
              API Endpoint URL *
            </label>
            <input
              id="endpoint"
              name="endpoint"
              type="url"
              required
              value={formData.endpoint}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="https://api.example.com/v1"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="documentation" className="text-sm font-medium">
              Documentation *
            </label>
            <textarea
              id="documentation"
              name="documentation"
              required
              value={formData.documentation}
              onChange={handleChange}
              rows={6}
              className="w-full px-3 py-2 border rounded-md font-mono text-sm"
              placeholder="# API Documentation
              
## Endpoints

GET /resource - Get all resources
POST /resource - Create a resource

## Authentication

This API uses API keys for authentication..."
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category *
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select a category</option>
              <option value="Weather">Weather</option>
              <option value="Finance">Finance</option>
              <option value="Social Media">Social Media</option>
              <option value="Entertainment">Entertainment</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Maps">Maps</option>
              <option value="AI">AI</option>
              <option value="Data">Data</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="pricing.amount" className="text-sm font-medium">
                Price *
              </label>
              <input
                id="pricing.amount"
                name="pricing.amount"
                type="number"
                min="0"
                step="0.01"
                required
                value={formData.pricing.amount}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="9.99"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="pricing.currency" className="text-sm font-medium">
                Currency
              </label>
              <select
                id="pricing.currency"
                name="pricing.currency"
                value={formData.pricing.currency}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="pricing.billingCycle" className="text-sm font-medium">
                Billing Cycle
              </label>
              <select
                id="pricing.billingCycle"
                name="pricing.billingCycle"
                value={formData.pricing.billingCycle}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="one-time">One-time</option>
              </select>
            </div>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 disabled:opacity-70"
            >
              {isSubmitting ? 'Publishing...' : 'Publish API'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PublishApiPage;