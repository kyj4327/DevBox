import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../src/components/context/UserContext';

function HomePage() {
  const { setAccessToken, refreshAccessToken, setUser, user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // 토큰이 있으면 사용자 정보를 가져오는 함수
  const fetchUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/user/me", {
        method: "GET",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.ok) {
        const userInfo = await response.json();
        setUser(userInfo);
      } else if (response.status === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
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
              navigate('/auth');
            }
          }
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("사용자 정보 가져오기 에러:", error);
      setUser(null);
      navigate('/auth');
    } finally {
      setLoading(false);  // 로딩 상태 업데이트
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    console.log("URL Hash:", hash);

    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('accessToken');
      console.log("Access Token:", accessToken);
      if (accessToken) {
        setAccessToken(accessToken);
        localStorage.setItem('accessToken', accessToken);
        window.history.replaceState(null, null, location.pathname);
        fetchUserInfo();  // 사용자 정보 가져오기
      }
    } else {
      const token = localStorage.getItem('accessToken');
      if (token) {
        setAccessToken(token);
        fetchUserInfo();  // 토큰이 있으면 사용자 정보 가져오기
      } else {
        setLoading(false);  // 토큰이 없으면 바로 로딩 종료
      }
    }
  }, [location.hash, setAccessToken, location.pathname, fetchUserInfo]);

  const handleLoginClick = () => {
    navigate('/auth');
  };
  const handleMyPageClick = () => {
    navigate('/mypage');
  };
  const handleGatherMateClick = () => {
    navigate('/gathermate/list');
  };
  const handleReferenceClick = () => {
    navigate('/reference/list');
  };
  const handleProjectClick = () => {
    navigate('/project/list');
  };

  const handleLogoutClick = async () => {
    try {
      const response = await fetch('http://localhost:8080/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem('accessToken');
        setUser(null);
        navigate('/auth');
      } else {
        throw new Error('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home-page-wrapper">
      <h1>Welcome to the Home Page</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.nickname}</h2>
          <p>Name: {user.name}</p> 
          <p>Email: {user.email}</p>
          <button onClick={handleMyPageClick}>마이 페이지로 이동</button>
          <button onClick={handleGatherMateClick}>모여라메이트</button>
          <button onClick={handleReferenceClick}>추천해요</button>
          <button onClick={handleProjectClick}>프로젝트자랑</button>

          <button onClick={handleLogoutClick}>로그아웃</button>
        </div>
      ) : (
        <div>
          <p>로그인 또는 회원가입을 진행하려면 위의 메뉴를 이용하세요.</p>
          <button onClick={handleLoginClick}>로그인 페이지로 이동</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
