import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  login, 
  logout, 
  register, 
  authListener 
} from '../services/firebase';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string;
  role: 'Senior' | 'Caregiver';
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string, role: 'Senior' | 'Caregiver') => Promise<void>;
  isAuthenticated: boolean;
  isDemo: boolean;
  switchToDemo: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDemo, setIsDemo] = useState<boolean>(() => {
    return localStorage.getItem('sahaara_demo_mode') === 'true';
  });

  useEffect(() => {
    // If Demo Mode is enabled, load mock Ramesh Kumar details and stop loading
    if (isDemo) {
      setUser({
        uid: 'demo-ramesh',
        email: 'ramesh@sahaara.com',
        displayName: 'Ramesh Kumar',
        role: 'Senior'
      });
      setLoading(false);
      return;
    }

    // Otherwise, listen to real Firebase Auth updates
    const unsubscribe = authListener((fbUser) => {
      if (fbUser) {
        let name = fbUser.displayName || '';
        let role: 'Senior' | 'Caregiver' = 'Caregiver';
        try {
          if (fbUser.displayName) {
            const parsed = JSON.parse(fbUser.displayName);
            if (parsed && typeof parsed === 'object') {
              name = parsed.name || name;
              role = parsed.role || role;
            }
          }
        } catch {
          // Fallback if displayName is not a JSON string
        }
        setUser({
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: name,
          role: role
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isDemo]);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      localStorage.removeItem('sahaara_demo_mode');
      setIsDemo(false);
      await login(email, password);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const handleRegister = async (email: string, password: string, name: string, role: 'Senior' | 'Caregiver') => {
    setLoading(true);
    try {
      localStorage.removeItem('sahaara_demo_mode');
      setIsDemo(false);
      await register(email, password, name, role);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      localStorage.removeItem('sahaara_demo_mode');
      setIsDemo(false);
      setUser(null);
      await logout();
    } finally {
      setLoading(false);
    }
  };

  const switchToDemo = () => {
    setLoading(true);
    localStorage.setItem('sahaara_demo_mode', 'true');
    setIsDemo(true);
    setUser({
      uid: 'demo-ramesh',
      email: 'ramesh@sahaara.com',
      displayName: 'Ramesh Kumar',
      role: 'Senior'
    });
    // Sign out from firebase if logged in
    logout().catch(() => {});
    setLoading(false);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login: handleLogin, 
        logout: handleLogout, 
        register: handleRegister, 
        isAuthenticated, 
        isDemo, 
        switchToDemo 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export default AuthContext;
