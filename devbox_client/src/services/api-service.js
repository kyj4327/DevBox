import axios from "axios";

// 백엔드 서버 URL 설정
const API_BASE_URL = "https://www.devback.shop";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`, // API 경로를 baseURL에 포함
  withCredentials: true, // 자격증명(쿠키) 포함
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: 모든 요청이 보내지기 전에 실행됩니다.
apiClient.interceptors.request.use((config) => {
  // localStorage에서 accessToken을 가져옵니다.
  const token = localStorage.getItem("accessToken");
  // 토큰이 존재하면 Authorization 헤더에 추가합니다.
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: 모든 응답을 받은 후에 실행됩니다.
apiClient.interceptors.response.use(
  (response) => {
    // 정상 응답은 그대로 반환합니다.
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러(토큰 만료)이고, 아직 재시도하지 않은 요청일 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 플래그를 설정하여 무한 재시도를 방지합니다.

      try {
        // 토큰 재발급을 위한 요청을 보냅니다.
        const reissueResponse = await axios.post(`${API_BASE_URL}/reissue`, {}, {
          withCredentials: true, // RefreshToken 쿠키를 보내기 위해 필수입니다.
        });

        // 응답 헤더에서 새로운 accessToken을 추출합니다.
        const newAccessToken = reissueResponse.headers.authorization.split(' ')[1];
        
        // localStorage와 apiClient의 기본 헤더에 새로운 토큰을 저장합니다.
        localStorage.setItem("accessToken", newAccessToken);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

        // 원래 요청의 헤더도 새로운 토큰으로 교체합니다.
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // 원래 실패했던 요청을 새로운 토큰으로 다시 시도합니다.
        return apiClient(originalRequest);

      } catch (reissueError) {
        // RefreshToken도 만료되어 재발급에 실패한 경우
        console.error("Session expired. Please login again.", reissueError);
        // 토큰을 삭제하고 로그인 페이지로 보냅니다.
        localStorage.removeItem("accessToken");
        window.location.href = '/auth'; 
        return Promise.reject(reissueError);
      }
    }

    // 401 에러가 아니거나, 재시도 요청인 경우 에러를 그대로 반환합니다.
    return Promise.reject(error);
  }
);


// 이하 기존 API 함수들은 그대로 유지됩니다.

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

// 좋아요 토글 기능
export const toggleLike = async (postId) => {
  try {
    const response = await apiClient.post(`/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error("Error toggling like:", error);
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

// 댓글 수정
export const editComment = async (id, commentData) => {
  try {
    const response = await apiClient.patch(`/comments/${id}`, commentData);
    return response.data;
  } catch (error) {
    console.error("Error editing comment:", error);
    throw error;
  }
};

export const getUserPosts = async (userId) => {
  try {
    const response = await apiClient.get(`/posts/user/${userId}`); // 사용자 ID에 따른 게시글 요청
    return response.data;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
};