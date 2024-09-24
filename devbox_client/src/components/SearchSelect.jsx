import React, { useState, useRef, useEffect } from "react";
import "./SearchSelect.css"; // CSS 파일도 동일한 이름으로 유지

// 게시글 리스트에서 작성자 & 제목+ 내용 검색 하기 위한 선택
const SearchSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    onChange(option);  
    setIsOpen(false);  
  };

  // 외부 클릭 -> 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);  
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="custom-searchselect-container" ref={dropdownRef}>
      <div className="custom-searchselect-header" onClick={toggleDropdown}>
        <span>{value}</span>
        <span className={`custom-searchselect-arrow ${isOpen ? "open" : ""}`} />
      </div>
      {isOpen && (
        <ul className="custom-searchselect-options">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchSelect;
