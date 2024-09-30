import React, { useEffect, useState } from 'react';
import './MyPageContent.css';
import MyPageBox from './MyPageBox';
import { useNavigate } from 'react-router-dom';

function MyPageContent() {
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
        console.log(data); // 여기서 role이 제대로 포함되어 있는지 확인

        setUser(data);
      } else {
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

  // role -> 프런트용 단어로 변환
  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'ROLE_USER':
        return '일반회원';
      case 'ROLE_STUDENT':
        return '수강생';
      default:
        return ' ';
    }
  };


  return (
    <div className="mypage-content__wrapper">
      <div className="mypage-content__title-wrapper">
        <h5 className="mypage-content__title">나의 정보</h5>
      </div>
      {user ? (
        <div className="mypage-content__user-info">
          <p><strong>이메일:</strong> {user.email}</p>
          <p><strong>닉네임:</strong> {user.nickname}</p>
          <p><strong>이름:</strong> {user.name}</p>
          <p><strong>회원 유형:</strong> {getRoleDisplayName(user.role)}</p>
          <p><strong>분야:</strong> {user.field}</p>
        </div>
      ) : (
        <div>
          <p>로그인 정보가 없습니다.</p>
        </div>
      )}
      <div className="mypage-content__row">
        <div className="mypage-content__col">
          <MyPageBox icon="fal fa-file-alt" title="자유 게시판 : 3" />
        </div>
        <div className="mypage-content__col">
          <MyPageBox icon="fal fa-file-alt" title="프로젝트 자랑 : 3" />
        </div>
        <div className="mypage-content__col">
          <MyPageBox icon="fal fa-file-alt" title="모여라 메이트 : 3" />
        </div>

      </div>
    </div>
  );
}

export default MyPageContent;
