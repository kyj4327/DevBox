import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';



const KakaoMap = () => {
  return (
    <Map
      center={{ lat: 35.17279648092132, lng: 129.13070719264186 }}
      style={{ width: '100%', height: '400px' }}
    >
      <MapMarker position={{ lat: 35.17279648092132, lng: 129.13070719264186 }}>
        <div style={{ color: '#000' }}>부산산업정보진흥원</div>
      </MapMarker>
    </Map>
  );
};

export default KakaoMap;