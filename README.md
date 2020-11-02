# 점심 뭐 먹지? (What to eat for lunch)

본 프로젝트는 점심 메뉴 선택을 어려워하는 사람들을 위해 기획된 웹 어플리케이션이다. 사용자의 현재 위치 기반으로 주변 음식점을 탐색하며, 선택이 힘들 땐 룰렛 게임 기능으로 선택을 대신해주는 서비스를 제공한다. 최종적으로 선택한 분류에 해당하는 주변 음식점을 지도 API를 이용하여 출력한다.   
<hr>

## 사용 기술/버전
* Front-end
  * Boostrap : V4.5.3
  * node : v14.15.0 / npm : 6.14.8 (lts) / yarn : v.1.22.10
  * react : v17.0.1 / react-router-dom: v5.2.0
  * jquery : v3.5.1
  * gsap :  v3.5.1
  * reactstrap : v8.7.0
  * axios : v0.21.0
    
* Back-end
  * python : v3.8.5
  * django : v3.1.2
  * django-rest-framework : v3.12.1
  * markdown : v3.3.1
  * django-filter : v2.4.0
  * django-cors-headers : v3.5.0

<hr>

## Install
```
   npm update
```
### Frontend
```
   yarn start
```
### Backend
```
   python manage.py runserver 8000
```
* KAKAO API 관련 키가 필요합니다.
  * Backend 폴더에 key.json을 생성한 뒤 아래와 같이 입력합니다.
      ```
      {
         "KAKAO_KEY" : "Your key number",
         "GOOGLE_KEY": "Your key number"
      }
      ```
      KAKAO API에서 REST API키를 발급받아 위에 입력하면 됩니다.   
      GOOGLE_KEY는 채식 검색에 사용됩니다. 
<hr>

## 요구사항
F : Front-end / B : Back-end   
🐵 : 이동호   
🐰 : 유혜림
|분류|요구사항|상세|구현|담당|
|:--:|:--:|:--|--|--|
|Front|페이지 디자인|페이지 상세 디자인|:heavy_check_mark:|🐰| 
|Front|데이터 송수신|REST API 호출 구현|:heavy_check_mark:|🐵|
|Front|Response 후 페이지 전환 | REST Request 후 응답오면 상황에 맞춰 페이지 전환|:heavy_check_mark:|🐵|
|F-01-01| 사용자 위치 설정|사용자의 위도, 경도를 얻어온다.|:heavy_check_mark:|🐰|
|F-01-02| 분류 선택 | 같이 먹기, 채식, 디저트 분류 선택|:heavy_check_mark:|🐰|
|F-01-03| 음식 분류 선택 | 1차 분류 선택 후 페이지 전환 |:heavy_check_mark:|🐵|
|F-01-04| 음식 랜덤 분류 | 1차 분류 랜덤 결정 후 페이지 전환|:heavy_check_mark:|🐵|
|F-02-03| 룰렛| 룰렛을 돌려 랜덤으로 음식 메뉴 선택 |:heavy_check_mark:|🐰|
|F-03-01| 주변 음식점 출력 | 선택한 분류에 해당하는 주변 음식점 리스트 출력|:x:|🐰|
|F-03-02| 지도 API | 리스트에서 선택한 가게 위치를 지도상으로 보여준다 | :x: |🐰|
|Back|카카오 맵 API|카카오 맵을 이용한 데이터 크롤링|:heavy_check_mark:|🐵|
|Back|Google map API | 구글 맵을 이용해 비건 데이터 크롤링 | :heavy_check_mark: | 🐵|
|Back|통신 클래스|카카오 API와 REST API를 주고받는 클래스 설계|:heavy_check_mark:|🐵|
|Back|파서 클래스|통신 클래스를 통해 받은 데이터를 가공 후 전송 |:heavy_check_mark:|🐵|
|Back|RESTful API | 프론트와 통신하는 RESTful API 규약 설계|:heavy_check_mark:|🐵|
|Back|Django rest framework | Django rest framework 적용|:heavy_check_mark:|🐵|
|Back|React - Django 연동 | 연동 | :heavy_check_mark: | 🐵|

 <hr>

## REST API
|Method|URL|View|설명|
|--|--|--|--|
|GET|/genere/[genretype]/[lat]/[lng]|genre_view.as_view()|**genretype : 1차 분류** <br> 2차 분류 크롤링 결과를 반환한다.|
|GET|/keyword/[keyword]/[lat]/[lng]|keyword_view.as_view()|**keyword : 2차 분류** <br> 2차 분류에 해당하는 음식점의 이름, 위치를 반환한다.|
  
  - lat (Latitude) : 위도 / lng (Longitude) : 경도
  - 1차 분류 : 한식, 일식, 양식, 중식 ...
  - 2차 분류 : 고기, 샌드위치, 피자, 돈까스 ...

<hr>  

## 상세 페이지 디자인
![home](https://github.com/What-to-eat-for-lunch/what-to-eat-for-lunch/blob/main/readme_img/home.PNG)   
1. Header 영역
2. Logo : 클릭하면 홈으로 이동
3. 음식 종류 버튼들 (혼밥, 같이밥, 채식, 디저트)
4. 혼밥 메뉴 (준비중 팝업)
5. 같이 밥 메뉴  : 클릭하면 8번 팝오버 등장
6. 채식메뉴
7. 디저트 메뉴
8. 음식 장르 팝 오버
9. 음식 장르 선택 버튼 (한식, 양식, 중식, 일식 ...)   
    
![룰렛](/readme_img/rolutte.PNG)
1. Header
2. 시작 버튼
3. 룰렛 영역
4. 룰렛 결과 문자열
5. 음식점 추천 페이지 이동 버튼
6. 이전 페이지로 이동
   
![맵](/readme_img/map.PNG)
1. Header
2. 선택한 음식 2차 분류 출력 문자열
3. 지도 api
4. 주변 음식점 리스트
5. 이전 페이지로 이동 
<hr>   

## 일정
* 2020.10.26 24:00 -> 3차 과제 마감
* 2020.11.02 24:00 -> 4차 과제 마감

   **🐰 유혜림**
   - [x] 지도 제외 및 FE 페이지 틀 구현
   - [x] MTV 모델 기반 디자인
   - [x] React.js 연동
   - [x] 카카오 MAP API 연동-키워드 장소 검색 가능
   - [x] 부트스트랩 적용 
   - [x] F-02-03
   - [x] F-01-01 (modal)
   - [ ] F-03-01
   - [ ] F-03-02
   - [ ] 최종 디자인 수정

   **🐵 이동호**
   - [x] 카카오 맵 API 연동
   - [x] 구글 맵 API 연동
   - [x] MTV 기반 M,V 설계
   - [x] 크롤링 클래스 설계 & 구현
   - [x] Django rest framework 적용
   - [x] React - Django 연동
   - [x] RESTful API 설계
   - [x] F-01-03 : popover 
   - [x] sub category random
   - [X] page redirect
   - [x] vegan -> map
   - [x] 현재 위치 자동 파악 기능 추가 - HTML Gelocation
   - [x] 현재 위치 파악 안된 경우 alert 호출
   - [x] 키값 json으로 관리 기능 추가

   



