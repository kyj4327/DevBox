import React, { useState, useEffect } from 'react';
import './AuthContainer.css';
import google from '../assets/img/Oauth_Google.png';
import kakao from '../assets/img/Oauth_Kakao.webp';
import naver from '../assets/img/Oauth_Naver.png';

function AuthContainer() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('ROLE_USER');  // 기본 역할 설정
  const [field, setField] = useState(null); // 초기에는 null로 설정
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

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

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  const checkPasswordsMatch = () => {
    if (password === '' || rePassword === '') {
      setMessage('');
    } else if (password === rePassword) {
      setMessage('비밀번호가 일치합니다');
    } else {
      setMessage('비밀번호가 일치하지 않습니다');
    }
  };

  const handleRoleChange = (e) => {
    const selectedField = e.target.value;

    // 'frontend'인 경우 field를 null로 설정하고, 역할을 ROLE_USER로 설정
    if (selectedField === 'frontend') {
      setField(null);
      setRole('ROLE_USER');
    } else {
      setField(selectedField);
      setRole('ROLE_STUDENT');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: password,
      name: e.target.name.value,
      nickname: e.target.nickname.value,
      field: field,
      role: role
    };

    console.log("Sending data:", data); // 보낼 데이터 출력

    fetch("http://localhost:8080/join", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => {
      console.log('Response status:', res.status); // 응답 상태 코드 출력
      if (!res.ok) { // 상태 코드가 200번대가 아닌 경우 에러 처리
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.text(); // JSON 대신 텍스트로 응답 처리
    })
    .then((result) => {
      console.log('Success:', result); // 성공적으로 처리된 결과를 출력
      alert(result); // 백엔드에서 반환한 메시지 출력
    })
    .catch((error) => {
      console.error('Error:', error); // 에러 메시지 출력
      alert("회원가입에 실패했습니다.");
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // FormData를 이용해 form-data 방식으로 데이터를 보내기
    const formData = new URLSearchParams();
    formData.append("username", e.target.email.value);
    formData.append("password", e.target.password.value);

    console.log("Logging in with data:", formData.toString()); // 로그인 데이터 출력

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString(),
      credentials: 'include' // 쿠키를 포함해서 보내기
    })
    .then((res) => {
      console.log('Response status:', res.status); // 응답 상태 코드 출력
      if (res.ok) {
        window.location.href = "/home"; // 로그인 성공 시 /home으로 이동
      } else {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    })
    .catch((error) => {
      console.error('Error:', error); // 에러 메시지 출력
      alert("로그인에 실패했습니다.");
    });
  };

  return (
    <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
      <div className="form-container sign-up-container">
        <form onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social" onClick={onNaverLogin}>
              <img src={naver} alt="Naver Icon" />
            </a>
            <a href="#" className="social" onClick={onGoogleLogin}>
              <img src={google} alt="Google Icon" />
            </a>
            <a href="#" className="social" onClick={onKakaoLogin}>
              <img src={kakao} alt="Kakao Icon" />
            </a>
          </div>
          <span>or use your email for registration</span>
          <input type="email" name="email" placeholder="Email" required />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              checkPasswordsMatch();
            }}
            required
          />
          <div className="relative-container">
              <input
                type="password"
                id="rePassword"
                placeholder="Confirm Password"
                value={rePassword}
                onChange={(e) => {
                  setRePassword(e.target.value);
                  checkPasswordsMatch();
                }}
                required
              />
            <span id="message" style={{ color: password === rePassword ? 'green' : 'red' }}>
              {message}
            </span>
          </div>
          <input type="text" name="name" placeholder="Name" required />
          <input type="text" name="nickname" placeholder="NickName" required />
          <select id="developer-roles" name="developer-roles" onChange={handleRoleChange} value={field || 'frontend'}>
            <option value="frontend">일반회원</option>
            <option value="web-dev">웹 개발자(Frontend & Backend Developer)</option>
            <option value="devops">데브옵스 엔지니어 (DevOps Engineer)</option>
            <option value="cloud">클라우드 엔지니어 (Cloud Engineer)</option>
            <option value="data-engineer">데이터 엔지니어 (Data Engineer)</option>
            <option value="mobile">모바일 개발자 (Mobile Developer)</option>
          </select>
          <button type="submit" style={{ marginTop: '10px' }}>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={handleLogin}>
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social" onClick={onNaverLogin}>
              <img src={naver} alt="Naver Icon" />
            </a>
            <a href="#" className="social" onClick={onGoogleLogin}>
              <img src={google} alt="Google Icon" />
            </a>
            <a href="#" className="social" onClick={onKakaoLogin}>
              <img src={kakao} alt="Kakao Icon" />
            </a>
          </div>
          <span>or use your account</span>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <a href="#">Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>로그인을 위해서는 SIGN IN 버튼을 누르세요</p>
            <button className="ghost" id="signIn" onClick={handleSignInClick}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>
              다양한 IT 분야 교육 지망생을 환영합니다!<br />
              회원가입을 위해서는 SIGN UP 버튼을 누르세요
            </p>
            <button className="ghost" id="signUp" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthContainer;
