/* global kakao */
import React, { useState, useEffect } from 'react'
import Header from '../header/header';
import Footer from '../footer/footer';
import { Link } from 'react-router-dom';
import '../components/common/Button.css';
import '../components/css/map.css';
import * as App from '../App';

const APP_KEY = 'dfa21c11ffd9592aa4e83b78260f76ae'
const divBtnOpt = {
  width: '50px',
  height: '50px',
  position: 'fixed',
  top: '100px',
  zIndex: '10',
}

const KakaoMap = () => {
  const [map, setMap] = useState(null)
  const [markerArr, setMarkerArr] = useState([])
  const [locationArr, setLocationArr] = useState([])

  let position = App.getPosition();
  const data = App.getData();

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
          level: 3,
        }
        const createdMap = new kakao.maps.Map(container, options)
        displayMarker({'name':'내 위치', 'lat':position['lat'],'lng':position['lng']});
        setMap(createdMap)       
      })
    }

    const script2 = document.createElement('script')
    script2.async = true
    script2.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&libraries=services,clusterer,drawing&autoload=false`
    document.head.appendChild(script2)
  }

  //장소 검색 객체 생성
  const renewal=()=>{
      const { kakao } = window
      // 현위치 셋팅
      const [lat, lng] = App.getPosition();
      console.log(lat,lng)
      let locPosition = new kakao.maps.LatLng(lat, lng)
      displayMarker(locPosition);
      var ps = new kakao.maps.services.Places(); 
      //키워드로 장소 검색 객체 생성
      ps.keywordSearch('이태원 맛집', placesSearchCB);
  }

  //맛집위치에 마커 표시
  function displayMarker(data){
    const { kakao } = window
     // 마커를 생성하고 지도에 표시합니다
     let infoWindow = new kakao.maps.InfoWindow({zIndex:1});
       let marker = new kakao.maps.Marker({
         map : map,
         position:new kakao.maps.LatLng(data['lat'],data['lng'])
       });
       kakao.maps.event.addListener(marker, 'click', function() {
         infoWindow.setContent('<div style="padding:5px;font-size:12px;">' + data['name'] + '</div>')
         infoWindow.open(map, marker);
       })
      marker.setMap(map);
     }


  function dataDisplay()
  {
    for(let i in data){
      displayMarker(data[i]);  
    }  
  }
 
  //키워드 검색 완료시 호출되는 콜백함수
  function placesSearchCB (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();
        map.setCenter(new kakao.maps.LatLng(data[0].y, data[0].x));

        for (var i=0; i<data.length; i++) {
            displayMarker(data[i]);    
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
      }
    }

    useEffect(() => {
      createMap()
      dataDisplay()
    }, [])

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