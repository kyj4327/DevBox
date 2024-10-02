import React, { useState, useEffect, useRef } from "react";
import "./WriteSelect.css";

const WriteSelect = ({ titleTag, name, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);  // 드롭다운 요소를 참조하는 ref

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
  };

  // 외부 클릭 감지 로직
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);  // 외부 클릭 시 드롭다운을 닫음
      }
    };

    // 전역 클릭 이벤트 리스너 등록
    document.addEventListener("mousedown", handleClickOutside);
    
    // cleanup 함수로 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="col-lg-6 mb-4">
      <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line" style={{cursor: 'default'}}>
        {titleTag}
      </h2>
      <p className="worksingle-footer py-3 text-muted light-300">
        <div className="custom-select-container" ref={dropdownRef}>
          <div className="form-floating">
            <div className="custom-select-header" onClick={toggleDropdown} id={name}>
              {value}
              <span className={`arrow ${isOpen ? 'open' : ''}`}></span>
            </div>
            {isOpen && (
              <ul className="custom-select-options">
                {options.map((option, index) => (
                  <li key={index} onClick={() => handleSelect(option)}>
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </p>
    </div>
  );
};

export default WriteSelect;
