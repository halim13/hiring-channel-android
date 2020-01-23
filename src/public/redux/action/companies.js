import axios from 'axios';
import config from '../../../public/config/config';
import {API_URL, BASE_URL} from 'react-native-dotenv';

export const fetchDataCompanies = (search, sort, order, page, limit) => ({
  type: 'FETCH_DATA_COMPANIES',
  payload: axios.get(
    `http://34.202.135.29:4000/api/v1/companies/?search=${search}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`,
  ),
});

export const loadMore = (search, sort, order, page, limit) => ({
  type: 'FETCH_LOAD_MORE_DATA_COMPANIES',
  payload: axios.get(
    `http://34.202.135.29:4000/api/v1/companies/?search=${search}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`,
  ),
});

export const fetchSingleData = id => ({
  type: 'FETCH_SINGLE_DATA_COMPANY',
  payload: axios.get(`http://34.202.135.29:4000/api/v1/company/${id}`),
});

export const updateCompany = (id, data, configs) => ({
  type: 'UPDATE_DATA_COMPANY',
  payload: axios.put(`http://34.202.135.29:4000/api/v1/company/${id}`, data, configs),
});

export const deleteCompany = id => ({
  type: 'DELETE_DATA_COMPANY',
  payload: axios.delete(`http://34.202.135.29:4000/api/v1/company/${id}`),
});

export const clearCompanies = data => ({
  type: 'CLEAR_COMPANIES',
  payload: [],
});

export const clearSingleCompany = data => ({
  type: 'CLEAR_SINGLE_COMPANY',
  payload: [],
});
