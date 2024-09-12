import React from 'react';
import './PostButton.css'; // 스타일을 적용할 CSS 파일

const PostButton = ({ icon, text, onClick }) => {
  return (
    <button className="post-button" onClick={onClick}>
      {icon && <span className="button-icon">{icon}</span>}
      {text && <span className="button-text">{text}</span>}
    </button>
  );
};

export default PostButton;
