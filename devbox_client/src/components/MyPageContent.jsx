import React, { useEffect, useState } from "react";
import "./MyPageContent.css";
import { useNavigate } from "react-router-dom";
import { useUser } from '../components/context/UserContext';

function MyPageContent() {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  
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
