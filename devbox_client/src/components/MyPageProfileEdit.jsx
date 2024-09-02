import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyPageProfileEdit.css';

function MyPageProfileEdit() {
  const [user, setUser] = useState({
    email: '',
    nickname: '',
    name: '',
    role: '',
    field: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
  const [emailConfirmation, setEmailConfirmation] = useState(''); // 이메일 확인 상태
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/user/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const frontendRole = data.role === 'ROLE_USER' ? '일반회원' : '수강생';
        setUser({ ...data, role: frontendRole });
      } else {
        if (response.status === 401) {
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

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dbRole = user.role === '일반회원' ? 'ROLE_USER' : 'ROLE_STUDENT';

    try {
      const response = await fetch('http://localhost:8080/api/user/update', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ ...user, role: dbRole }),
      });

      if (response.ok) {
        alert('회원정보가 성공적으로 수정되었습니다.');
        navigate('/mypage');
      } else {
        throw new Error('Failed to update user data');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      setError(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/user/delete', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.ok) {
        alert('회원 탈퇴가 완료되었습니다.');
        navigate('/auth'); // 탈퇴 후 로그인 페이지로 리디렉션
      } else {
        throw new Error('회원탈퇴에 실패하였습니다.');
      }
    } catch (error) {
      console.error('회원탈퇴에 실패하였습니다:', error);
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
    <div className="mypage-profile-edit mypage_content">
      <h2 className="title">회원정보 수정</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">이메일 :</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={user.email} 
            onChange={handleChange} 
            disabled 
          />
        </div>
        <div className="form-group">
          <label htmlFor="nickname">닉네임 :</label>
          <input 
            type="text" 
            id="nickname" 
            name="nickname" 
            value={user.nickname} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">이름 :</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={user.name} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">회원 유형 :</label>
          <select 
            id="role" 
            name="role" 
            value={user.role} 
            onChange={handleChange}
          >
            <option value="일반회원">일반회원</option>
            <option value="수강생">수강생</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="field">분야 :</label>
          <select 
            id="field" 
            name="field" 
            value={user.field} 
            onChange={handleChange}
          >
            <option value="web-dev">웹 개발자(Frontend & Backend Developer)</option>
            <option value="devops">데브옵스 엔지니어 (DevOps Engineer)</option>
            <option value="cloud">클라우드 엔지니어 (Cloud Engineer)</option>
            <option value="data-engineer">데이터 엔지니어 (Data Engineer)</option>
            <option value="mobile">모바일 개발자 (Mobile Developer)</option>
          </select>
        </div>
        <button type="submit" className="btn-save">저장</button>
      </form>
      <button onClick={() => setIsModalOpen(true)} className="btn-delete">회원 탈퇴</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>정말 탈퇴하시겠습니까?</h2>
            <p>탈퇴하려면 가입했던 이메일을 입력해주세요: {user.email}</p>
            <input 
              type="text" 
              placeholder="이메일 입력" 
              value={emailConfirmation} 
              onChange={(e) => setEmailConfirmation(e.target.value)} 
            />
            <button 
              onClick={handleDeleteAccount} 
              className="btn-confirm-delete" 
              disabled={emailConfirmation !== user.email}
            >
              탈퇴하기
            </button>
            <button onClick={() => setIsModalOpen(false)} className="btn-cancel">취소</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPageProfileEdit;
