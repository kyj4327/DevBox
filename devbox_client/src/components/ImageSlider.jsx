import React, { useRef, useState } from 'react';
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
  width: 50px;  /* 크기 조정 */
  height: 50px; /* 크기 조정 */
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PrevArrow = styled(Arrow)`
  left: 15px;  /* 위치 조정 */
  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-top: 25px solid transparent;  /* 화살표 크기 조정 */
    border-bottom: 25px solid transparent; /* 화살표 크기 조정 */
    border-right: 30px solid #D8BFD8; /* 연한 보라색 */
  }
`;

const NextArrow = styled(Arrow)`
  right: 15px;  /* 위치 조정 */
  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-top: 25px solid transparent;  /* 화살표 크기 조정 */
    border-bottom: 25px solid transparent; /* 화살표 크기 조정 */
    border-left: 30px solid #D8BFD8; /* 연한 보라색 */
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px; /* 슬라이더와 도트 사이의 여백 */
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

const ImageTitle = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px; /* 슬라이더와 도트 사이의 여백과 분리된 여백 */
`;

const images = [
  { src: img1, title: '5층 복도' },
  { src: img2, title: '5층 복도' },
  { src: img3, title: '5층 교육장' },
  { src: img4, title: '6층 로비' },
  { src: img5, title: '7층 복도' },
  { src: img6, title: '7층 로비' },
  { src: img7, title: '7층 교육장' },
  { src: img8, title: '7층 교육장' }
];

const ImageSlider = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
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
          <SlideImage key={index} src={img.src} alt={`Slide ${index}`} />
        ))}
      </Slider>
      <ImageTitle>{images[currentSlide].title}</ImageTitle>
      <DotsContainer>
        {images.map((img, index) => (
          <DotImage 
            key={index}
            src={img.src}
            alt={`Dot ${index}`}
            active={index === currentSlide}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </DotsContainer>
    </SliderContainer>
  );
};

export default ImageSlider;
