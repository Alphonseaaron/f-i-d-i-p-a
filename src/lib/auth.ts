import { useState, useEffect } from 'react';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@fidipa.org';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || '123Fidipa#';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const session = localStorage.getItem('fidipa_session');
    setAuthState({
      isAuthenticated: !!session,
      isLoading: false,
      error: null
    });
  }, []);

  const login = async (email: string, password: string) => {
    try {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const session = { email, timestamp: Date.now() };
        localStorage.setItem('fidipa_session', JSON.stringify(session));
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
        return true;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        error: 'Invalid credentials'
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('fidipa_session');
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  };

  return {
    ...authState,
    login,
    logout
  };
}