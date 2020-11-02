//룰렛 화면
import React,{ Component } from 'react';
import '../components/css/roulette.css';
import '../components/common/Button.css';
import {TweenLite } from 'gsap';
import { Sine } from '../../node_modules/gsap/gsap-core';
import { Linear } from '../../node_modules/gsap/gsap-core';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import jQuery from "jquery";
import * as App from '../App';
window.$ = window.jQuery = jQuery;


class roulette extends Component{  

    //렌더링 완료 후 실행되는 메소드
    componentDidMount(){
      var data;
      var arrData=new Array("국밥","국수","고기","냉면","곰탕","해물");//배열선언
      
      function iniGame(num){//룰렛 초기
         data=num;
        
         //TweenLite:룰렛애니메이션 효과를 주기위해 사용
         TweenLite.killTweensOf($(".board_on"));//특정 트윈 죽이기
         TweenLite.to($(".board_on"),0,{css:{rotation:rotationPos[data]}});//애니메이션의 최종지점
         TweenLite.from($(".board_on"),5,{css:{rotation:-3000},onComplete:endGame, ease:Sine.easeOut});//애니메이션의 시작지점(회전을 위해 Sine 사용)
         console.log("data 숫자:"+(data)+"rotationPos"+rotationPos);
      };

      var rotationPos = [60,120,180,240,300,360];

      TweenLite.to($(".board_on"), 360, {css:{rotation:-4000}, ease: Linear.easeNone});//움직임 없애기

      //룰렛 돌린 후 메소드
      function endGame(){
       var result=arrData[data];
         console.log("결과: " + result );
       
         //룰렛 하단에 추천 음식 결과 출력
         $('#result').text("결과:"+result);
        //map.js로 이동하는 버튼 생성
       var str='<button>맛집 추천 지도</button></a>';
       $('#mapButton').html(str);
        
       document.getElementById('mapButton').onclick = function () {
          //위치 받아오기
          let {lat, lng} = App.getPosition(); 
          //서버로 데이터 전송 호출
          sendData(result,lat,lng);

      };

      };

      
      //URL설정
      const getURL=(keyword, lat, lng)=>{
        return keyword+'/'+lat+'/'+lng;
      }

      //서버로 데이터 전송
      const sendData= async(keyword,lat,lng)=>{
        console.log("sendData:"+keyword+"/lat:"+lat+"/lng:"+lng);
        if (lat == undefined && lng == undefined) {
          alert('위치 정보를 설정해주세요.')
          return;
        }
        const url='http://localhost:8000/lunch_parser/keyword'+'/'+getURL(keyword,lat,lng)

        //axios 사용
        await axios.get(url).then(res=>{
          if(res.data.length==0)
            alert('주변에 추천드릴 음식점이 없어요 ㅜㅜ')
          else{
            //App에 응답 데이터 저장
            App.setData(res.data);

            return <Redirect to='/map'></Redirect>
          }
        })
      }

    

      $(function() {
       var clicked  =0;
       
       for(var i=0; i<arrData.length; i++){
         $(".board_on").append('<span>'+arrData[i]+'</span>');
       }
   
       $(".join").on("mousedown",function(e){
         if( clicked <= 0){    iniGame(Math.floor(Math.random() *6));    }
         else  if( clicked >=1 ){   
           confirmAlert({
              title:'다시 돌리기',
              message:'다시 추천받으시겠습니까?',
              buttons:[
                {
                  label:'예',
                  onClick:()=>{iniGame(Math.floor(Math.random() *6));
                  $('#mapButton').append();}
                },{
                 label:'아니오',
                 onClick:function(){
                   e.preventDefault();
                  }
                 }
             ]
            });
           }
         clicked ++
       });
   });
 }


    //컴포넌트를 DOM에 부착(렌더링)
    render(){
      // App에 저장한 데이터 읽어오기
      console.log(App.getData());
      return(
          <div id="contents">
        <Link to="/"> 
                <button class="previous_step">이전단계로 돌아가기</button>
        </Link>

              <div id="wrap">
              <div id="gameContainer">    
                  <div class="board_start join">시작버튼</div>
                    <div class="board_on obj"></div>         
              </div>
              <div id="resultContainer">
                  <h3 id="result"></h3>
                  <span id="mapButton"></span>
              </div>    
          </div>
          <footer/>
          </div>
      );
    }
}

export default roulette;