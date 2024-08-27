import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    // 사용자 정보를 가져오는 함수
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user/me', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            // JWT 토큰이 있는 경우
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLoginClick = () => {
    navigate('/auth'); // /login 페이지로 이동
  };

  const handleLogoutClick = () => {
    // 로컬 스토리지에서 토큰 삭제
    localStorage.removeItem('token');
    // 로그아웃 후 로그인 페이지로 이동
    navigate('/auth');
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.nickname || user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Nickname: {user.nickname}</p>
          {user.field && <p>Field: {user.field}</p>} {/* field가 있는 경우에만 출력 */}
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
