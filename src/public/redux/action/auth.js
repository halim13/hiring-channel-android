import axios from 'axios';
import config from '../../../public/config/config';
export const login = data => ({
  type: 'LOGIN',
  payload: axios.post(`${config.API_URL}/login`, data),
});

export const register = data => ({
  type: 'REGISTER',
  payload: axios.post(`${config.API_URL}/register`, data),
});

export const logout = data => ({
  type: 'LOGOUT',
  payload: [],
});
