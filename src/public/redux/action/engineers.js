import axios from 'axios';
import config from '../../../public/config/config';

export const fetchData = (search, sort, order, page, limit) => ({
  type: 'FETCH_DATA_ENGINEERS',
  payload: axios.get(
    `${
      config.API_URL
    }/engineers/?search=${search}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`,
  ),
});
export const load = (search, sort, order, page, limit) => ({
  type: 'FETCH_LOAD_DATA_ENGINEERS',
  payload: axios.get(
    `${
      config.API_URL
    }/engineers/?search=${search}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`,
  ),
});

export const fetchSingleDataEngineer = id => ({
  type: 'FETCH_SINGLE_DATA_ENGINEER',
  payload: axios.get(`${config.API_URL}/engineer/${id}`),
});

export const updateEngineer = (id, data, configs) => ({
  type: 'UPDATE_DATA_ENGINEER',
  payload: axios.put(`${config.API_URL}/engineer/${id}`, data, configs),
});

export const deleteEngineer = id => ({
  type: 'DELETE_DATA_ENGINEER',
  payload: axios.delete(`${config.API_URL}/engineer/${id}`),
});
