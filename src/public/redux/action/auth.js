import axios from 'axios';
import config from '../../../public/config/config';
import {API_URL, BASE_URL} from 'react-native-dotenv';
export const login = data => ({
  type: 'LOGIN',
  payload: axios.post('http://34.202.135.29:4000/api/v1/login', data),
});

export const register = data => ({
  type: 'REGISTER',
  payload: axios.post('http://34.202.135.29:4000/api/v1/register', data),
});

export const logout = data => ({
  type: 'LOGOUT',
  payload: [],
});
