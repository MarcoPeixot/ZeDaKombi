// context/user-context.tsx
import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
  userType: string | null;
  setUserType: (userType: string) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userType, setUserType] = useState<string | null>(localStorage.getItem('userType'));

  const updateUserType = (newUserType: string) => {
    setUserType(newUserType);
    localStorage.setItem('userType', newUserType);
  };

  return (
    <UserContext.Provider value={{ userType, setUserType: updateUserType }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};