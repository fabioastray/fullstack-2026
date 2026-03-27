import { type ReactNode, useState } from 'react'
import { AuthContext, type AuthContextType } from './auth.context'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const value: AuthContextType = {
    isLoggedIn,
    login: () => setIsLoggedIn(true),
    logout: () => setIsLoggedIn(false)
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
