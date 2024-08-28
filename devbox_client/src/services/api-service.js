import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

export const getAllPosts = async () => {
  const response = await axios.get(`${API_BASE_URL}/posts`);
  return response.data;
};

export const getPost = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
  return response.data;
};

export const createPost = async (postData) => {
  const response = await axios.post(`${API_BASE_URL}/posts`, postData);
  return response.data;
};

export const updatePost = async (id, postData) => {
  const response = await axios.put(`${API_BASE_URL}/posts/${id}`, postData);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/posts/${id}`);
  return response.data;
};