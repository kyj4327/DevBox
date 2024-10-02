import React from 'react';
import { Link } from 'react-router-dom';



function NotFound() {
  return (


    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - 페이지를 찾을 수 없습니다.</h1>
      <p>요청하신 페이지는 존재하지 않습니다.</p>
      <Link to="/">DevBox 홈으로 돌아가기</Link>
    </div>
  );
}

export default NotFound;