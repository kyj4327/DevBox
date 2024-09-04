import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // 백엔드 서버 URL에 맞게 수정하세요

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

export const getCommentsByPostId = async (postId) => {
  const response = await axios.get(`${API_BASE_URL}/comments/post/${postId}`);
  return response.data;
};

export const createComment = async (postId, commentData) => {
  const response = await axios.post(`${API_BASE_URL}/comments/post/${postId}`, commentData);
  return response.data;
};

export const deleteComment = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/comments/${id}`);
  return response.data;
};