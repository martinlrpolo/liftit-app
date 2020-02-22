import React, { Component } from 'react';
import fire from '../../config/Fire';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import Places from '../Places/Places';

class Home extends Component <any, any>{
  constructor(props : any) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <div className="Home">
        <div id="wrapper">
          <Menu></Menu>
          <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Header></Header>
                  <div className="container-fluid">
                    <Places></Places>
                  </div>
              </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Home;

