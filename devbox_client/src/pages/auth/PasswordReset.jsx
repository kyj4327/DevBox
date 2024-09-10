import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./PasswordReset.css"; 


function PasswordReset() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleSendCode = () => {
    fetch('http://localhost:8080/password/code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert('인증코드를 발송하였습니다.');
        setIsCodeSent(true);
      } else {
        alert('인증코드 발송에 실패하였습니다.\n(소셜로그인 계정인 경우 비밀번호 찾기를 할 수 없습니다.)');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('인증코드 발송에 실패하였습니다.\n(소셜로그인 계정인 경우 비밀번호 찾기를 할 수 없습니다.)');
    });
  };

  const handleVerifyCode = () => {
    fetch('http://localhost:8080/password/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code: verificationCode }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert('인증이 완료되었습니다. 비밀번호를 변경해보세요.');
        setIsVerified(true);
      } else {
        alert('인증에 실패하였습니다. 다시한번 확인해주세요.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Verification failed.');
    });
  };

  const handleResetPassword = () => {
    fetch('http://localhost:8080/password/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, newPassword }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert('비밀번호가 변경되었습니다.');
        window.close(); // 현재 창 닫기
      } else {
        alert('비밀번호 변경에 실패하였습니다.\n(소셜로그인 계정인 경우 비밀번호를 변경할 수 없습니다)');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('비밀번호 변경에 실패하였습니다.\n(소셜로그인 계정인 경우 비밀번호를 변경할 수 없습니다)');
    });
  };

  const handleGoBack = () => {
    window.close(); 
  };

  return (
    <div>
      {!isVerified ? (
        <div>
          <h2>Reset Password</h2>
          <input className='password-input'
            type="email"
            placeholder="찾을 계정의 이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isCodeSent}
            required
          />
          {isCodeSent ? (
            <div>
              <input className='password-input'
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
              <button className="password-button" onClick={handleVerifyCode}>Verify Code</button>
            </div>
          ) : (
            <button className="password-button" onClick={handleSendCode}>인증코드 전송</button>
          )}

<button className="cancel-button" onClick={handleGoBack}>취소하기</button>
</div>
        
      ) : (
        <div>
          <h2>Set New Password</h2>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button onClick={handleResetPassword}>Reset Password</button>
        </div>
      )}
    </div>
  );
}

export default PasswordReset;