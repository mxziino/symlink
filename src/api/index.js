import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const fetchMedia = async () => {
  const response = await axios.get(`${API_URL}/media`);
  return response.data;
};

export const startScan = async (options) => {
  const response = await axios.post(`${API_URL}/scan`, options);
  return response.data;
};

export const fetchStatus = async () => {
  const response = await axios.get(`${API_URL}/status`);
  return response.data;
};

export const deleteSymlink = async (path) => {
  const response = await axios.post(`${API_URL}/symlink/delete`, { path });
  return response.data;
};

export const moveSymlink = async (path, destination) => {
  const response = await axios.post(`${API_URL}/symlink/move`, { path, destination });
  return response.data;
};