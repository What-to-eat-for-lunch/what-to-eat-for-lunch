//2. 메뉴 선택창(한식, 양식, 중식,)
import React from 'react';
import { Link } from 'react-router-dom';

const selectMenu=()=>{
    return <div>
        <div className="header" >
            <h2><Link to="/">점심뭐먹지?</Link></h2>
            <hr/>
        </div>
        <div className="contents">
            <button>한식</button><br/>
            <button>중식</button><br/>
            <button>양식</button><br/>
            <button>일식</button><br/>
        </div>
    </div>;
}

export default selectMenu;