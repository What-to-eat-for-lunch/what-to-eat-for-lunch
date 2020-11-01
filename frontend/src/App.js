import React from 'react';
import { Route } from 'react-router-dom'
import Home from './pages/home';
import map from './pages/map';
import roulette from './pages/roulette';
import './App.css';
import Header from './header/header';

//import Header from './header/header'; //헤더파일 넣기

let stored_data = null;

export function Save(data) {
    stored_data = data;
}

export function Load() {
    return stored_data;
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
