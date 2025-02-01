import React, { createContext, useState } from "react";

// Create a context for user-related data
export const CurrencyContext = createContext();

// Create a context for user-related data
export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(null);

  const value = {
    currency,
    setCurrency,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Provide the user context to children
export const useCurrencyContext = () => {
  const context = React.useContext(CurrencyContext);
  if (!context) {
    throw new Error(
      "useCurrencyContext must be used within a CurrencyProvider"
    );
  }
  return context;
};
