//HOME화면(메인페이지)
import React, { useState, useEffect } from 'react';
import '../components/css/home.css';
import '../components/css/carousel.css';
import Footer from '../footer/footer';
import * as App from '../App';
import { Button, Modal, ModalBody, ModalFooter, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken"

const Home = () => {

  const [modal, setModal] = useState(false);
  const modalToggle = () => setModal(!modal);

  const [togetherPop, setTogetherPop] = useState(false);
  const togetherToggle = () => setTogetherPop(!togetherPop);

  const [nFlag, setNFlag] = useState(false);
  const [vFlag, setVFlag] = useState(false);

  getLocation();
  let position = App.getPosition();

  // 현재 위치 파악 함수
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } 
  }
  
  function showPosition(position) {
    App.setPosition(position.coords.latitude, position.coords.longitude);
  }

  const getURL = (genre) => {
    return genre+'/'+position['lat']+'/'+position['lng'];
  }

  const sendGet = async (type, genre) => {
    if (position['lat'] === undefined && position['lng'] === undefined) {
      getLocation();
      if(position['lat'] === undefined && position['lng'] === undefined){
        alert('위치 정보를 설정해주세요.')
        return;
      }
    }
    const url = 'http://localhost:8000/lunch_parser/'+type + '/'+ getURL(genre)
    await axios.get(url).then(res => {
        if(res.data.length == 0)
          alert('주변에 추천드릴 음식점이 없어요 ㅜㅜ')
        else
        {
          // App에 응답 데이터 저장
          App.setData(res.data);

          // rerender후 페이지 이동 꼼수
          if (genre != "채식") {
            setNFlag(true);
          }
          else {
            setVFlag(true);
          }
        }         
    })
  }
  

    if(nFlag) {
      return <Redirect to='/roulette'></Redirect>
    }
    if(vFlag){
      return <Redirect to='/map'></Redirect>
    }

    return (<div className="body">
    <div className="container">
      <div>
        <table>
          <tr>
            <td>
                <div id='alone'>
                  <Button color="link" className='image' onClick={modalToggle}></Button>
                  <Modal isOpen={modal} modalToggle={modalToggle}>
                    <ModalBody>준비 중 입니다.</ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={modalToggle}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
              </div>
            </td>
            <td>
              <div id='together'>
              <Button color="link" className='image' id='togetherPop' onClick={togetherToggle}></Button>
              <UncontrolledPopover trigger="legacy" placement="right" isOpen={togetherPop} target="togetherPop" toggle={togetherToggle}>
                <PopoverHeader>세부 분야</PopoverHeader>
                <PopoverBody>
                  <Button onClick={() => sendGet('genre','한식')} type="submit">한식</Button>{' '}
                  <Button onClick={() => sendGet('genre','중식')}>중식</Button><br></br><br></br>
                  <Button onClick={() => sendGet('genre','일식')}>일식</Button>{' '}
                  <Button onClick={() => sendGet('genre','양식')}>양식</Button><br></br><br></br>
                  <Button onClick={() => sendGet('genre','아시안')}>아시안</Button>{' '}
                  <Button onClick={() => sendGet('genre','랜덤')}>랜덤</Button>
                </PopoverBody>
              </UncontrolledPopover>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div id='vegan'>
                <Button color="link" className='image' onClick={() => sendGet('genre','채식')}></Button>
              </div>
            </td>
            <td>
              <div id='cafe'>
                <Button color="link" className='image' onClick={() => sendGet('genre','간식')}></Button>
              </div>
            </td>
          </tr>
        </table>        
      </div>
    </div>
    <Footer/>

  </div>);
}

export default withRouter(Home);