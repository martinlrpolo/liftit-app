import React from 'react';
import './Menu.css';

function Menu() {
  return (
    <div className="Menu">
      
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="">
          <div className="sidebar-brand-icon rotate-n-15">
            <img width="50" src="https://liftit.co/assets/9c882145.svg" alt="" />
          </div>
          <div className="sidebar-brand-text mx-3">BIENVENIDOS</div>
        </a>
        
        <hr className="sidebar-divider my-0" />

        <li className="nav-item active">
          <a className="nav-link text-center" href="">
            <i className="fas fa-home"></i>
            <span>Inicio</span></a>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">
          Información personal
        </div>

        <li className="nav-item profile">
          <div className="card">
            <div className="card-body martin">
              <h5 className="card-title">Martin Rodriguez</h5>
              <img  src={process.env.PUBLIC_URL + '/assets/img/me.jpg'}  className="img-fluid" alt="Responsive image" />
              <p className="card-text">Full-Stack Developer.</p>
              <a href="https://www.instagram.com/s.p.i.r.i_t/" target="_blank" className="btn btn-primary"><i className="fab fa-instagram"></i></a>
              <a href="https://www.linkedin.com/in/martin97polo/" target="_blank" className="btn btn-primary"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </li>

      </ul>

    </div>
  );
}

export default Menu;
