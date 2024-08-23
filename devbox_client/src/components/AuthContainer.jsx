import React, { useState } from 'react';
import './AuthContainer.css';
import google from '../assets/img/Oauth_Google.png';
import kakao from '../assets/img/Oauth_Kakao.webp';
import naver from '../assets/img/Oauth_Naver.png';


function AuthContainer() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };
  const checkPasswordsMatch = () => {
    // 둘 중 하나라도 빈 칸이면 메시지표시 X
    if (password === '' || rePassword === '') {
      setMessage('');
    } else if (password === rePassword) {
      setMessage('비밀번호가 일치합니다');
    } else {
      setMessage('비밀번호가 일치하지 않습니다');
    }
  };
  
  return (
    <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
      <div className="form-container sign-up-container">
        <form action="#">
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social">
              <img src={naver} alt="Naver Icon" />
            </a>
            <a href="#" className="social">
              <img src={google} alt="Google Icon" />
            </a>
            <a href="#" className="social">
              <img src={kakao} alt="Kakao Icon" />
            </a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="NickName" />
          <input type="email" placeholder="Email" />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              checkPasswordsMatch();
            }}
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
            />
            <span id="message" style={{ color: password === rePassword ? 'green' : 'red' }}>
              {message}
            </span>
          </div>
          <select id="developer-roles" name="developer-roles">
            <option value="frontend">일반회원</option>
            <option value="fullstack">웹 개발자(Frontend & Backend Developer)</option>
            <option value="devops">데브옵스 엔지니어 (DevOps Engineer)</option>
            <option value="cloud">클라우드 엔지니어 (Cloud Engineer)</option>
            <option value="data-engineer">데이터 엔지니어 (Data Engineer)</option>
            <option value="mobile">모바일 개발자 (Mobile Developer)</option>
          </select>
          <button style={{ marginTop: '10px' }}>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="#">
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social">
              <img src={naver} alt="Naver Icon" />
            </a>
            <a href="#" className="social">
              <img src={google} alt="Google Icon" />
            </a>
            <a href="#" className="social">
              <img src={kakao} alt="Kakao Icon" />
            </a>
          </div>
          <span>or use your account</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forgot your password?</a>
          <button>Sign In</button>
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
