import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const apiUrl = process.env.API || 'http://localhost:8000';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log("storedUser",storedUser !== "undefined" ? "storedUser undefined" : "undefined")
    const loggedUser = storedUser !== "undefined" ? JSON.parse(storedUser) : undefined;
    if (loggedUser) {
      console.log("loggedUser",loggedUser)
      setUser(loggedUser);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${apiUrl}/api/users/login`, { email, password });
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err.response.data.message);
    }
  };

  const register = async (username, email, password , role) => {
    try {
      const { data } = await axios.post(`${apiUrl}/api/users/register`, { username, email, password  ,role});
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err.response.data.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
