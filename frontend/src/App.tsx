import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import PublishApiPage from './pages/PublishApiPage';
import AuthGuard from './components/AuthGuard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        
        <Route path="/adminDashboard" element={
          <AuthGuard allowedRoles={['Admin']}>
            <AdminDashboard />
          </AuthGuard>
        } />
        
        <Route path="/customerDashboard" element={
          <AuthGuard allowedRoles={['Customer']}>
            <CustomerDashboard />
          </AuthGuard>
        } />
        
        <Route path="/providerDashboard" element={
          <AuthGuard allowedRoles={['API Provider']}>
            <ProviderDashboard />
          </AuthGuard>
        } />
        
        <Route path="/publish-api" element={
          <AuthGuard allowedRoles={['API Provider']}>
            <PublishApiPage />
          </AuthGuard>
        } />
      </Routes>
    </Router>
  );
}

export default App;
