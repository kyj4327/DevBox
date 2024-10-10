import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Access Token 재발급 함수
  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await fetch("https://www.devback.shop/reissue", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const authHeader = response.headers.get("Authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
          const newAccessToken = authHeader.split(" ")[1];
          setAccessToken(newAccessToken);
          localStorage.setItem("accessToken", newAccessToken);
          return true;
        } else {
          return false;
        }
      } else {
        setUser(null);
        navigate("/auth");
        return false;
      }
    } catch (error) {
      setUser(null);
      navigate("/auth");
      return false;
    }
  }, [navigate]);

  // 사용자 상태 확인 및 토큰 설정 함수
  useEffect(() => {
    const checkUserStatus = async () => {
      // URL에서 해시 부분을 통해 액세스 토큰 추출
      const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const token = params.get("accessToken");
        if (token) {
          setAccessToken(token);
          localStorage.setItem("accessToken", token);
          window.history.replaceState(null, null, window.location.pathname);
        }
      }

      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://www.devback.shop/api/user/me", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const userInfo = await response.json();
          setUser(userInfo);
        } else if (response.status === 401) {

          // Access Token 만료 시 Refresh Token을 사용하여 재발급
          const refreshed = await refreshAccessToken();
          if (refreshed) {

            const newAccessToken = localStorage.getItem("accessToken");
            if (newAccessToken) {
              const retryResponse = await fetch(
                "https://www.devback.shop/api/user/me",
                {
                  method: "GET",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${newAccessToken}`,
                  },
                }
              );

              if (retryResponse.ok) {
                const userInfo = await retryResponse.json();
                setUser(userInfo);
              } else {
                setUser(null);
                if (location.pathname !== "/auth") {
                  navigate("/auth");
                }
              }
            }
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
        if (location.pathname !== "/auth") {
          navigate("/auth");
        }
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, [accessToken, refreshAccessToken, navigate, location.pathname]);

  // 로그인 함수
  const login = async (credentials) => {
    try {
      const response = await fetch("https://www.devback.shop/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const authHeader = response.headers.get("Authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
          const token = authHeader.split(" ")[1];
          setAccessToken(token);
          localStorage.setItem("accessToken", token);
          // 사용자 정보 가져오기
          const userInfoResponse = await fetch(
            "https://www.devback.shop/api/user/me",
            {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (userInfoResponse.ok) {
            const userInfo = await userInfoResponse.json();
            setUser(userInfo);
          }
        }
        navigate("/home");
      } else {
        setUser(null);
        Swal.fire({
          icon: "error",
          title: "로그인에 실패했습니다.",
          text: "다시 시도해 주세요."
        });
      }
    } catch (error) {
      setUser(null);
      Swal.fire({
        icon: "error",
        title: "로그인 중 오류가 발생했습니다.",
        text: "다시 시도해 주세요."
      });
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      const response = await fetch("https://www.devback.shop/logout", {
        // 로그아웃 엔드포인트
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("accessToken");
        navigate("/auth");
      } else {
        throw new Error("Failed to log out");
      }
    } catch (error) {
      // 필요한 경우 에러 상태 추가
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        accessToken,
        setAccessToken,
        loading,
        setLoading,
        refreshAccessToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
