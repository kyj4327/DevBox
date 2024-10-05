import React from 'react';
import { Link } from 'react-router-dom';

import "./NotFound.css";

function NotFound() {
  return (

    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-subtitle">페이지를 찾을 수 없습니다.</h2>
      <p className="not-found-message">요청하신 페이지는 존재하지 않습니다.</p>
      <Link to="/" className="not-found-link">
        DevBox 홈으로 돌아가기
      </Link>
    </div>
  );
}

export default NotFound;