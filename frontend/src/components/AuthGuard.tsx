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


    if (!token) {
      navigate('/login');
      return;
    }

    if (allowedRoles && user) {
      try {
        const userData = JSON.parse(user);

        if (!allowedRoles.includes(userData.accountType)) {
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