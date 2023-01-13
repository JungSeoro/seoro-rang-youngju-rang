import React, { useEffect, useState } from 'react'; 
const { kakao } = window; 
const Map = () => { 
    const [map,setMap] = useState(null);
    useEffect(()=>{ 
        const container = document.getElementById('map');
        const options = { 
            center: new kakao.maps.LatLng(37.495053, 127.1155166),
            level:5
        };
        const kakaoMap = new kakao.maps.Map(container, options); 
        setMap(kakaoMap); },[]) 
        const markerPosition  = new kakao.maps.LatLng(37.495053, 127.1155166); 
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);
        return ( 
                <div id="map" style={{ 
                    width: '100vw', 
                    height: 'calc( 100vw / 1.618)'
                }}>
            </div> 
        );
    }; 
export default Map;
