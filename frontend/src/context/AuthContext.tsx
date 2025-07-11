import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserInfo {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  user: UserInfo | null;
  fetchUserInfo: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem('token');
  });
  const [user, setUser] = useState<UserInfo | null>(null);

  const fetchUserInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      // Decode token to get user id
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.sub;
      const res = await fetch(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch user info');
      const data = await res.json();
      setUser(data);
    } catch (err) {
      setUser(null);
    }
  };

  const login = () => {
    setIsLoggedIn(true);
    fetchUserInfo();
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setUser(null);
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });
      } catch (e) { /* ignore errors */ }
    }
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };

  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorage);
    if (isLoggedIn) fetchUserInfo();
    return () => window.removeEventListener('storage', handleStorage);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user, fetchUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
