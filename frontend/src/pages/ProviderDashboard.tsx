import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Server, BarChart2, PlusCircle } from 'lucide-react';

interface ApiType {
  _id: string;
  name: string;
  description: string;
  endpoint: string;
  category: string;
  pricing: {
    amount: number;
    currency: string;
    billingCycle: string;
  };
  isActive: boolean;
  createdAt: string;
}

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [publishedApis, setPublishedApis] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [apis, setApis] = useState<ApiType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProviderStats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:3000/api/apis/provider/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch provider stats');
      }

      const data = await response.json();
      if (data.success) {
        setPublishedApis(data.data.publishedApis);
        setTotalRevenue(data.data.totalRevenue || 0);
      }
    } catch (error) {
      console.error('Error fetching provider stats:', error);
    }
  };

  const fetchProviderApis = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:3000/api/apis/provider', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch provider APIs');
      }

      const data = await response.json();
      if (data.success) {
        setApis(data.data);
      }
    } catch (error) {
      console.error('Error fetching provider APIs:', error);
      setError('Failed to load your APIs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("ProviderDashboard mounted");
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    console.log("Token exists:", !!token);
    
    if (!token) {
      navigate('/login');
      return;
    }
    
    if (user && user !== 'undefined') {
      try {
        const parsedUser = JSON.parse(user);
        setUserData(parsedUser);
        console.log('Provider user data:', parsedUser);
        
        // Fetch provider stats and APIs
        fetchProviderStats();
        fetchProviderApis();
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-7xl px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6" />
            <span className="text-xl font-bold">APIMarket Provider</span>
          </div>
          <nav className="flex items-center gap-4">
            <button 
              onClick={handleLogout}
              className="text-sm font-medium bg-primary cursor-pointer text-white px-6 py-2.5 rounded-lg shadow-sm transition-colors hover:bg-primary/90 active:scale-95 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Provider Dashboard</h1>
        
        <div className="mb-6 p-4 bg-card rounded-lg border">
          <p className="text-lg">Welcome, <span className="font-semibold">{userData?.username || 'Provider'}</span></p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Server className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Published APIs</h2>
            </div>
            <p className="text-3xl font-bold">{publishedApis}</p>
          </div>
          
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Total Revenue</h2>
            </div>
            <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
          </div>
          
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <PlusCircle className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Publish New API</h2>
            </div>
            <button 
              onClick={() => navigate('/publish-api')}
              className="mt-2 text-sm font-medium bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
            >
              Create New API
            </button>
          </div>
        </div>
        
        {/* Published APIs Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Your Published APIs</h2>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-2 text-gray-500">Loading your APIs...</p>
            </div>
          ) : apis.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {apis.map((api) => (
                <div key={api._id} className="rounded-lg border bg-card p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{api.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${api.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {api.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-4 flex-grow">
                    {api.description.length > 100 
                      ? `${api.description.substring(0, 100)}...` 
                      : api.description}
                  </p>
                  
                  <div className="text-xs text-gray-500 mb-2">
                    Category: <span className="font-medium">{api.category}</span>
                  </div>
                  
                  <div className="text-sm font-medium mb-4">
                    {api.pricing.amount} {api.pricing.currency} / {api.pricing.billingCycle}
                  </div>
                  
                  <div className="flex justify-between mt-auto pt-4 border-t">
                    <button 
                      onClick={() => navigate(`/edit-api/${api._id}`)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => navigate(`/api-analytics/${api._id}`)}
                      className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1.5 rounded"
                    >
                      Analytics
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 border rounded-lg bg-gray-50">
              <p className="text-gray-500 mb-4">You haven't published any APIs yet.</p>
              <button 
                onClick={() => navigate('/publish-api')}
                className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
              >
                Publish Your First API
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;