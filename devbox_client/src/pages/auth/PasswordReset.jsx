import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PasswordReset.css";
import Swal from "sweetalert2";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isSendingCode, setIsSendingCode] = useState(false);

  const [isPasswordValid, setIsPasswordValid] = useState(false); // 비밀번호 유효성 상태
  const navigate = useNavigate();

  const handleSendCode = () => {
    setIsSendingCode(true); // 로딩 시작
    fetch("https://www.devback.shop/password/code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsSendingCode(false); // 로딩 종료
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "인증코드 발송 완료",
            text: "인증코드를 발송하였습니다."
          });
          setIsCodeSent(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "인증코드 발송에 실패하였습니다.",
            text: "소셜로그인 계정인 경우 비밀번호 찾기를 할 수 없습니다."
          });
        }
      })
      .catch((error) => {
        setIsSendingCode(false); // 로딩 종료
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "인증코드 발송에 실패하였습니다.",
          text: "소셜로그인 계정인 경우 비밀번호 찾기를 할 수 없습니다."
        });
      });
  };

  const handleVerifyCode = () => {
    fetch("https://www.devback.shop/password/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code: verificationCode }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "인증이 완료되었습니다.",
            text: " 비밀번호를 변경해보세요."
          });
          setIsVerified(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "인증에 실패하였습니다.",
            text: "다시 확인해 주세요."
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "인증에 실패하였습니다.",
          text: "다시 시도해 주세요."
        });
      });
  };

  const handleResetPassword = () => {
    fetch("https://www.devback.shop/password/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "비밀번호가 변경되었습니다."
          }).then(() => {
            window.close();
          }); // 현재 창 닫기
        } else {
          Swal.fire({
            icon: "error",
            title: "비밀번호 변경에 실패하였습니다.",
            html: "소셜로그인 계정인 경우 비밀번호를 변경할 수 없습니다."
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "비밀번호 변경에 실패하였습니다.",
          html: "소셜로그인 계정인 경우 비밀번호를 변경할 수 없습니다."
        });
      });
  };

  const handleGoBack = () => {
    window.close();
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    // 영어, 숫자, 특수기호 포함 6자 이상
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{6,}$/;
    return regex.test(password);
  };

  const handleNewPasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    setIsPasswordValid(validatePassword(password));
  };

  return (
    <div className="password-reset-container">
      {!isVerified ? (
        <div className="reset-form">
          <h2 className="h2 semi-bold-600 text-center mt-2">Reset Password</h2>
          <span className="resetPasswordContent1">
            비밀번호를 재설정합니다.
          </span>
          <input
            className="password-input"
            type="email"
            placeholder="찾을 계정의 이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isCodeSent || isSendingCode} // 로딩 중 이메일 입력 비활성화
            required
          />
          {isCodeSent ? (
            <div className="verification-section">
              <input
                className="password-input"
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
              <button
                className="password-button"
                onClick={handleVerifyCode}
                disabled={isSendingCode} // 필요 시 추가적인 비활성화
              >
                인증코드 확인
              </button>
            </div>
          ) : (
            <div className="send-code-section">
              <button
                className="password-button"
                onClick={handleSendCode}
                disabled={isSendingCode} // 로딩 중 버튼 비활성화
              >
                인증코드 전송
              </button>
            </div>
          )}

          <button className="cancel-button" onClick={handleGoBack}>
            취소하기
          </button>

          {isSendingCode && (
            <p className="loading-message">인증코드를 전송중입니다...</p>
          )}
        </div>
      ) : (
        <div className="set-password-form">
          <h2 className="text-center">Set New Password</h2>

          <span className="newResetPasswordContent1">
            비밀번호를 새로 재설정합니다.
          </span>
          <span className="newResetPasswordContent2">
            영어, 숫자, 특수기호 포함 6자 이상이어야 합니다.
          </span>

          <input
            className="password-input"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
          {!isPasswordValid && newPassword.length > 0 && (
            <p className="password-error-message">비밀번호 생성 조건을 맞춰주세요.</p>
          )}
          <button
            className="password-button"
            onClick={handleResetPassword}
            disabled={!isPasswordValid}
          >
            비밀번호 재설정
          </button>
        </div>
      )}
    </div>
  );
}

export default PasswordReset;
