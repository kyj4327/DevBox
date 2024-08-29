import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
const handleApiError = (error) => {
  console.error('API Error:', error.response || error);
  throw error;
};

export const getAllPosts = async () => {
    const response = await api.get('/posts');
    return response.data;
};

export const getPost = async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
};

export const createPost = async (postData) => {
    const response = await api.post('/posts', postData);
    return response.data;
};

export const updatePost = async (id, postData) => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
};

export const deletePost = async (id) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
};

export const getCommentsByPostId = async (postId) => {
  try {
      const response = await axios.get(`${API_BASE_URL}/comments/post/${postId}`);
      return response.data;
  } catch (error) {
      return handleApiError(error);
  }
};

export const createComment = async (commentData) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/comments`, commentData);
      return response.data;
  } catch (error) {
      return handleApiError(error);
  }
};

export const deleteComment = async (commentId) => {
  try {
      await axios.delete(`${API_BASE_URL}/comments/${commentId}`);
  } catch (error) {
      return handleApiError(error);
  }
};