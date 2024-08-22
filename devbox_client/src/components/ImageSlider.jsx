import React, { useRef } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 이미지 파일 import
import img1 from '../assets/img/5_b1.jpg';
import img2 from '../assets/img/5_b2.jpg';
import img3 from '../assets/img/5_s.jpg';
import img4 from '../assets/img/6_l.jpg';
import img5 from '../assets/img/7_b.jpg';
import img6 from '../assets/img/7_l.jpg';
import img7 from '../assets/img/7_s1.jpg';
import img8 from '../assets/img/7_s2.jpg';

// 커스텀 버튼 이미지 import
import prevArrowImg from '../assets/img/left.png'; 
import nextArrowImg from '../assets/img/right.png'; 

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const SlideImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const Arrow = styled.div`
  width: 40px;
  height: 40px;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  z-index: 1;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const PrevArrow = styled(Arrow)`
  background-image: url(${prevArrowImg});
  left: 10px;
`;

const NextArrow = styled(Arrow)`
  background-image: url(${nextArrowImg});
  right: 10px;
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const DotImage = styled.img`
  width: 60px;
  height: 40px;
  cursor: pointer;
  border: 2px solid #ccc;
  border-radius: 4px;
  margin: 0 5px;
  opacity: ${props => props.active ? 1 : 0.6};
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 1;
  }
`;

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

const ImageSlider = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,  // 기본 도트 제거
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };

  const handleDotClick = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  return (
    <SliderContainer>
      <Slider ref={sliderRef} {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <SlideImage src={img} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
      <DotsContainer>
        {images.map((img, index) => (
          <DotImage
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            active={sliderRef.current && sliderRef.current.innerSlider.state.currentSlide === index}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </DotsContainer>
    </SliderContainer>
  );
};

export default ImageSlider;
