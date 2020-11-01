//2. 메뉴 선택창(한식, 양식, 중식,)
import React from 'react';
import '../components/common/Button.css';
import Footer from '../footer/footer';
import { Link } from 'react-router-dom';

const selectMenu=()=>{
    return <div>

        <Link to="/"> 
                <button class="previous_step">이전단계로 돌아가기</button>
        </Link>
        <div className="contents">
            <button>한식</button><br/>
            <button>중식</button><br/>
            <button>양식</button><br/>
            <button>일식</button><br/>
        </div>
        <Footer/>
    </div>;
}

export default selectMenu;