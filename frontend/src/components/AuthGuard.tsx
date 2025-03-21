import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export default function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    console.log('AuthGuard Check:', { token: !!token, user });

    if (!token) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }

    if (allowedRoles && user) {
      try {
        const userData = JSON.parse(user);
        console.log('User data:', userData);
        console.log('Allowed roles:', allowedRoles);
        console.log('User account type:', userData.accountType);

        if (!allowedRoles.includes(userData.accountType)) {
          console.log('User role not authorized');
          navigate('/');
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/login');
        return;
      }
    } else {
      setIsAuthorized(true);
    }
  }, [navigate, allowedRoles]);

  // Only render children when authorized
  return isAuthorized ? <>{children}</> : null;
}