import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./MyPageSideBar.css";
import profilePic from "../assets/img/profilePic.png";
import { useUser } from '../components/context/UserContext';

function MyPageSideBar() {
  const { user, loading } = useUser();
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const navigate = useNavigate();


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

  if (loading) return <div>로딩 중...</div>;

  if (!user) {
    navigate("/auth");
    return null;
  }
  
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
                <i className="mypageSideBar"></i> 나의 정보
              </NavLink>
            </li>
            <li>
              <NavLink to="/mypage/edit">
                <i className="mypageSideBar"></i> 회원정보 수정
              </NavLink>
            </li>
            <li>
              <NavLink to="/mypage/reservation/check">
                <i className="mypageSideBar"></i> 회의실 예약내역
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
                <i className="mypageSideBar"></i> 내가쓴 글
              </button>
              <ul className="submenu">
                <li>
                  <NavLink to="/mypage/myfreeboard">
                    <i className="mypageSideBar"></i> - 자유게시판
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/mypage/project/mylist">
                    <i className="mypageSideBar"></i> - 프로젝트 자랑
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/mypage/gathermate/mylist">
                    <i className="mypageSideBar"></i> - 모여라 메이트
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/mypage/reference/mylist">
                    <i className="mypageSideBar"></i> - 추천해요
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MyPageSideBar;
