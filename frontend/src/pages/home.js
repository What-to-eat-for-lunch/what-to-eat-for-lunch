//HOME화면(메인페이지)
import React from 'react';
import '../components/css/home.css';
import '../components/css/carousel.css';
import { Link } from 'react-router-dom';


const Home=()=>{
    return <div className="container marketing">
    <div className="header" >
        <h2><Link to="/">점심뭐먹지?</Link></h2>
        <hr/>
    </div>
    <div className="row">
      <div className="col-lg-4">
        <table>
          <tr>
            <td>
              <Link to="/selectMenu?type=alone" id="alone">
                <div className="image">
                     <div className="text"><p>혼밥룰렛</p></div>
                </div>
              </Link>
            </td>
            <td>
              <Link to="/selectMenu?type=together" id='together'>
                <div className="image">
                      <div className="text"><p>같이밥룰렛</p></div>
                </div>
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link to="/selectMenu?type=diet" id='diet'>
                <div className="image">
                       <div className="text"><p>다이어터룰렛</p></div>
                </div>
              </Link>
            </td>
            <td>
              <Link to="/selectMenu?type=cafe" id='cafe'>
              <div className="image">

                     <div className="text"><p>카페룰렛</p></div>
              </div>
              </Link>
            </td>
          </tr>
        </table>        
      </div>
    </div>

  </div>;
}

export default Home;