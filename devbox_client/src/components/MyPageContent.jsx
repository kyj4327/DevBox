import React, { useEffect, useState } from "react";
import "./MyPageContent.css";
import { useNavigate } from "react-router-dom";

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
      const response = await fetch("http://localhost:8080/api/user/me", {
        method: "GET",
        credentials: "include", // 쿠키를 포함하여 요청 보내기
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // 필요하다면 JWT 토큰 추가
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // 여기서 role이 제대로 포함되어 있는지 확인

        setUser(data);
      } else {
        if (response.status === 401) {
          // Unauthorized (인증되지 않음)
          navigate("/auth");
        } else {
          throw new Error("Failed to fetch user data");
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // role -> 프런트 표시용 단어로 변환
  const getRoleDisplayName = (role) => {
    switch (role) {
      case "ROLE_USER":
        return "일반인";
      case "ROLE_STUDENT":
        return "수강생";
      case "ROLE_ADMIN":
        return "관리자";
      default:
        return "알 수 없음";
    }
  };
  // field -> 프런트 표시용 단어로 변환
  const getFieldDisplayName = (field) => {
    if (field === null) return "";
    switch (field) {
      case "web-dev":
        return "웹 개발자(Frontend & Backend Developer)";
      case "devops":
        return "데브옵스 엔지니어 (DevOps Engineer)";
      case "cloud":
        return "클라우드 엔지니어 (Cloud Engineer)";
      case "data-engineer":
        return "데이터 엔지니어 (Data Engineer)";
      case "mobile":
        return "모바일 개발자 (Mobile Developer)";
      default:
        return field;
    }
  };

  return (
    <div className="mypage-content__wrapper">
      <div className="mypage-content__title-wrapper">
        <h5 className="mypage-content__title">나의 정보</h5>
      </div>
      {user ? (
        <div className="mypage-content__user-info">
          <div className="mypage-profile-edit__form-group">
            <label htmlFor="email">이메일 :</label>
            <input
              className="edit-input"
              type="email"
              id="email"
              name="email"
              value={user.email}
              readOnly
            />
          </div>

          <div className="mypage-profile-edit__form-group">
            <label htmlFor="name">이름 :</label>
            <input
              className="edit-input"
              type="text"
              id="name"
              name="name"
              value={user.name}
              readOnly
            />
          </div>
          <div className="mypage-profile-edit__form-group">
            <label htmlFor="nickname">닉네임 :</label>
            <input
              className="edit-input"
              type="text"
              id="nickname"
              name="nickname"
              value={user.nickname}
              readOnly
            />
          </div>

          <div className="mypage-profile-edit__form-group">
            <label>회원 유형 :</label>
            <input
              className="edit-input"
              type="text"
              id="nickname"
              name="nickname"
              value={getRoleDisplayName(user.role)}
              readOnly
            />
          </div>
          <div className="mypage-profile-edit__form-group">
            <label htmlFor="field">분야 :</label>
            <input
              className="edit-input"
              type="text"
              id="nickname"
              name="nickname"
              value={getFieldDisplayName(user.field)}
              readOnly
            />
          </div>
          <div className="mypage-profile-nav" >
          <button
              type="submit"
              className="mypage-profile-edit__btn-save"
              onClick={() => navigate("/mypage/edit")}
            >
              회원정보 수정
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>로그인 정보가 없습니다.</p>
        </div>
      )}
    </div>
  );
}

export default MyPageContent;
