import React, { Component } from 'react';
import './Header.css';
import fire from '../../config/Fire';

class Header extends Component <any, any>{

  constructor(props : any) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  /**
   * Close all session
   */
  logout() {
    fire.auth().signOut();
    localStorage.clear();
  }

  /**
   * Render method
   */
  render() {
    
    return (
      <div className="Header">
          
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow vertical-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown no-arrow">
                  <a className="nav-link dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false">
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">{localStorage.getItem('myemail')}</span>
                    <img className="img-profile rounded-circle" src={process.env.PUBLIC_URL + '/assets/img/user.png'} />
                  </a>
              </li>
              <li className="nav-item dropdown no-arrow">
                  <a href="" className="nav-link dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false" onClick={this.logout}>
                    <i className="fas fa-sign-out-alt"></i>
                  </a>
              </li>
            </ul>
        </nav>
  
      </div>
    );
  }
  

}


export default Header;
