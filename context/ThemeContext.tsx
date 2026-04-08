import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark';

type ThemeContextType = {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: async () => {},
  toggleTheme: async () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeMode>('light');

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('themeMode');
      if (storedTheme === 'dark' || storedTheme === 'light') {
        setThemeState(storedTheme);
      }
    };

    loadTheme();
  }, []);

  const setTheme = async (mode: ThemeMode) => {
    await AsyncStorage.setItem('themeMode', mode);
    setThemeState(mode);
  };

  const toggleTheme = async () => {
    await setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
