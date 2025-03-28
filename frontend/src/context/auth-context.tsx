// src/context/auth-context.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  role: string | null;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  login: (token: string, role: string, user: {id: string, name: string, email: string}) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<{id: string, name: string, email: string} | null>(null);

  const login = (newToken: string, newRole: string, userData: {id: string, name: string, email: string}) => {
    setToken(newToken);
    setRole(newRole);
    setUser(userData);
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', newRole);
    localStorage.setItem('userId', userData.id);
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userEmail', userData.email);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    const storedUserId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('userName');
    const storedUserEmail = localStorage.getItem('userEmail');

    if (storedToken && storedRole && storedUserId && storedUserName && storedUserEmail) {
      setToken(storedToken);
      setRole(storedRole);
      setUser({
        id: storedUserId,
        name: storedUserName,
        email: storedUserEmail
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Certifique-se de que esta exportação está presente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};