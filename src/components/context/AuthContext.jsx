import React, { createContext, useEffect, useState, useContext } from 'react';
import { isTokenExpired } from '../../utils/tokenUtils';
import AppPreloader from '../common/AppPreloader';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState([]);
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only read token and role from localStorage.
    // Query parameter injection (?token=...&role=...) is disabled for security compliance.
    let currentToken = localStorage.getItem('token');

    const currentPath = window.location.pathname;

    if ((!currentToken || isTokenExpired(currentToken)) && currentPath !== '/login') {
      localStorage.clear();
      setToken(null);
      setUser(null);
      setRole([]);
      setRoles([]);
      window.location.href = '/login';
      return;
    }

    setToken(currentToken);

    const savedRole = localStorage.getItem('role');
    if (savedRole) {
      try {
        const parsedRole = JSON.parse(savedRole);
        setRole(Array.isArray(parsedRole) ? parsedRole : []);
      } catch {
        setRole([]);
      }
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }

    const storedRoles = localStorage.getItem('role');
    if (storedRoles) {
      try {
        setRoles(JSON.parse(storedRoles));
      } catch {
        setRoles([]);
      }
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ token, role, roles, user, loading }}>
      <AppPreloader loading={loading} />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
