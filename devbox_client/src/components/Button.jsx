import React from 'react';

const Button = ({ text, onClick, className }) => {
  return (
    <button onClick={onClick} className={`btn ${className}`}>
      {text}
    </button>
  );
};

export default Button;