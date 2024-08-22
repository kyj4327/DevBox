import React from 'react';
import styled from 'styled-components';

// 이미지 파일 import
import img1 from '../assets/img/5_b1.jpg';
import img2 from '../assets/img/5_b2.jpg';
import img3 from '../assets/img/5_s.jpg';
import img4 from '../assets/img/6_l.jpg';
import img5 from '../assets/img/7_b.jpg';
import img6 from '../assets/img/7_l.jpg';
import img7 from '../assets/img/7_s1.jpg';
import img8 from '../assets/img/7_s2.jpg';

const ImageListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 50px 0 20px 0;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
  gap: 20px 0;
`;

const ImageItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  margin: 0;
  padding: 20px;
  width: calc(50% - 10px);
  background: #f0f5f8;
  box-sizing: border-box;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 0;
  width: 100%;
  text-align: center;
`;

const Image = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 100%;
  
`;

const Text = styled.p`
  margin-top: 15px;
  font-size: 16px;
  text-align: center;
  font-family: 'MinSans-Regular', sans-serif;
  
`;

const ImageList = () => {
  const images = [
    { src: img1, alt: '5층 복도' },
    { src: img2, alt: '5층 복도' },
    { src: img3, alt: '5층 교육장' },
    { src: img4, alt: '6층 로비' },
    { src: img5, alt: '7층 복도' },
    { src: img6, alt: '7층 로비' },
    { src: img7, alt: '7층 교육장' },
    { src: img8, alt: '7층 교육장' }
  ];

  return (
    <ImageListContainer>
      {images.map((img, index) => (
        <ImageItem key={index}>
          <ImageWrapper>
            <Image src={img.src} alt={img.alt} />
          </ImageWrapper>
          <Text>{img.alt}</Text>
        </ImageItem>
      ))}
    </ImageListContainer>
  );
};

export default ImageList;
