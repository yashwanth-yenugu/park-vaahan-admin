import React, { createContext, useContext, useState } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (credentials: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  const login = (credentials: User) => {
    // In a real app, you would validate credentials with an API
    setAuth({
      isAuthenticated: true,
      user: credentials,
    });
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}