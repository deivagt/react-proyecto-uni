import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './menuEst.css'

import { Link } from 'react-router-dom'
import miperfil from '../cosasEst/miperfil/miperfil'
import cursosAdmin from '../cosasEst/cursos/cursos'
import mensajes from '../cosasEst/mensajes/mensajes'

export default class menuEst extends Component {
  componentDidMount () {
    if (window.localStorage.getItem('tipo') === 'est') {
    } else if (window.localStorage.getItem('tipo') === 'admin') {
      alert('pagina no disponible')

      window.location.href = '/'
    } else if (window.localStorage.getItem('tipo') === 'cat') {
      alert('pagina no disponible')
      window.location.href = '/'
    } else if (window.localStorage.getItem('tipo') === 'col') {
      alert('pagina no disponible')
      window.location.href = '/'
    } else {
      alert('Inicia Sesion')
      window.location.href = '/'
    }
  }

  render () {
    /*  console.log(window.localStorage.getItem('id'));  */
    return (
      <Router>
        <div className='cuerpo'>
          <nav className='navbar navbar-expand-lg navbar-light '>
            <div className='container'>
              <div
                className='collapse navbar-collapse'
                id='navbarTogglerDemo02'
              >
                <ul className='navbar-nav ml-auto'>
                  <li className='nav-item'>
                    <Link className='nav-link' to={'/menuEstudiante/miperfil'}>
                      Mi Perfil
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link className='nav-link' to={'/menuEstudiante/cursos'}>
                      Cursos
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to={'/menuEstudiante/mensajes'}>
                      Mensajes
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link className='nav-link' to={'/cerrarSesion'}>
                      Cerrar Sesion
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div className='App'>
          <div className='auth-wrapper'>
            <div className='auth-inner'>
              <Switch>
                <Route
                  path='/cerrarSesion'
                  component={() => {
                    window.location.href = '/'
                    window.localStorage.removeItem('id')
                    window.localStorage.removeItem('tipo')
                    return null
                  }}
                />
                <Route
                  exact
                  path='/menuEstudiante/miperfil'
                  component={miperfil}
                />

                <Route
                  exact
                  path='/menuEstudiante/cursos'
                  component={cursosAdmin}
                />

                <Route
                  exact
                  path='/menuEstudiante/mensajes'
                  component={mensajes}
                />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}
