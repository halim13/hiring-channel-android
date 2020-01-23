import axios from 'axios';
import config from '../../../public/config/config';

export const fetchData = (search, sort, order, page, limit) => ({
  type: 'FETCH_DATA_ENGINEERS',
  payload: axios.get(
    `http://34.202.135.29:4000/api/v1/engineers/?search=${search}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`,
  ),
});

export const loadMore = (search, sort, order, page, limit) => ({
  type: 'FETCH_LOAD_MORE_DATA_ENGINEERS',
  payload: axios.get(
    `http://34.202.135.29:4000/api/v1/engineers/?search=${search}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`,
  ),
});

export const fetchSingleDataEngineer = id => ({
  type: 'FETCH_SINGLE_DATA_ENGINEER',
  payload: axios.get(`http://34.202.135.29:4000/api/v1/engineer/${id}`),
});

export const updateEngineer = (id, data, configs) => ({
  type: 'UPDATE_DATA_ENGINEER',
  payload: axios.put(`http://34.202.135.29:4000/api/v1/engineer/${id}`, data, configs),
});

export const deleteEngineer = (id, old_photo) => ({
  type: 'DELETE_DATA_ENGINEER',
  payload: axios.delete(`http://34.202.135.29:4000/api/v1/engineer/${id}/${old_photo}`),
  data: old_photo,
});

export const clearEngineers = data => ({
  type: 'CLEAR_ENGINEERS',
  payload: [],
});

export const clearSingleEngineer = data => ({
  type: 'CLEAR_SINGLE_ENGINEER',
  payload: [],
});
