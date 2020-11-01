import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';    
import FindLocation from './findLocation';

    class ModalExample extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          modal: false
        };
    
        this.toggle = this.toggle.bind(this);
      }
      
      toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
      
      render() {
        return (
          <div>
            <Button onClick={this.toggle}>{this.props.buttonLabel}</Button>
            
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle} className="handle">현위치 설정</ModalHeader>
              <ModalBody>
                 <FindLocation></FindLocation>
                 <p></p>
              </ModalBody>
              <ModalFooter>
                <form method="get" action="/position.x=">
                  <Button color="primary" onClick={this.toggle}>설정</Button>{' '}
                  <Button color="secondary" onClick={this.toggle}>취소</Button>
                </form>
              </ModalFooter>
            </Modal>
          </div>
        );
      }
    }
    
    export default ModalExample;