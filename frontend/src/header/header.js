import React, { Component } from 'react';
import logo from './logo.png';

class Header extends Component{
    render(){
        return <div style={{backgroundColor:'#DAD9FF', minWidth:'100%'}}>
            <div className="header">
                <a href='/'><img src={logo}/></a>
            </div>

        </div>;
    }
}

export default Header;