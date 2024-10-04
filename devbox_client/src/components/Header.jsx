import React from "react";
import MsgBell from "../pages/message/MsgBell";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../components/context/UserContext';
import './Header.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import DevBox from "./DevBox";

const Header = () => {
  const { user, loading, logout } = useUser();
  const navigate = useNavigate();

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} className="custom-tooltip">
      {user && (
        <>
          로그인 정보<br />
          이메일: {user.email}<br />
          닉네임: {user.nickname}
        </>
      )}
    </Tooltip>
  );

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
    <nav id="main_nav" className="navbar navbar-expand-lg navbar-light bg-white shadow">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand h1">
          <DevBox />
        </Link>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-toggler-success" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="align-self-center collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between" id="navbar-toggler-success">
          <div className="flex-fill mx-xl-5 mb-2 menu-container" style={{ marginTop: '7px' }}>
            <ul className="nav navbar-nav d-flex justify-content-between mx-xl-5 text-center text-dark">
              <li className="nav-item">
                <span className="nav-link btn-outline-primary rounded-pill px-3" style={{ cursor: 'default' }}>BDIA</span>
                <div className="dropdown-menu-container">
                  <div className="dropdown-section">
                    <Link to="/introduce">BDIA 소개</Link>
                    <Link to="/schedule">연간 교육 일정</Link>
                    <Link to="/edu/list">교육 프로그램</Link>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <Link to="/notice/list" className="nav-link btn-outline-primary rounded-pill px-3">공지사항</Link>
              </li>
              <li className="nav-item">
                <span className="nav-link btn-outline-primary rounded-pill px-3" style={{ cursor: 'default' }}>정보마당</span>
                <div className="dropdown-menu-container">
                  <div className="dropdown-section">
                    <Link to="/jobinfo/list">개발 직군</Link>
                    <Link to="/hiring/list">채용 공고</Link>
                    <Link to="/contest/list">공모전 공고</Link>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <span className="nav-link btn-outline-primary rounded-pill px-3" style={{ cursor: 'default' }}>커뮤니티</span>
                <div className="dropdown-menu-container">
                  <div className="dropdown-section">
                    <Link to="/greeting/list">가입인사</Link>
                    <Link to="/freeboard/list">자유게시판</Link>
                    <Link to="/project/list">프로젝트 자랑</Link>
                    <Link to="/gathermate/list">모여라 메이트</Link>
                    <Link to="/reference/list">추천해요</Link>
                    <Link to="/reservation/write">6층 회의실 대여</Link>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <Link to="/faq" className="nav-link btn-outline-primary rounded-pill px-3">FAQ</Link>
              </li>
            </ul>
          </div>
          <div className="navbar align-self-center d-flex">
            {
              user ? (
                <>
                  <MsgBell />
                  <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
                    <Link to="/mypage" className="header-logout-button nav-link">
                      <i className="bx bx-user-circle bx-sm text-primary"></i>
                    </Link>
                  </OverlayTrigger>
                  <button onClick={logout} className="header-logout-button nav-link" aria-label="Logout">
                    <i className='bx bx-log-out bx-sm text-primary'></i>
                  </button>
                </>
              ) : (
                <Link to="/auth" className="nav-link text-decoration-none" style={{ color: "#4232C2", textDecoration: 'underline', cursor: 'pointer' }}>
                  로그인/회원가입
                </Link>
              )
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;