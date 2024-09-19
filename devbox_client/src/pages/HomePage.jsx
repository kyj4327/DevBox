import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/user/me', {
        method: 'GET',
        credentials: 'include', // 쿠키를 포함하여 요청 보내기
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // 필요하다면 JWT 토큰 추가
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        // API 호출 실패 시 로그인 페이지로 리디렉션하거나 에러 처리
        if (response.status === 401) { // Unauthorized (인증되지 않음)
          navigate('/auth'); 
        } else {
          throw new Error('Failed to fetch user data');
        }
      }
    } catch (error) { 
      console.error('Error fetching user data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate('/auth');
  };
  const handleMyPageClick = () => {
    navigate('/mypage');
  };

  const handleGatherMateClick = () => {
    navigate('/gathermate/list');
  };

  const handleReferebceClick = () => {
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
    <button onClick={handleReferebceClick}>추천해요</button>
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
