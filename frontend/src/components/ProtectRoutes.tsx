// components/ProtectRoutes.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string; // Role necessária para acessar a rota
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { token, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Token:', token);
    console.log('Role:', role);
    console.log('Required Role:', requiredRole);

    if (!token || (requiredRole && role !== requiredRole)) {
      navigate('/login');
    }
  }, [token, role, requiredRole, navigate]);

  return token ? <>{children}</> : null;
};