import React, { useState, useEffect } from "react";
import "./AuthContainer.css";
import google from "../../assets/img/Oauth_Google.png";
import kakao from "../../assets/img/Oauth_Kakao.webp";
import naver from "../../assets/img/Oauth_Naver.png";
import { useNavigate } from "react-router-dom"; 

import { useUser } from "../../components/context/UserContext";
import devBox from "../../assets/img/devBox.png";


function AuthContainer() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [role, setRole] = useState("ROLE_USER"); // 기본 역할 설정
  const [field, setField] = useState(null); // 초기에는 null로 설정
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [email, setEmail] = useState(""); // 이메일 상태 관리 추가
  const navigate = useNavigate();

  const { login, refreshAccessToken } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogoClick = () => {
    navigate("/home"); // /home 경로로 이동
  };

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

  useEffect(() => {
    if (password || rePassword) {
      if (password === rePassword) {
        setMessage("비밀번호가 일치합니다");
        setMessageColor("green");
      } else {
        setMessage("비밀번호가 일치하지 않습니다");
        setMessageColor("red");
      }
    } else {
      setMessage("");
      setMessageColor("");
    }
  }, [password, rePassword]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    const selectedField = e.target.value;

    // 'general'인 경우 field를 null로 설정하고, 역할을 ROLE_USER로 설정
    if (selectedField === "general") {
      setField(null);
      setRole("ROLE_USER");
    } else {
      setField(selectedField);
      setRole("ROLE_STUDENT");
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
      role: role,
    };

    console.log("Sending data:", data); // 보낼 데이터 출력

    fetch("http://localhost:8080/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log("Response status:", res.status); // 응답 상태 코드 출력
        if (!res.ok) {
          // 상태 코드가 200번대가 아닌 경우 에러 처리
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text(); // JSON 대신 텍스트로 응답 처리
      })
      .then((result) => {
        console.log("Success:", result); // 성공적으로 처리된 결과를 출력
        alert(result); // 백엔드에서 반환한 메시지 출력
        setIsRightPanelActive(false);
      })
      .catch((error) => {
        console.error("Error:", error); // 에러 메시지 출력
        alert("회원가입에 실패했습니다.");
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // // FormData를 이용해 form-data 방식으로 데이터를 보내기
    // const formData = new URLSearchParams();
    // formData.append("username", e.target.email.value);
    // formData.append("password", e.target.password.value);

    const data = {
      username: e.target.email.value,
      password: e.target.password.value,
    };

    console.log("Logging in with data:", data); // 로그인 데이터 출력

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include", // Refresh Token을 쿠키로 포함하여 요청
      });

      console.log("Response status:", response.status); // 응답 상태 확인

      if (response.ok) {
        // 로그인 성공 시 응답 헤더에서 Access Token을 받아서 로컬 스토리지에 저장
        const authHeader = response.headers.get("Authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
          const accessToken = authHeader.split(" ")[1];
          localStorage.setItem("accessToken", accessToken);
        }
        // 로그인 성공 시 홈 페이지로 리다이렉트
        window.location.href = "/home";
      } else if (response.status === 401) {
        // 잘못된 자격 증명일 경우
        alert("사용자 정보를 확인해주세요");
      } else {
        // 기타 에러 처리
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleForgotPassword = () => {
    // 새 창의 크기를 설정
  const width = 500;
  const height = 300;

  // 화면의 중앙 위치
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;

  window.open(
    "/password",
    "_blank",
    `width=${width},height=${height},left=${left},top=${top}`
  );
  };

  return (
    <div className="auth-wrapper">
      <div
        className={`auth-container ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
        id="container"
      >
        <div className="auth-form-container auth-sign-up-container">
          <form onSubmit={handleSubmit} className="auth-form">
            <h1 className="auth-h1">Create Account</h1>
            <div className="auth-social-container">
              <a href="#" className="auth-social" onClick={onNaverLogin}>
                <img src={naver} alt="Naver Icon" />
              </a>
              <a href="#" className="auth-social" onClick={onGoogleLogin}>
                <img src={google} alt="Google Icon" />
              </a>
              <a href="#" className="auth-social" onClick={onKakaoLogin}>
                <img src={kakao} alt="Kakao Icon" />
              </a>
            </div>
            <span className="auth-span">
              or use your email for registration
            </span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="auth-input"
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="auth-input"
            />
            <div className="auth-relative-container">
              <input
                type="password"
                id="rePassword"
                placeholder="Confirm Password"
                value={rePassword}
                onChange={handleRePasswordChange}
                required
                className="auth-input"
              />
              <span
                id="message"
                style={{ color: messageColor }}
                className="auth-message"
              >
                {message}
              </span>
            </div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="auth-input"
            />
            <input
              type="text"
              name="nickname"
              placeholder="NickName"
              required
              className="auth-input"
            />
            <select
              id="developer-roles"
              name="developer-roles"
              onChange={handleRoleChange}
              value={field || "general"}
              className="auth-select"
            >
              <option value="general">일반회원</option>
              <option value="web-dev">
                웹 개발자(Frontend & Backend Developer)
              </option>
              <option value="devops">
                데브옵스 엔지니어 (DevOps Engineer)
              </option>
              <option value="cloud">클라우드 엔지니어 (Cloud Engineer)</option>
              <option value="data-engineer">
                데이터 엔지니어 (Data Engineer)
              </option>
              <option value="mobile">모바일 개발자 (Mobile Developer)</option>
            </select>
            <button
              type="submit"
              className="auth-button"
              style={{ marginTop: "10px" }}
            >
              Sign Up
            </button>
          </form>
        </div>
        
        <div className="auth-form-container auth-sign-in-container">

          <form onSubmit={handleLogin} className="auth-form">
            {/* <img
              src={devBox}
              alt="DevBox Logo"
              className="logo-image"
              onClick={handleLogoClick} // 클릭 시 /home으로 이동
              style={{ cursor: "pointer" }} // 클릭 가능 커서 스타일 추가
            /> */}

            <h1 id="customH1" className="auth-h1">
              Sign in
            </h1> 
            <div className="auth-social-container">
              <a href="#" className="auth-social" onClick={onNaverLogin}>
                <img src={naver} alt="Naver Icon" />
              </a>
              <a href="#" className="auth-social" onClick={onGoogleLogin}>
                <img src={google} alt="Google Icon" />
              </a>
              <a href="#" className="auth-social" onClick={onKakaoLogin}>
                <img src={kakao} alt="Kakao Icon" />
              </a>
            </div>
            <span className="auth-span">or use your account</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="auth-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="auth-input"
            />
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleForgotPassword();
              }}
              className="auth-a"
            >
              Forgot your password?
            </a>
            <button type="submit" className="auth-button">
              Sign In
            </button>
          </form>
        </div>
        <div className="auth-overlay-container">
          <div className="auth-overlay">
            <div className="auth-overlay-panel auth-overlay-left">
              <h1 className="auth-h1">Welcome Back!</h1>
              <p className="auth-p">
                로그인을 위해서는 SIGN IN 버튼을 누르세요
              </p>
              <button
                className="auth-button ghost"
                id="signIn"
                onClick={handleSignInClick}
              >
                Sign In
              </button>
            </div>
            <div className="auth-overlay-panel auth-overlay-right">
              <h1 className="auth-h1">Hello, Friend!</h1>
              <p className="auth-p">
                다양한 IT 분야 교육 지망생을 환영합니다!
                <br />
                회원가입을 위해서는 SIGN UP 버튼을 누르세요
              </p>
              <button
                className="auth-button ghost"
                id="signUp"
                onClick={handleSignUpClick}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthContainer;
