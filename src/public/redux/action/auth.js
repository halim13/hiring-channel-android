import axios from 'axios';
import config from '../../../public/config/config';
import {API_URL, BASE_URL} from 'react-native-dotenv';
export const login = data => ({
  type: 'LOGIN',
  payload: axios.post(`${API_URL}/login`, data),
});

export const register = data => ({
  type: 'REGISTER',
  payload: axios.post(`${API_URL}/register`, data),
});

export const logout = data => ({
  type: 'LOGOUT',
  payload: [],
});
