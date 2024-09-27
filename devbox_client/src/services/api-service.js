import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor
apiClient.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      // Implement your token refresh logic here
      const newToken = await refreshToken();
      localStorage.setItem('accessToken', newToken);
      originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      // Handle refresh token error (e.g., redirect to login)
      return Promise.reject(refreshError);
    }
  }
  return Promise.reject(error);
});

// Helper function to handle errors
const handleError = (error, customErrorMessage) => {
  console.error(customErrorMessage, error);
  if (error.response) {
    throw new Error(error.response.data.message || 'An error occurred');
  } else if (error.request) {
    throw new Error('No response received from server');
  } else {
    throw error;
  }
};

// API functions
export const getAllPosts = async () => {
  try {
    const response = await apiClient.get('/posts');
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching posts:');
  }
};

export const getPost = async (id) => {
  try {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching post:');
  }
};

export const createPost = async (postData) => {
  try {
    const response = await apiClient.post('/posts/write', postData);
    return response.data;
  } catch (error) {
    handleError(error, 'Error creating post:');
  }
};

export const updatePost = async (id, postData) => {
  try {
    const response = await apiClient.put(`/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    handleError(error, 'Error updating post:');
  }
};

export const deletePost = async (id) => {
  try {
    const response = await apiClient.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error deleting post:');
  }
};

export const getCommentsByPostId = async (postId) => {
  try {
    const response = await apiClient.get(`/comments/post/${postId}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching comments:');
  }
};

export const createComment = async (postId, commentData) => {
  try {
    const response = await apiClient.post(`/comments/post/write/${postId}`, commentData);
    return response.data;
  } catch (error) {
    handleError(error, 'Error creating comment:');
  }
};

export const deleteComment = async (id) => {
  try {
    const response = await apiClient.delete(`/comments/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error deleting comment:');
  }
};

// Implement your token refresh logic
const refreshToken = async () => {
  // Implement your token refresh logic here
  // This could involve making a request to your auth server to get a new token
  // Return the new token
};