import React, { createContext } from "react";

// Create a context for user-related data
export const UserContext = createContext();

// UserProvider component to manage user-related state and provide it to the application
export const UserProvider = ({ children }) => {
  return (
    // Provide the user context to children
    <UserContext.Provider value={{}}>{children}</UserContext.Provider>
  );
};
