import React, { useState, useEffect } from "react";
import "./AuthContainer.css";
import google from "../../assets/img/Oauth_Google.png";
import kakao from "../../assets/img/Oauth_Kakao.webp";
import naver from "../../assets/img/Oauth_Naver.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AuthContainer() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [passwordErrorColor, setPasswordErrorColor] = useState("");

  const [nameError, setNameError] = useState("");

  const [role, setRole] = useState("ROLE_USER"); // 기본 역할 설정
  const [field, setField] = useState(null); // 초기에는 null로 설정
  const [email, setEmail] = useState(""); // 이메일 상태 관리 추가
  const [emailError, setEmailError] = useState(""); // 이메일 에러 메시지 상태
  const [name, setName] = useState(""); // 이름 상태 관리
  const [nickname, setNickname] = useState(""); // 닉네임 상태 관리
  const [nicknameError, setNicknameError] = useState(""); // 닉네임 에러 메시지 상태
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const onNaverLogin = () => {
    window.location.href = "https://www.devback.shop/oauth2/authorization/naver";
  };

  const onGoogleLogin = () => {
    window.location.href = "https://www.devback.shop/oauth2/authorization/google";
  };

  const onKakaoLogin = () => {
    window.location.href = "https://www.devback.shop/oauth2/authorization/kakao";
  };

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
    // 회원가입 폼 상태 초기화
    setEmail("");
    setPassword("");
    setRePassword("");
    setName("");
    setNickname("");
    setField(null);
    setRole("ROLE_USER");
    setEmailError("");
    setPasswordError("");
    setNameError("");
    setNicknameError("");
    setMessage("");
    setMessageColor("");
    setPasswordErrorColor("");
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
    // 로그인 폼 상태 초기화
    setLoginEmail("");
    setLoginPassword("");
    setLoginError("");
  };

  // 로그인 입력 변경 핸들러
  const handleLoginEmailChange = (e) => {
    setLoginEmail(e.target.value);
    // 필요 시 에러 초기화
    setLoginError("");
  };

  const handleLoginPasswordChange = (e) => {
    setLoginPassword(e.target.value);
    // 필요 시 에러 초기화
    setLoginError("");
  };

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{6,}$/;
    return regex.test(password);
  };

  // 이메일 입력 변경 핸들러
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!validateEmail(newEmail)) {
      setEmailError("유효한 이메일 형식이 아닙니다.");
    } else {
      setEmailError("");
    }
  };

  // 이메일 입력 필드에서 포커스가 떠날 때 호출되는 함수
  const handleEmailBlur = (e) => {
    const email = e.target.value;
    if (validateEmail(email)) {
      checkEmailExists(email);
    }
  };

  // 이메일 중복 체크 함수
  const checkEmailExists = async (email) => {
    try {
      const response = await fetch(
        `https://www.devback.shop/check-email?email=${email}`
      );
      if (response.status === 409) {
        setEmailError("이미 가입된 이메일입니다.");
      } else {
        setEmailError("");
      }
    } catch (error) {
    }
  };

  // 비밀번호 입력 변경 핸들러
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (!validatePassword(newPassword)) {
      setPasswordError(
        "영어, 숫자, 특수기호 포함 6자 이상이어야 합니다."
      );
      setPasswordErrorColor("red");
    } else {
      // setPasswordError("");
      setPasswordError("사용 가능한 비밀번호입니다.");
      setPasswordErrorColor("green");
    }
  };

  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
  };

  // 이름 및 닉네임 유효성 검사 함수
  const isValidName = (input) => {
    return input.trim().length > 0 && input.trim() === input;
  };

  // 이름 입력 변경 핸들러
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);

    if (!isValidName(newName)) {
      setNameError("공백 없이 이름을 입력해 주세요.");
    } else {
      setNameError("");
    }
  };

  // 닉네임 입력 변경 핸들러
  const handleNicknameChange = (e) => {
    const newNickname = e.target.value;
    setNickname(newNickname);

    if (!isValidName(newNickname)) {
      setNicknameError("공백 없이 닉네임을 입력해 주세요.");
    } else {
      setNicknameError("");
    }
  };

  // 역할 선택 변경 핸들러
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

  // 회원가입 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailError) {
      Swal.fire({
        icon: "error",
        title: "이메일 오류",
        text: "이메일을 확인해 주세요."
      });
      return;
    }

    if (!validatePassword(password)) {
      Swal.fire({
        icon: "error",
        title: "비밀번호 오류",
        text: "비밀번호 조건을 만족하지 않습니다."
      });
      return;
    }

    if (password !== rePassword) {
      Swal.fire({
        icon: "error",
        title: "비밀번호 불일치",
        text: "비밀번호가 일치하지 않습니다."
      });
      return;
    }

    if (!isValidName(name)) {
      Swal.fire({
        icon: "error",
        title: "이름 오류",
        text: "이름을 입력해 주세요."
      });
      return;
    }

    if (!isValidName(nickname)) {
      Swal.fire({
        icon: "error",
        title: "닉네임 오류",
        text: "닉네임을 입력해 주세요."
      });
      return;
    }

    const data = {
      email: email,
      password: password,
      name: name,
      nickname: nickname,
      field: field,
      role: role,
    };

    fetch("https://www.devback.shop/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 409) {
          return res.text().then((message) => {
            throw new Error(message);
          });
        }
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text();
      })
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "회원가입 성공",
          text: result // 서버로부터의 메시지 사용
        });
        setIsRightPanelActive(false);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "회원가입 실패",
          text: error.message
        });
      });
  };

  // 로그인 폼 제출 핸들러
  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      username: loginEmail,
      password: loginPassword,
    };

    try {
      const response = await fetch("https://www.devback.shop/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include", // Refresh Token을 쿠키로 포함하여 요청
      });

      if (response.ok) {
        // 로그인 성공 시 응답 헤더에서 Access Token을 받아서 로컬 스토리지에 저장
        const authHeader = response.headers.get("Authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
          const accessToken = authHeader.split(" ")[1];
          localStorage.setItem("accessToken", accessToken);
        }
        // 로그인 성공 시 홈 페이지로 리다이렉트
        window.location.href = "/";
      } else if (response.status === 401) {
        // 잘못된 자격 증명일 경우
        Swal.fire({
          icon: "error",
          title: "로그인 실패",
          text: "사용자 정보를 확인해 주세요."
        });
      } else {
        // 기타 에러 처리
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "로그인 중 오류가 발생했습니다.",
        text: "다시 시도해 주세요."
      });
    }
  };

  const handleForgotPassword = () => {
    // 새 창의 크기 설정
    const width = 600;
    const height = 400;

    // 화면의 중앙 위치
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      "/password",
      "_blank",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  // 비밀번호와 비밀번호 확인 일치 여부 및 유효성 검사
  useEffect(() => {
    if (password || rePassword) {
      if (password !== rePassword) {
        setMessage("비밀번호가 일치하지 않습니다");
        setMessageColor("red");
      } else {
        setMessage("비밀번호가 일치합니다");
        setMessageColor("green");
      }
    } else {
      setMessage("");
      setMessageColor("");
    }
  }, [password, rePassword]);

  return (
    <div className="auth-wrapper">
      <div
        className={`auth-container ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
        id="container"
      >
        {/* 회원가입 폼 */}
        <div className="auth-form-container auth-sign-up-container">
          <form onSubmit={handleSubmit} className="auth-form">
            <h1 className="auth-h1">Create Account</h1>
            <div className="auth-social-container">
              <Link className="auth-social" onClick={onNaverLogin}>
                <img src={naver} alt="Naver Icon" />
              </Link>
              <Link className="auth-social" onClick={onGoogleLogin}>
                <img src={google} alt="Google Icon" />
              </Link>
              <Link className="auth-social" onClick={onKakaoLogin}>
                <img src={kakao} alt="Kakao Icon" />
              </Link>
            </div>
            <span className="auth-span">
              or use your email for registration
            </span>

            {/* 이메일 입력 및 에러 메시지 */}
            <div className="auth-relative-container">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email} // 수정된 부분
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                required
                className="auth-input"
              />
              {emailError && (
                <span className="auth-message" style={{ color: "red" }}>
                  {emailError}
                </span>
              )}
            </div>

            {/* 비밀번호 입력 및 에러 메시지 */}
            <div className="auth-relative-container">
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password} // 수정된 부분
                onChange={handlePasswordChange}
                required
                className="auth-input"
              />
              {passwordError && (
                <span
                  className="auth-message"
                  style={{ color: passwordErrorColor }}
                >
                  {passwordError}
                </span>
              )}
            </div>

            {/* 비밀번호 확인 및 메시지 */}
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
              {message && (
                <span className="auth-message" style={{ color: messageColor }}>
                  {message}
                </span>
              )}
            </div>

            {/* 이름 입력 */}
            <div className="auth-relative-container">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
                required
                className="auth-input"
              />
              {nameError && (
                <span className="auth-message" style={{ color: "red" }}>
                  {nameError}
                </span>
              )}
            </div>

            {/* 닉네임 입력 및 에러 메시지 */}
            <div className="auth-relative-container">
              <input
                type="text"
                name="nickname"
                placeholder="NickName"
                value={nickname}
                onChange={handleNicknameChange}
                required
                className="auth-input"
              />
              {nicknameError && (
                <span className="auth-message" style={{ color: "red" }}>
                  {nicknameError}
                </span>
              )}
            </div>

            {/* 역할 선택 */}
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

        {/* 로그인 폼 */}
        <div className="auth-form-container auth-sign-in-container">
          <form onSubmit={handleLogin} className="auth-form">
            <h1 id="customH1" className="auth-h1">
              Sign in
            </h1>
            <div className="auth-social-container">
              <Link href="#" className="auth-social" onClick={onNaverLogin}>
                <img src={naver} alt="Naver Icon" />
              </Link>
              <Link href="#" className="auth-social" onClick={onGoogleLogin}>
                <img src={google} alt="Google Icon" />
              </Link>
              <Link href="#" className="auth-social" onClick={onKakaoLogin}>
                <img src={kakao} alt="Kakao Icon" />
              </Link>
            </div>
            <span className="auth-span">or use your account</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginEmail} 
              onChange={handleLoginEmailChange} 
              required
              className="auth-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginPassword} 
              onChange={handleLoginPasswordChange} 
              required
              className="auth-input"
            />
            {loginError && (
              <span className="auth-message" style={{ color: "red" }}>
                {loginError}
              </span>
            )}
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleForgotPassword();
              }}
              className="auth-a"
            >
              Forgot your password?
            </Link>
            <button type="submit" className="auth-button">
              Sign In
            </button>
          </form>
        </div>

        {/* 오버레이 */}
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
