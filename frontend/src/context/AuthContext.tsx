import React, { createContext, useContext, useState, useEffect } from 'react';
const API_BASE_URL = `http://localhost:3000`

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

  const logout = async () => {
    setIsLoggedIn(false);
    setUser(null);
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });
      } catch (e) { /* ignore errors on purpose */ }
    }
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };

  const fetchUserInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        if (isLoggedIn) setIsLoggedIn(false);
        if (user) setUser(null);
        return;
    }
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.sub;

      const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch user info, token is likely invalid.');
      }

      const data = await res.json();
      setUser(data);
      if (!isLoggedIn) setIsLoggedIn(true);

    } catch (err) {
      console.error("Auth Error:", err);
      logout();
    }
  };
  
  const login = () => {
    setIsLoggedIn(true);
    // fetchUserInfo();
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserInfo();
    }
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
