// src/services/authService.js

import axios from 'axios';

// Base URL for the backend API 
const API_URL = 'http://localhost:5000/api'; 

// Function to send a POST request for registering a new user
export const register = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

// Function to send a POST request for logging in an existing user
export const login = async (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};
