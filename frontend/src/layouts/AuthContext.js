// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setLoggedIn] = useState(() => {
    // Initialize from localStorage or default to false
    return JSON.parse(localStorage.getItem('isLoggedIn')) || false;
  });

  const [userRole, setUserRole] = useState(() => {
    // Initialize from localStorage or default to null
    return localStorage.getItem('userRole') || null;
  });

  const updateAuthState = (loggedIn, role) => {
    setLoggedIn(loggedIn);
    setUserRole(role);

    // Update localStorage
    localStorage.setItem('isLoggedIn', JSON.stringify(loggedIn));
    localStorage.setItem('userRole', role);
  };

  useEffect(() => {
    // Redirect to login if not logged in
    const role = localStorage.getItem('userRole');
    if (!role) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setLoggedIn, userRole, setUserRole, updateAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
