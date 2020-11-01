//HOME화면(메인페이지)
import React, { useState } from 'react';
import '../components/css/home.css';
import '../components/css/carousel.css';
import { Link } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import { Button, Modal, ModalBody, ModalFooter, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';

const Home=()=>{

  const [modal, setModal] = useState(false);
  const modalToggle = () => setModal(!modal);

  const [togetherPop, setTogetherPop] = useState(false);
  const togetherToggle = () => setTogetherPop(!togetherPop);

    return <div className="container">
      
    <Header>
        <h2><Link to="/">점심뭐먹지?</Link></h2>
        <hr/>
    </Header>
    <div className="row">
      <div className="col-lg-4">
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
                  <Button>한식</Button>{' '}
                  <Button>중식</Button><br></br><br></br>
                  <Button>일식</Button>{' '}
                  <Button>양식</Button><br></br><br></br>
                  <Button>아시안</Button>{' '}
                  <Button>랜덤</Button>
                </PopoverBody>
              </UncontrolledPopover>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div id='vegan'>
                <Button color="link" className='image'></Button>
              </div>
            </td>
            <td>
              <div id='cafe'>
                <Button color="link" className='image'></Button>
              </div>
            </td>
          </tr>
        </table>        
      </div>
    </div>
    <Footer/>

  </div>;
}

export default Home;