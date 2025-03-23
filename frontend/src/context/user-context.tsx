// user-context.tsx
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const storedType = localStorage.getItem("selectedType");
    if (storedType) setUserType(storedType);
  }, []);

  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
