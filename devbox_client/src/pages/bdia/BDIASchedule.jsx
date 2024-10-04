import React from "react";
import "../../assets/css/BDIAIntroduction.css"; // 스타일을 별도의 CSS 파일로 관리



function BDIASchedule() {
  return (
   

      <div className="bdia-section-container">
        <h2 className="bdia-schedule">연간 교육 일정</h2>
        <hr className="bdia-divider" />
        <img
          src={require("../../assets/img/2024_edu_schedule_page-0001.jpg")}
          alt="연간 교육 일정"
          className="bdia-additional-image"
        />
      </div>
   
  );
}

export default BDIASchedule;
