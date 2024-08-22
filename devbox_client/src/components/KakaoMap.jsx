import React, { useEffect } from 'react';

const KakaoMap = () => {
  useEffect(() => {
    // Initialize map function
    const initializeMap = () => {
      if (window.kakao && window.kakao.maps) {
        // Check if LatLng is available
        if (typeof window.kakao.maps.LatLng === 'function') {
          const container = document.getElementById('map'); // Map container div
          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), // Initial center position
            level: 3 // Initial zoom level
          };
          new window.kakao.maps.Map(container, options); // Create the map
        } else {
          console.error("window.kakao.maps.LatLng is not available.");
        }
      } else {
        console.error("Kakao maps API is not loaded.");
      }
    };

    // Load Kakao maps API script
    const loadScript = () => {
      const existingScript = document.getElementById('kakao-map-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=c717c522c9aba1d623422dd8ba455044';
        script.id = 'kakao-map-script';
        script.async = true;
        script.onload = initializeMap; // Initialize map after script is loaded
        script.onerror = () => console.error('Failed to load Kakao Maps API script');
        document.body.appendChild(script);
      } else {
        // If script is already loaded, initialize map
        initializeMap();
      }
    };

    loadScript();

    // Clean up script when the component unmounts
    return () => {
      const script = document.getElementById('kakao-map-script');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      id="map"
      style={{ width: '100%', height: '400px', marginTop: '20px' }} // Adjust height and margin as needed
    />
  );
};

export default KakaoMap;
