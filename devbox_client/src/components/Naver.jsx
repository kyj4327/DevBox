import React, { useState, useEffect } from 'react';

export const Naver = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 컴포넌트가 마운트될 때 로그인 상태를 확인
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const onNaverLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/naver";
  };

  const onGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const onKakaoLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
  };

  const getData = () => {
    fetch("http://localhost:8080/my", {
      method: "GET",
      credentials: "include"
    })
    .then((res) => res.json())
    .then((data) => {
      alert(data);
    })
    .catch((error) => alert(error));
  };

  const logout = () => {
    // 로컬 스토리지에서 토큰 삭제
    localStorage.removeItem('token');

    // 쿠키에서 토큰 삭제
    document.cookie = 'token=; Max-Age=0; path=/;';

    // 로그아웃 후 토큰이 삭제되었는지 확인
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false);
      console.log("Successfully logged out");
      window.location.href = '/login'; // 로그아웃 후 리디렉션
    } else {
      alert("Logout failed");
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <button onClick={logout}>LOGOUT</button> {/* 로그아웃 버튼 */}
        </>
      ) : (
        <>
          <button onClick={onNaverLogin}>NAVER LOGIN</button>
          <button onClick={onGoogleLogin}>Google LOGIN</button>
          <button onClick={onKakaoLogin}>kakao LOGIN</button>
          <button onClick={getData}>GET DATA</button>
        </>
      )}
    </div>
  );
};
