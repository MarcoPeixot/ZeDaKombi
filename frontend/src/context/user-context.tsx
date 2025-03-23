import { createContext, useContext, useState, ReactNode } from "react"

type UserType = "researcher" | "entrepreneur" | null

interface UserContextProps {
  userType: UserType
  setUserType: (type: UserType) => void
}

const UserContext = createContext<UserContextProps | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [userType, setUserType] = useState<UserType>(null)

  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error("useUser deve estar dentro de um UserProvider")
  return context
}
