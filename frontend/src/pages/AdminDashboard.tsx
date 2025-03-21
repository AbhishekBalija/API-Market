import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Users, Database, BarChart } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [userCount, setUserCount] = useState<number>(0);

  const fetchUserCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/users/count',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if(data.success){
        setUserCount(data.data.usersCount);
      }
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token) {
      // Redirect to login if no token exists
      navigate('/admin');
      return;
    }
    
    // Fetch user count regardless of user data
    fetchUserCount();
    
    if (user && user !== 'undefined') {
      try {
        const parsedUser = JSON.parse(user);
        setUserData(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Handle invalid JSON by setting default admin data
        setUserData({ accountType: 'Admin' });
      }
    } else {
      // Set default user data if none exists
      setUserData({ accountType: 'Admin' });
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
            <span className="text-xl font-bold">APIMarket Admin</span>
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
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="mb-6 p-4 bg-card rounded-lg border">
          <p className="text-lg">Welcome, <span className="font-semibold">Admin</span></p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Total Users</h2>
            </div>
            <p className="text-3xl font-bold">{userCount}</p>
          </div>
          
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Active APIs</h2>
            </div>
            <p className="text-3xl font-bold">0</p>
          </div>
          
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Total Revenue</h2>
            </div>
            <p className="text-3xl font-bold">$0</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;