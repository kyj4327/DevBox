import React from "react";
import MsgBell from "../pages/message/MsgBell";
import { useNavigate } from "react-router-dom";
import { useUser } from '../components/context/UserContext';
import './Header.css';

const Header = () => {
  const { user, setUser , loading} = useUser();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      const response = await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("accessToken");
        setUser(null);
        navigate("/auth");
      } else {
        throw new Error("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (loading) {
    return (
      <nav id="main_nav" className="navbar navbar-expand-lg navbar-light bg-white shadow">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading</span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      id="main_nav"
      className="navbar navbar-expand-lg navbar-light bg-white shadow"
    >
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand h1" href="/home">
          <i className="bx bx-buildings bx-sm text-dark"></i>
          <span className="text-dark h4">Dev</span>
          <span className="text-primary h4">Box</span>
        </a>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-toggler-success"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="align-self-center collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between"
          id="navbar-toggler-success"
        >
          <div className="flex-fill mx-xl-5 mb-2">
            <ul className="nav navbar-nav d-flex justify-content-between mx-xl-5 text-center text-dark">
              <li className="nav-item">
                <a
                  className="nav-link btn-outline-primary rounded-pill px-3"
                  href="index.html"
                >
                  BDIA
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link btn-outline-primary rounded-pill px-3"
                  href="about.html"
                >
                  Notice
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link btn-outline-primary rounded-pill px-3"
                  href="/edu/list"
                >
                  Information
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link btn-outline-primary rounded-pill px-3"
                  href="/project/list"
                >
                  Community
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link btn-outline-primary rounded-pill px-3"
                  href="/message/list"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="navbar align-self-center d-flex">
            {user ? (
              <>
                <MsgBell />
                <a className="nav-link" href="/mypage">
                  <i className="bx bx-user-circle bx-sm text-primary"></i>
                </a>
                <button 
                  onClick={handleLogoutClick} 
                  className="header-logout-button nav-link"
                  aria-label="Logout"
                >
                  <i className='bx bx-log-out bx-sm text-primary'></i>
                </button>
              </>
            ) : (
              <a
                className="nav-link"
                href="/auth"
                style={{ color: "#4232C2", textDecoration: 'underline', cursor: 'pointer' }}
              >
                로그인/회원가입
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;