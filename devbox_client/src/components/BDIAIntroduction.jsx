import React from "react";
import "../assets/css/BDIAIntroduction.css"; // 스타일을 별도의 CSS 파일로 관리
import KakaoMap from "./KakaoMap"; // 카카오 지도 컴포넌트 import
import ImageSlider from "./ImageSlider";
import ImageList from "./ImageList";

function BDIAIntroduction() {
  return (
    <div className="bdia-intro-container">
      <div className="header-container">
        <img
          src="http://edu.busanit.or.kr/resources/bdia/assets/img/bdia_logo.svg"
          alt="바디아"
          style={{
            width: "30%", // 로고의 너비를 부모 요소의 30%로 설정
            height: "30%", // 로고의 높이를 부모 요소의 30%로 설정
            margin: "10px", // 로고 주위에 50px 여백 추가
          }}
          className="header-logo"
        />
        <span className="header-text" >
          <strong>B</strong>usan <strong>D</strong>igital <strong>I</strong>
          nnovation <strong>A</strong>cademy
        </span>
      </div>
      <p className="bdia-intro-text">
        부산디지털혁신아카데미 ‘비디아’ 는 부울경 지역의 고급 ICT 인력을
        양성하고 양질의 일자리
        <br />
        취업까지 연계하여 기업과 구직자간 미스매치 해소를 위한 부산의 인력양성
        브랜드입니다.
      </p>
      {/* 카카오 지도 컴포넌트 추가 */}
      <KakaoMap />
      <ImageSlider />
      <ImageList />

      {/* 추가할 이미지 */}
      <img
        src={require("../assets/img/2024_edu_schedule_page-0001.jpg")}
        alt="2024 교육 일정"
        className="additional-image"
      />
    </div>
  );
}

export default BDIAIntroduction;
