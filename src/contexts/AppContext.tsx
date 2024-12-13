import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define the shape of the context state
interface AppContextType {
  count: number;
  increment: () => void;
  decrement: () => void;
}

// Create a context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a custom provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <AppContext.Provider value={{ count, increment, decrement }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context in components
// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
