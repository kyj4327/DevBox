import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./MyPageSideBar.css";
import profilePic from "../assets/img/profilePic.png";

function MyPageSideBar() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const response = await fetch("http://localhost:8080/api/user/me", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data);
    } else {
      if (response.status === 401) {
        navigate("/auth");
      }
    }
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case "ROLE_USER":
        return "일반회원";
      case "ROLE_STUDENT":
        return "수강생";
      default:
        return " ";
    }
  };

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="sidebar_profile mt-50">
      <div className="profile_user">
        <div className="user_author">
          <img src={profilePic} alt="author" />
          <div className="user_content">
            <h6 className="author_name">{user ? user.name : "Name"}</h6>
            <p className="user_role">
              {user ? getRoleDisplayName(user.role) : ""}
            </p>
          </div>
        </div>
        <div className="user_list">
          <ul>
            <li>
              <NavLink to="/mypage" end>
                <i className="fal fa-cog"></i> 나의 정보
              </NavLink>
            </li>
            <li>
              <NavLink to="/mypage/edit">
                <i className="fal fa-cog"></i> 회원정보 수정
              </NavLink>
            </li>
            <li>
              <NavLink to="/mypage/reservation/check">
                <i className="fal fa-layer-group"></i> 회의실 예약내역
              </NavLink>
            </li>

            <li className={`has-submenu ${isSubmenuOpen ? "open" : ""}`}>
              <button
                type="button"
                className="submenu-toggle"
                onClick={toggleSubmenu}
                aria-haspopup="true"
                aria-expanded={isSubmenuOpen}
              >
                <i className="fal fa-envelope"></i> 내가쓴 글
              </button>
              <ul className="submenu">
                <li>
                  <NavLink to="/mypage/gathermate/mylist">
                    <i className="fal fa-envelope"></i> - 모여라 메이트
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/mypage/reference/mylist">
                    <i className="fal fa-envelope"></i> - 추천해요
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/mypage/project/mylist">
                    <i className="fal fa-envelope"></i> - 프로젝트 자랑
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/mypage/myfreeboard">
                <i className="fal fa-envelope"></i> 자유게시판
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MyPageSideBar;
