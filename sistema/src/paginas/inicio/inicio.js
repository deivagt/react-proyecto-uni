
import React, { Component } from "react";
import './inicio.css';

import { Link } from "react-router-dom";

export default class inicio extends Component {

  




    render() {
        return (
          <form className="venIniSes">
            <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
             
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/inicioSesion"}>Login</Link>
                    
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to={"/registro"}>Registrarse</Link>
                    
                  </li>
                </ul>
              </div>
            </div>
            </nav>
            </form>
        );
    }
}

