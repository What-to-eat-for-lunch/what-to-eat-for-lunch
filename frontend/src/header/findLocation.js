/* global kakao */
import React, { useState, useEffect } from 'react'
import * as App from '../App';

const APP_KEY = 'dfa21c11ffd9592aa4e83b78260f76ae'
const divBtnOpt = {
  width: '50px',
  height: '50px',
  position: 'fixed',
  top: '100px',
  zIndex: '10',
}

const FindLocation = () => {
    const [text,setText]=useState("");

    const setInputText= e=>{
      setText(e.target.value);
    };

  const [map, setMap] = useState(null)
  const [locationArr, setlocationArr] = useState(null)

  //지도 생성
  const createMap = () => {
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false`
    document.head.appendChild(script1)
    script1.onload = () => {
      const { kakao } = window
      kakao.maps.load(() => {
        let container = document.getElementById('Mymap')
        let options = {
          center: new kakao.maps.LatLng(37.506502, 127.053617),
          level: 3,
        }
        const createdMap = new kakao.maps.Map(container, options)
        setMap(createdMap)       
      })
    }

    const script2 = document.createElement('script')
    script2.async = true
    script2.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&libraries=services&autoload=false`
    document.head.appendChild(script2)

    const script3 = document.createElement('script')
    script3.async = true
    script3.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&libraries=services,clusterer,drawing&autoload=false`
    document.head.appendChild(script3)

  }

  //장소 검색 객체 생성
  const createps=()=>{
      const { kakao } = window
      //장소 검색 객체 생성
      var ps = new kakao.maps.services.Places(); 
      //키워드로 장소 검색 객체 생성
      ps.keywordSearch(text, placesSearchCB);
  }

  //맛집위치에 마커 표시
  function displayMarker(place){
    const { kakao } = window
     // 마커를 생성하고 지도에 표시합니다
     var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x) 
  });
  // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
  var infowindow = new kakao.maps.InfoWindow({zIndex:1});
  // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener(marker, 'click', function() {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
      infowindow.open(map, marker);
  });
}
 
  //키워드 검색 완료시 호출되는 콜백함수
  function placesSearchCB (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();
        map.setCenter(new kakao.maps.LatLng(data[0].y, data[0].x));

        displayMarker(data[0]);    
        bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));
        App.setPosition(data[0].y,data[0].x);
        setlocationArr(data[0].y,data[0].x);
      }
    }
    useEffect(() => {
      createMap()    
    }, [])

  

  return <div>
        <form class="form-inline mt-2 mt-md-0" action="/place='{text}'">
                <input class="form-control mr-sm-2" type="text" placeholder="현위치입력" value={text} onChange={setInputText}/>
                <button class="btn btn-outline-success my-2 my-sm-0" type="button" onClick={createps}>검색</button>
        </form>  
      <br/>
      <div id="Mymap" style={{ width: '400px', height: '200px' }}></div>
    </div>
}

export default FindLocation