import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  isLoggedIn: boolean;
  token: string | null;
  email: string | null;
  login: (token: string, email?: string | null) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  email: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const loadAuth = async () => {
      const [storedToken, storedEmail] = await Promise.all([
        AsyncStorage.getItem('token'),
        AsyncStorage.getItem('email'),
      ]);

      if (storedToken) setToken(storedToken);
      if (storedEmail) setEmail(storedEmail);
    };

    loadAuth();
  }, []);

  const login = async (t: string, userEmail: string | null = null) => {
    await AsyncStorage.setItem('token', t);
    if (userEmail) {
      await AsyncStorage.setItem('email', userEmail);
      setEmail(userEmail);
    }
    setToken(t);
  };

  const logout = async () => {
    await Promise.all([
      AsyncStorage.removeItem('token'),
      AsyncStorage.removeItem('email'),
    ]);
    setToken(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);