import React from 'react';
import { Route } from 'react-router-dom'
import Home from './pages/home';
import map from './pages/map';
import roulette from './pages/roulette';
import './App.css';
import Header from './header/header';

//import Header from './header/header'; //헤더파일 넣기

let keywords = null;
let positionData = [];

// 룰렛에 사용할 2차 분류 키워드 get, set
export function setKeyword(data) {
    keywords = data;
}

export function getKeyword() {
    return keywords;
}

// 위치 정보 get, set
export function setPosition(lat, lng) {
    positionData['lat'] = lat;
    positionData['lng'] = lng;
}

export function getPosition() {
    return positionData;
}

const App=()=>{




    return (
        <div>
           <Header/>
           <Route component={Home} path="/" exact="true"></Route>
           <Route component={roulette} path="/roulette"></Route>
           <Route component={map} path="/map"></Route>
        </div>
    );
};

export default App;
