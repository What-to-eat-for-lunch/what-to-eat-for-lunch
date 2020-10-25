$(document).ready(function() {
    var gift;
       var  present =[ 1,2,3 , 4,5,6 ]

    iniGame = function(num){
        gift = num;
        TweenLite.killTweensOf($(".board_on"));
        TweenLite.to($(".board_on"), 0, {css:{rotation:rotationPos[gift]}});
        TweenLite.from($(".board_on"),5, {css:{rotation:-3000}, onComplete:endGame, ease:Sine.easeOut});
               console.log("gift 숫자 : "+ (gift +1) +"rotationPos" + rotationPos );
    }

    var rotationPos = new Array(60,120,180,240,300,360);

    TweenLite.to($(".board_on"), 360, {css:{rotation:-4000}, ease: Linear.easeNone});
    function endGame(){
              var  copImg= "http://img.babathe.com/upload/specialDisplay/htmlImage/2019/test/coupon"+( gift +1) + ".png";
                console.log("이미지 : " + copImg );
              $('#result').text("결과:"+copImg);

              var str='<input type="button" id="btn" value="맛집 추천 지도"/>';
              $('#mapButton').html(str);
 
    }
    
});


$(function() {
    var clicked  =0;
    for(i=1; i<7; i++){
    // 상품쪽 이미지는 신경 안쓰셔도 됩니다!! 책임님!!!
      var  pictures = "http://img.babathe.com/upload/specialDisplay/htmlImage/2019/test/coupon"+ i  + ".png";
      $(".board_on").append('<img  src="' + pictures + '" />');
    }

    $(".join").on("mousedown",function(){
      if( clicked <= 0){    iniGame(Math.floor(Math.random() *6));    }
      else  if( clicked >=1 ){   
          if(confirm('다시 추천받으시겠습니까?')){
            iniGame(Math.floor(Math.random() *6));
            $('#mapButton').append();
        }else{
            event.preventDefault();
        }
     }
      clicked ++
    });
})