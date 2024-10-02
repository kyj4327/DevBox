import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Access Token 재발급 함수
  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8080/reissue", {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const authHeader = response.headers.get("Authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
          const newAccessToken = authHeader.split(" ")[1];
          console.log('새로운 Access Token:', newAccessToken);
          setAccessToken(newAccessToken);
          localStorage.setItem('accessToken', newAccessToken);
          return true;
        } else {
          console.error('Authorization 헤더가 응답에 없습니다.');
          return false;
        }
      } else {
        console.error('토큰 재발급 실패:', response.status);
        setUser(null);
        navigate('/auth');
        return false;
      }
    } catch (error) {
      console.error("토큰 재발급 에러:", error);
      setUser(null);
      navigate('/auth');
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
        const token = params.get('accessToken');
        if (token) {
          setAccessToken(token);
          localStorage.setItem('accessToken', token);
          window.history.replaceState(null, null, window.location.pathname);
        }
      }

      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/user/me", {
          method: "GET",
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const userInfo = await response.json();
          setUser(userInfo);
        } else if (response.status === 401) {
          console.warn("Access Token 만료됨, 재발급 시도!");

          // Access Token 만료 시 Refresh Token을 사용하여 재발급
          const refreshed = await refreshAccessToken();
          if (refreshed) {
            console.log("토큰 재발급 성공, 사용자 정보 재요청");

            const newAccessToken = localStorage.getItem('accessToken');
            if (newAccessToken) {
              const retryResponse = await fetch("http://localhost:8080/api/user/me", {
                method: "GET",
                credentials: "include",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${newAccessToken}`,
                },
              });

              if (retryResponse.ok) {
                const userInfo = await retryResponse.json();
                setUser(userInfo);
              } else {
                setUser(null);
                if (location.pathname !== '/auth') {
                  navigate('/auth');
                }
              }
            }
          }
        } else {
          console.error("사용자 정보 가져오기 실패:", response.status);
          setUser(null);
        }
      } catch (error) {
        console.error("사용자 정보 가져오기 에러:", error);
        setUser(null);
        if (location.pathname !== '/auth') {
          navigate('/auth');
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
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const authHeader = response.headers.get("Authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
          const token = authHeader.split(" ")[1];
          setAccessToken(token);
          localStorage.setItem('accessToken', token);
          // 사용자 정보 가져오기
          const userInfoResponse = await fetch("http://localhost:8080/api/user/me", {
            method: "GET",
            credentials: "include",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          if (userInfoResponse.ok) {
            const userInfo = await userInfoResponse.json();
            setUser(userInfo);
          }
        }
        navigate('/home');
      } else {
        setUser(null);
        alert("로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      setUser(null);
      alert("로그인에 실패했습니다.");
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      const response = await fetch("http://localhost:8080/logout", { // 로그아웃 엔드포인트
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem('accessToken');
        navigate('/auth');
      } else {
        throw new Error('Failed to log out');
      }
    } catch (error) {
      console.error("로그아웃 에러:", error);
      // 필요한 경우 에러 상태 추가
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, accessToken, setAccessToken, loading, setLoading, refreshAccessToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
