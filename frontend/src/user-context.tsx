
import { createContext, useContext, useState } from "react";

interface UserContextType {
  userType: string | null;
  setUserType: (type: string) => void;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userType, setUserType] = useState<string | null>(localStorage.getItem("role"));

  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
