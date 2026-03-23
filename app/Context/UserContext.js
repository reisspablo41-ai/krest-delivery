'use client';

import { createContext, useState, useContext, useEffect } from 'react';

// ─── Admin user ───────────────────────────────────────────
// Any authenticated user whose ID matches this value is
// treated as a super-admin across the application.
export const ADMIN_USER_ID = '4ea8273b-9049-4d15-9789-b64f30dbfed9';

// Create the UserContext
const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Load user from localStorage if exists
      }
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const [activeMenu, setActiveMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = user?.email;
  const isAdmin = user?.id === ADMIN_USER_ID;

  // Update local storage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user'); // Clear local storage on logout
    }
  }, [user]);

  // Function to log out user and clear storage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        errorMessage,
        setErrorMessage,
        activeMenu,
        setActiveMenu,
        email,
        isAdmin,
        isLoading,
        setIsLoading,
        logout, // Provide logout function
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => useContext(UserContext);
