import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // 백엔드 서버 URL에 맞게 수정하세요

// 공통 설정: withCredentials와 Authorization 헤더를 axios 인스턴스에 추가
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 자격증명 포함
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Bearer 토큰 추가
  },
});

// Axios 요청 시마다 최신 토큰을 가져오도록 설정
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// 전체 게시글 가져오기
export const getAllPosts = async () => {
  try {
    const response = await apiClient.get("/posts");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// 특정 게시글 가져오기
export const getPost = async (id) => {
  try {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

// 게시글 생성
export const createPost = async (postData) => {
  try {
    const response = await apiClient.post("/posts/write", postData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// 게시글 업데이트
export const updatePost = async (id, postData) => {
  try {
    const response = await apiClient.put(`/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

// 게시글 삭제
export const deletePost = async (id) => {
  try {
    const response = await apiClient.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

// 특정 게시글에 해당하는 댓글 목록 가져오기
export const getCommentsByPostId = async (postId) => {
  try {
    const response = await apiClient.get(`/comments/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

// 댓글 생성
export const createComment = async (postId, commentData) => {
  try {
    const response = await apiClient.post(
      `/comments/post/write/${postId}`,
      commentData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

// 댓글 삭제
export const deleteComment = async (id) => {
  try {
    const response = await apiClient.delete(`/comments/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};
