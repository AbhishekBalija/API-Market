import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Package, ShoppingCart, CreditCard } from 'lucide-react';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [purchasedApis, setPurchasedApis] = useState<number>(0);

  useEffect(() => {
    console.log("CustomerDashboard mounted");
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
        console.log('Customer user data:', parsedUser);
        
        // In the future, you can fetch purchased APIs here
        // fetchPurchasedApis();
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
            <span className="text-xl font-bold">APIMarket Customer</span>
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
        <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>
        
        <div className="mb-6 p-4 bg-card rounded-lg border">
          <p className="text-lg">Welcome, <span className="font-semibold">{userData?.username || 'Customer'}</span></p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Purchased APIs</h2>
            </div>
            <p className="text-3xl font-bold">{purchasedApis}</p>
          </div>
          
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">API Marketplace</h2>
            </div>
            <button 
              onClick={() => navigate('/marketplace')}
              className="mt-2 text-sm font-medium bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
            >
              Browse APIs
            </button>
          </div>
          
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Billing</h2>
            </div>
            <button 
              onClick={() => navigate('/billing')}
              className="mt-2 text-sm font-medium bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
            >
              Manage Billing
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;