# 점심 뭐 먹지? (What to eat for lunch)

본 프로젝트는 점심 메뉴 선택을 어려워하는 사람들을 위해 기획된 웹 어플리케이션이다. 사용자의 현재 위치 기반으로 주변 음식점을 탐색하며, 선택이 힘들 땐 룰렛 게임 기능으로 선택을 대신해주는 서비스를 제공한다. 최종적으로 선택한 분류에 해당하는 주변 음식점을 지도 API를 이용하여 출력한다.   

## 사용 기술/버전
* Front-end
  * Boostrap : V4.5.3
  * node : v14.15.0 / npm : 6.14.8 (lts) / yarn : v.1.22.10
  * react : v17.0.1 / react-router-dom: v5.2.0
  * jquery : v3.5.1
  * gsap :  v3.5.1
* Back-end
  * python : v3.8.5
  * django : v3.1.2
  * django-rest-framework : v3.12.1
  * markdown : v3.3.1
  * django-filter : v2.4.0


## Install
```
   npm update
```
### Frontend
```
   npm install -g yarn
   npm install -g create-react-app
   npm install --save bootstrap (or yarn add bootstrap)
   npm install react-router-dom --save
   npm install gsap
   
```
### Backend
```
   pip install Django
   pip install djangorestframework
   pip install markdown
   pip install django-filter
```

## 요구사항
F : Front-end / B : Back-end   
🐵 : 이동호   
🐰 : 유혜림
|분류|요구사항|상세|구현|담당|
|:--:|:--:|:--|--|--|
|Front|페이지 디자인|페이지 상세 디자인|:heavy_check_mark:|🐰| 
|F-01-01| 사용자 위치 설정|사용자의 위도, 경도를 얻어온다.|:heavy_check_mark:|🐰|
|F-01-02| 분류 선택 | 같이 먹기, 다이어트, 디저트 분류 선택|:heavy_check_mark:|🐰|
|F-01-03| 음식 분류 출력 | 선택한 분류 기준으로 음식 장르를 출력해준다. |:x:||
|F-02-01| 음식 세부 분류 선택 | 현재 위치 주변 선택한 장르에 해당하는 2차 분류 출력|:x:||
|F-02-02| 세부 랜덤 선택 | 선택이 어려운 사람들을 위한 랜덤 기능|:x:||
|F-02-03| 룰렛| 룰렛을 돌려 랜덤으로 음식 메뉴 선택 |:heavy_check_mark:|🐰|
|F-03-01| 주변 음식점 출력 | 선택한 분류에 해당하는 주변 음식점 리스트 출력|:x:||
|F-03-02| 지도 API | 리스트에서 선택한 가게 위치를 지도상으로 보여준다 | :x: ||
|Back|카카오 맵 API|카카오 맵을 이용한 데이터 크롤링|:heavy_check_mark:|🐵|
|Back|통신 클래스|카카오 API와 REST API를 주고받는 클래스 설계|:heavy_check_mark:|🐵|
|Back|파서 클래스|통신 클래스를 통해 받은 데이터를 가공 후 전송 |:heavy_check_mark:|🐵|
|Back|RESTful API | 프론트와 통신하는 RESTful API 규약 설계|:x:|🐵|
|Back|Django rest framework | Django rest framework 적용|:heavy_check_mark:|🐵|
|Back|React - Django 연동 | 연동 | :x: | 🐵|


## 순서도
* React - Django 연동 후 업로드

## 상세 페이지 디자인
* 2020.10.31. 업로드 예정


## 일정
* 2020.10.26 24:00 -> 3차 과제 마감
* 2020.11.02 24:00 -> 4차 과제 마감

   **🐰 유혜림**
   - [x] 지도 제외 및 FE 페이지 틀 구현
   - [x] MTV 모델 기반 디자인
   - [x] React.js 연동
   - [x] 카카오 지도 연동
   - [x] 부트스트랩 
   - [x] 룰렛이벤트 구현
   - [ ] 사용자의 현위치 받아오기
   - [ ] 최종 디자인 

   **🐵 이동호**
   - [x] BE 데이터 크롤링 테스트 - (카카오 MAP API)
   - [ ] MTV 기반 M,V 설계
   - [x] 크롤링 클래스 설계 & 구현
   - [ ] Django rest framework 적용
   - [ ] React - Django 연동
   - [ ] RESTful API 설계
   - [ ] F-01-03
   


