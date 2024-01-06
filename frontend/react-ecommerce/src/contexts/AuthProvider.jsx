import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {

    // const [user, setUser] = useState(null)
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true)
    // const [token, setToken] = useState(localStorage.getItem('token') || '');

    const login = async (email, password) => {
      setLoading(true)
      try {
        const response = await axios.post(' http://127.0.0.1:5000/auth/login', { email, password });
        const accessToken = response.data.access_token;
        localStorage.setItem('token', accessToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        setAuthenticated(true);
      } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
      }
    };

    useEffect(() => {
      // Check if the user is already authenticated
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuthenticated(true);
      }
      setLoading(false);
    }, []);


    const signup = async (username, email, password) => {
        try {
          const response = await axios.post('http://127.0.0.1:5000/auth/sign-up', { username, email, password });
        } catch (error) {
          console.error('Login error:', error.response ? error.response.data : error.message);
        }
    };
   

    const logout = () => {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setAuthenticated(false);
    };


    const authInfo = {
        authenticated,
        loading,
        signup,
        login,
        logout
    }

  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider