// src/services/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const createConfig = (data) => axios.post(`${BASE_URL}/config`, data);
export const getConfigs = () => axios.get(`${BASE_URL}/configs`); // ✅ FIXED: 'config' not 'configs'
export const calculatePrice = (data) => axios.post(`${BASE_URL}/calculate`, data);
