import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "../components/context/UserContext";

import "./MyPageProfileEdit.css";

function MyPageProfileEdit() {
  const { user, loading, setUser, logout } = useUser();

  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailConfirmation, setEmailConfirmation] = useState("");
  const navigate = useNavigate();

  // 별도의 상태로 역할 관리
  const [selectedRole, setSelectedRole] = useState(
    user.role === "ROLE_USER"
      ? "일반회원"
      : user.role === "ROLE_STUDENT"
      ? "수강생"
      : ""
  );

  const handleChange = (e) => {
    let { name, value } = e.target;

    // 이름과 닉네임 입력 시 시작 공백 제거
    if (name === "name" || name === "nickname") {
      value = value.replace(/^\s+/, ""); // 시작 공백 제거
    }

    if (name === "role") {
      setSelectedRole(value);
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dbRole = selectedRole === "일반회원" ? "ROLE_USER" : "ROLE_STUDENT";

    // 이름과 닉네임의 공백 제거
    const trimmedNickname = user.nickname.trim();
    const trimmedName = user.name.trim();

    if (trimmedNickname === "" || trimmedName === "") {
      Swal.fire({
        icon: "error",
        title: "입력 오류",
        text: "이름과 닉네임은 시작에 공백이 있을 수 없습니다.",
      });
      return;
    }

    try {
      const response = await fetch("https://www.devback.shop/api/user/update", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          nickname: user.nickname,
          name: user.name,
          role: dbRole,
          field: user.field,
        }),
      });

      if (response.ok) {
        setUser({
          ...user,
          nickname: trimmedNickname,
          name: trimmedName,
        });

        await Swal.fire({
          icon: "success",
          title: "회원정보가 수정되었습니다.",
        });
        navigate("/mypage");
      } else {
        const errorData = await response.json(); // JSON 형식으로 파싱
        throw new Error(errorData.message || "Failed to update user data");
      }
    } catch (error) {
      if (error.message === "닉네임이 이미 사용 중입니다.") {
        Swal.fire({
          icon: "warning",
          title: "닉네임 중복",
          text: "입력하신 닉네임은 이미 사용 중입니다. 다른 닉네임을 선택해 주세요.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "오류",
          text:
            error.message ||
            "회원정보 수정에 실패했습니다. 다시 시도해 주세요.",
        });
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("https://www.devback.shop/api/user/delete", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.ok) {
        // 로그아웃 처리
        logout();

        await Swal.fire({
          icon: "success",
          title: "탈퇴 완료",
          text: "회원 탈퇴가 완료되었습니다.",
        });
        navigate("/auth"); // 탈퇴 후 로그인 페이지로 리디렉션
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "회원탈퇴에 실패하였습니다.");
      }
    } catch (error) {
      setError(error.message);
      await Swal.fire({
        icon: "error",
        title: "회원탈퇴에 실패하였습니다.",
        text: error.message || "다시 시도해 주세요.",
      });
    }
  };

  const confirmDeleteAccount = () => {
    Swal.fire({
      icon: "warning",
      title: "탈퇴하시겠습니까?",
      html: "회원 탈퇴는 취소할 수 없습니다.<br>탈퇴 시 작성했던 모든 글은 삭제됩니다.",
      showCancelButton: true,
      confirmButtonText: "탈퇴",
      confirmButtonColor: "#d33",
      cancelButtonText: "취소",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteAccount();
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mypage-content__wrapper">
      <div className="mypage-profile-edit__content">
        <h2 className="mypage-profile-edit__title">회원정보 수정</h2>
        <form className="mypage-profile-form" onSubmit={handleSubmit}>
          <div className="mypage-profile-edit__form-group">
            <label htmlFor="email">이메일 :</label>
            <input
              className="edit-input"
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled
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
              onChange={handleChange}
              required
              minLength={1}
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
              onChange={handleChange}
              required
              minLength={1}
            />
          </div>
          {/* 회원 유형 라디오 버튼 */}
          <div className="mypage-profile-edit__form-group">
            <label>회원 유형 :</label>
            <div className="mypage-profile-edit__radio-group">
              <label className="mypage-profile-edit__radio-label">
                <input
                  type="radio"
                  name="role"
                  value="일반회원"
                  checked={selectedRole === "일반회원"}
                  onChange={handleChange}
                />
                <span className="radio-text">일반회원</span>
              </label>

              <label className="mypage-profile-edit__radio-label">
                <input
                  type="radio"
                  name="role"
                  value="수강생"
                  checked={selectedRole === "수강생"}
                  onChange={handleChange}
                />
                <span className="radio-text">수강생</span>
              </label>
            </div>
          </div>
          <div className="mypage-profile-edit__form-group">
            <label htmlFor="field">분야 :</label>
            <select
              id="field"
              name="field"
              value={user.field}
              onChange={handleChange}
              style={{
                width: "400px",
                height: "46px",
                padding: "10px",
                border: "1px solid  #ccc",
                borderRadius: "5px",
              }}
            >
              <option value="non-developer">비개발자(non-developer)</option>
              <option value="web-dev">
                웹 개발자(Frontend & Backend Developer)
              </option>
              <option value="devops">
                데브옵스 엔지니어 (DevOps Engineer)
              </option>
              <option value="cloud">클라우드 엔지니어 (Cloud Engineer)</option>
              <option value="data-engineer">
                데이터 엔지니어 (Data Engineer)
              </option>
              <option value="mobile">모바일 개발자 (Mobile Developer)</option>
            </select>
          </div>

          <div className="mypage-profile-edit-footer_btn">
            <button type="submit" className="mypage-profile-edit__btn-save">
              저장
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mypage-profile-edit__btn-delete"
            >
              회원 탈퇴
            </button>
          </div>
        </form>

        {isModalOpen && (
          <div className="mypage-profile-edit__modal">
            <div className="mypage-profile-edit__modal-content">
              <button
                className="mypage-profile-edit__modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "red",
                  marginBottom: "20px",
                }}
              >
                {/* 경고 아이콘 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ width: "40px", height: "40px", marginRight: "10px" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M12 12h.01m-.01 8a9 9 0 100-18 9 9 0 000 18z"
                  />
                </svg>
                <h1
                  style={{ color: "red", fontSize: "24px", fontWeight: "bold" }}
                >
                  회원탈퇴
                </h1>
              </div>

              <h5 style={{ color: "darkred" }}>
                탈퇴하시면 작성하신 모든 게시글이 함께 삭제됩니다.
              </h5>

              <p>탈퇴하려면 가입했던 이메일을 입력해 주세요:</p>
              <p>
                <strong>{user.email}</strong>
              </p>

              <input
                type="text"
                placeholder="이메일 입력"
                value={emailConfirmation}
                style={{ width: "410px", marginBottom: "15px" }}
                onChange={(e) => setEmailConfirmation(e.target.value)}
              />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={confirmDeleteAccount}
                  className="mypage-profile-edit__btn-confirm-delete"
                  disabled={emailConfirmation !== user.email}
                >
                  탈퇴하기
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mypage-profile-edit__btn-cancel"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPageProfileEdit;
