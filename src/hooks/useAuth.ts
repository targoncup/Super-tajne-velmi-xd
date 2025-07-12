import { useState, useEffect } from 'react';
import { ADMIN_CONFIG } from '../config/admin';

const AUTH_STORAGE_KEY = 'targon_cup_admin_auth';

interface AuthState {
  isAuthenticated: boolean;
  loginTime: number | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    loginTime: null,
  });

  useEffect(() => {
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (savedAuth) {
      try {
        const parsedAuth: AuthState = JSON.parse(savedAuth);
        const now = Date.now();
        
        // Check if session is still valid
        if (parsedAuth.loginTime && (now - parsedAuth.loginTime) < ADMIN_CONFIG.sessionTimeout) {
          setAuthState(parsedAuth);
        } else {
          // Session expired
          logout();
        }
      } catch (error) {
        console.error('Error parsing auth state:', error);
        logout();
      }
    }
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_CONFIG.password) {
      const newAuthState: AuthState = {
        isAuthenticated: true,
        loginTime: Date.now(),
      };
      setAuthState(newAuthState);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newAuthState));
      return true;
    }
    return false;
  };

  const logout = () => {
    const newAuthState: AuthState = {
      isAuthenticated: false,
      loginTime: null,
    };
    setAuthState(newAuthState);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return {
    isAuthenticated: authState.isAuthenticated,
    login,
    logout,
  };
};