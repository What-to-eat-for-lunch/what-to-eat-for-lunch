/* global kakao */
import React, { useState, useEffect } from 'react'
import Header from '../header/header';
import Footer from '../footer/footer';
import { Link } from 'react-router-dom';
import '../components/common/Button.css';
import '../components/css/map.css';
import * as App from '../App';

const APP_KEY = 'dfa21c11ffd9592aa4e83b78260f76ae'

const KakaoMap = () => {
  const [map, setMap] = useState(false)
  const imgSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

  let position = App.getPosition();
  let data = App.getData();

  console.log(data);
  console.log(position);
  console.log(map);
  //지도 생성
  const createMap = () => {
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false`
    document.head.appendChild(script1)
    script1.onload = () => {
      const { kakao } = window
      kakao.maps.load(() => {
        let container = document.getElementById('listMap')
        let options = {
          center: new kakao.maps.LatLng(position['lat'], position['lng']),
          level: 5,
        }
        const createdMap = new kakao.maps.Map(container, options)
        let imgSize = new kakao.maps.Size(24,35);
        let img = new kakao.maps.MarkerImage(imgSrc,imgSize);
        setMap(createdMap)       
        displayMarker({'name':'내 위치', 'lat':position['lat'],'lng':position['lng']},img);
      })
    }

    const script2 = document.createElement('script')
    script2.async = true
    script2.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&libraries=services,clusterer,drawing&autoload=false`
    document.head.appendChild(script2)
  }

  //장소 검색 객체 생성
  const renewal=()=>{
    data = App.getData();
    dataDisplay()
  }

  //맛집위치에 마커 표시
  function displayMarker(data, img){
    const { kakao } = window
     // 마커를 생성하고 지도에 표시합니다
       const marker = new kakao.maps.Marker({
         map : map,
         position: new kakao.maps.LatLng(data['lat'],data['lng']),
         title:data['name'],
         image: img,
         clickable : true
       });
       var infowindow = new kakao.maps.InfoWindow({zIndex:1});
  // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function() {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent('<div style="padding:5px;font-size:12px; justify-content: center">' + data['name']+'</div>');
      infowindow.open(map, marker);
  });
     }


  function dataDisplay()
  {
    console.log(data);
    for(let i in data){
      displayMarker(data[i]);  
    }  
  }

    if(!map)
    {
      console.log(App.getPosition());
      createMap();
      //dataDisplay()
    }

  return (
    <div className="App">
        <Link to="/roulette"> 
                <button class="previous_step">이전단계로 돌아가기</button>
        </Link>
        <h2>맛집 추천 지도</h2>
        <button class="right" onClick={renewal}>갱신</button>
      
      <div className='container'>
        <div className ='area'>
          <div id="listMap" style={{ width: '70vw', height: '60vh' }}></div>
        </div>
      
      </div>
      
    </div>
  )
}

export default KakaoMap