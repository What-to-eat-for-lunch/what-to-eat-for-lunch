import React from 'react'
import './header.css'
import logo from './logo.png';
import Modal from './Modal'

export class Storage extends React.Component {

    stored = null;

    Save(data) {
        this.stored = data;
    }
    
    Load() {
        return this.stored;
    }
}

const Header=()=>{
//현위치 검색 모달창을 가진 헤더
    return(
        <div className='header'>
            <div className="logo">
                <a href='/'><img src={logo}/></a>
            </div>
          
              <div class="form-inline">
              <Modal buttonLabel={"현위치 설정"}></Modal>
              </div>  
            
        </div>
    ); 
}

export default Header;
