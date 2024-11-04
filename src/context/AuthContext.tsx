import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthState } from "../types";

interface AuthContextType extends AuthState {
  login: (credentials: User) => void;
  logout: () => void;
}

const LOCAL_STORAGE_KEY = "auth_state";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Initialize state from sessionStorage if available, otherwise use default values
  const [auth, setAuth] = useState<AuthState>(() => {
    const savedAuth = sessionStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedAuth) {
      try {
        return JSON.parse(savedAuth);
      } catch (error) {
        console.error("Failed to parse auth state from sessionStorage:", error);
        return { isAuthenticated: false, user: null };
      }
    }
    return { isAuthenticated: false, user: null };
  });

  // Update sessionStorage whenever auth state changes
  useEffect(() => {
    sessionStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(auth));
  }, [auth]);

  const login = (credentials: User) => {
    // In a real app, you would validate credentials with an API
    const newAuthState = {
      isAuthenticated: true,
      user: credentials,
    };
    setAuth(newAuthState);
  };

  const logout = () => {
    const newAuthState = {
      isAuthenticated: false,
      user: null,
    };
    setAuth(newAuthState);
    // Optionally clear sessionStorage on logout
    sessionStorage.removeItem(LOCAL_STORAGE_KEY);
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
