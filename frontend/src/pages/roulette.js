//룰렛 화면
import React,{ Component } from 'react';
import '../components/css/roulette.css';
import '../components/common/Button.css';
import {TweenLite } from 'gsap';
import { Sine } from '../../node_modules/gsap/gsap-core';
import { Linear } from '../../node_modules/gsap/gsap-core';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import $ from 'jquery';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;


class roulette extends Component{  

    //렌더링 완료 후 실행되는 메소드
    componentDidMount(){
      var data;

      function iniGame(num){//룰렛 초기
         data=num;
        
         //TweenLite:룰렛애니메이션 효과를 주기위해 사용
         TweenLite.killTweensOf($(".board_on"));//특정 트윈 죽이기
         TweenLite.to($(".board_on"),0,{css:{rotation:rotationPos[data]}});//애니메이션의 최종지점
         TweenLite.from($(".board_on"),5,{css:{rotation:-3000},onComplete:endGame, ease:Sine.easeOut});//애니메이션의 시작지점(회전을 위해 Sine 사용)
         console.log("data 숫자:"+(data+1)+"rotationPos"+rotationPos);
      };

      var rotationPos = [60,120,180,240,300,360];

      TweenLite.to($(".board_on"), 360, {css:{rotation:-4000}, ease: Linear.easeNone});//움직임 없애기

      //룰렛 돌린 후 메소드
      function endGame(){
       var  copImg= "http://img.babathe.com/upload/specialDisplay/htmlImage/2019/test/coupon"+( data +1) + ".png";
         console.log("이미지 : " + copImg );
       
         //룰렛 하단에 추천 음식 결과 출력
         $('#result').text("결과:"+copImg);
        //map.js로 이동하는 버튼 생성
       var str='<a href="/map"><button>맛집 추천 지도</button></a>';
       $('#mapButton').html(str);
      };

      $(function() {
       var clicked  =0;
       for(var i=1; i<7; i++){
       // 상품쪽 이미지는 신경 안쓰셔도 됩니다!! 책임님!!!
         var  pictures = "http://img.babathe.com/upload/specialDisplay/htmlImage/2019/test/coupon"+ i  + ".png";
         $(".board_on").append('<img  src="' + pictures + '" />');
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
      return(
          <div id="contents">
            <Header>
              <h2><Link to="/">점심뭐먹지?</Link></h2>
               <hr/>
             </Header>
        <Link to="/"> 
                <button class="previous_step">이전단계로 돌아가기</button>
        </Link>
        <h2 style={{textAlign:'center'}}>혼밥룰렛</h2>

              <div id="wrap">
              <div id="gameContainer">    
                  <div class="board_start join">시작버튼</div>
                    <div class="board_on obj"></div>         
              </div>
              <h3 id="result"></h3>
              <span id="mapButton"></span>
    
          </div>
          <footer/>
          </div>
      );
    }
}

export default roulette;