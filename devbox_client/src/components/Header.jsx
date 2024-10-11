import React, { useEffect, useState } from "react";
import MsgBell from "../pages/message/MsgBell";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../components/context/UserContext';
import './Header.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import DevBox from "./DevBox";

const Header = () => {
  const { user, loading, logout } = useUser();
  const navigate = useNavigate();

  // 메뉴의 열림 상태를 관리하는 state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 창 크기 변경에 따라 메뉴 상태를 업데이트
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991 && isMenuOpen) {
        setIsMenuOpen(false); // 창 크기가 커지면 햄버거 메뉴 닫기
      }
    };
    window.addEventListener('resize', handleResize);
    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

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
        <button className="navbar-toggler border-0" type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)} // 클릭 시 메뉴 열림 상태 토글
          aria-controls="navbarSupportedContent" aria-expanded={isMenuOpen} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`align-self-center collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between ${isMenuOpen ? "show" : ""}`}
          id="navbar-toggler-success">
          <div className="flex-fill mx-xl-5 mb-2 menu-container" style={{ marginTop: '7px' }}>
            {
              isMenuOpen ? (
                // 창 크기 줄었을 때의 메뉴
                <div className={`navbar-menu ${isMenuOpen ? "open" : ""}`} id="navbar-toggler-success">
                  <div className="resized-menu-item">
                    <h5>BDIA</h5>
                    <Link to="/introduce" onClick={() => setIsMenuOpen(false)}>BDIA 소개</Link>
                    <Link to="/schedule" onClick={() => setIsMenuOpen(false)}>연간 교육 일정</Link>
                    <Link to="/edu/list" onClick={() => setIsMenuOpen(false)}>교육 프로그램</Link>
                  </div>
                  <div className="resized-menu-item">
                    <Link to="/notice/list" onClick={() => setIsMenuOpen(false)}><h5>공지사항</h5></Link>
                  </div>
                  <div className="resized-menu-item">
                    <h5>정보마당</h5>
                    <Link to="/jobinfo/list" onClick={() => setIsMenuOpen(false)}>개발 직군</Link>
                    <Link to="/hiring/list" onClick={() => setIsMenuOpen(false)}>채용 공고</Link>
                    <Link to="/contest/list" onClick={() => setIsMenuOpen(false)}>공모전 공고</Link>
                  </div>
                  <div className="resized-menu-item">
                    <h5>커뮤니티</h5>
                    <Link to="/greeting/list" onClick={() => setIsMenuOpen(false)}>가입인사</Link>
                    <Link to="/freeboard/list" onClick={() => setIsMenuOpen(false)}>자유게시판</Link>
                    <Link to="/project/list" onClick={() => setIsMenuOpen(false)}>프로젝트 자랑</Link>
                    <Link to="/gathermate/list" onClick={() => setIsMenuOpen(false)}>모여라 메이트</Link>
                    <Link to="/reference/list" onClick={() => setIsMenuOpen(false)}>추천해요</Link>
                    <Link to="/reservation/write" onClick={() => setIsMenuOpen(false)}>6층 회의실 대여</Link>
                  </div>
                  <div className="resized-menu-item">
                    <Link to="/faq" onClick={() => setIsMenuOpen(false)}><h5>고객센터</h5></Link>
                  </div>
                </div>
              ) : (
                // 기본 네비게이션 메뉴
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
                    <Link to="/faq" className="nav-link btn-outline-primary rounded-pill px-3">고객센터</Link>
                  </li>
                </ul>
              )
            }
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