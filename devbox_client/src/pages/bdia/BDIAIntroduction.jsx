import React from "react";
import "../../assets/css/BDIAIntroduction.css"; // 스타일을 별도의 CSS 파일로 관리
import KakaoMap from "../../components/KakaoMap"; // 카카오 지도 컴포넌트 import
import ImageSlider from "../../components/ImageSlider";
import ImageList from "../../components/ImageList";
import RoadExplain from "../../components/RoadExplain";

function BDIAIntroduction() {
  return (
    <div className="bdia-intro-container">
      <div className="bdia-header-container">  
        <img
          src="http://edu.busanit.or.kr/resources/bdia/assets/img/bdia_logo.svg"
          alt="바디아"
          style={{
            width: "30%",
            height: "30%",
            margin: "10px",
          }}
          className="header-logo"
        />
        <span className="bdia-header-text">
          <strong>B</strong>usan <strong>D</strong>igital <strong>I</strong>nnovation <strong>A</strong>cademy
        </span>
      </div>
      
      <p className="bdia-intro-text">
        부산디지털혁신아카데미 ‘비디아’ 는 부울경 지역의 고급 ICT 인력을 양성하고 양질의 일자리
        <br />
        취업까지 연계하여 기업과 구직자간 미스매치 해소를 위한 부산의 인력양성 브랜드입니다.
      </p>
      
      {/* 구분선 및 제목 */}
      <div className="bdia-section-container">
        <h2 className="bdia-section-title">위치</h2>
        <hr className="bdia-divider" />
        <KakaoMap />
      </div>

      <div className="section-container">
        <h2 className="section-title"></h2>
        <hr className="divider" />
        <RoadExplain />
      </div>

      <div className="bdia-section-container">
        <h2 className="bdia-section-title">교육장</h2>
        <hr className="bdia-divider" />
        <ImageSlider />
      </div>

      <div className="section-container">
        <h2 className="section-title"></h2>
        <hr className="divider" />
        <ImageList />
      </div>

    </div>
  );
}

export default BDIAIntroduction;
