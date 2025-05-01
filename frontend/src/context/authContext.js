import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { loginUser, registerUser } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      setUser(decoded.user);
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await loginUser({ email, password });
      setToken(response.token);
      navigate('/');
    } catch (err) {
      throw err;
    }
  };

  const signup = async (userData) => {
    try {
      const response = await registerUser(userData);
      setToken(response.token);
      navigate('/');
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);