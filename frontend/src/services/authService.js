import axios from 'axios';
import { login as loginUser, signup as registerUser } from '../services/authService';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth';

// Login user
export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

// Register user
export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};