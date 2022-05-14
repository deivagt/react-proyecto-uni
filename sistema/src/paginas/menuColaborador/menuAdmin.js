import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './menuAdmin.css'

import { Link } from 'react-router-dom'

import miperfil from '../cosasColaborador/miperfil/miperfil'

import inventario from '../cosasColaborador/inventario/inventario'

import cursosAdmin from '../cosasColaborador/cursos/cursos'

import pagos from '../cosasColaborador/pagos/pagos'
import presupuesto from '../cosasColaborador/presupuesto/presupuesto'

import contactos from '../cosasColaborador/contactos/contactos'
import entrega from '../cosasColaborador/entregas/entregas'
import mensajes from '../cosasColaborador/mensajes/mensajes'
import reportes from '../cosasColaborador/reportes/reportes'

export default class menuAdmin extends Component {

  componentDidMount () {
    if (window.localStorage.getItem('tipo') === 'col') {
    } else if (window.localStorage.getItem('tipo') === 'admin') {
      alert('pagina no disponible')

      window.location.href = '/'
    } else if (window.localStorage.getItem('tipo') === 'est') {
      alert('pagina no disponible')
      window.location.href = '/'
    } else if (window.localStorage.getItem('tipo') === 'cat') {
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
                    <Link className='nav-link' to={'/menuColaborador/miperfil'}>
                      Mi Perfil
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      to={'/menuColaborador/inventario'}
                    >
                      Inventario
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      to={'/menuColaborador/contactos'}
                    >
                      Contactos
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      to={'/menuColaborador/cursosAdmin'}
                    >
                      Cursos
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to={'/menuColaborador/pagos'}>
                      Pagos
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      to={'/menuColaborador/presupuesto'}
                    >
                      Presupuesto
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to={'/menuColaborador/noticias'}>
                      Noticias
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      to={'/menuColaborador/actividades'}
                    >
                      Actividades
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link className='nav-link' to={'/menuColaborador/tareas'}>
                      Tareas
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to={'/menuColaborador/mensajes'}>
                      Mensajes
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to={'/menuColaborador/reportes'}>
                      Reportes
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
                  path='/menuColaborador/miperfil'
                  component={miperfil}
                />

                <Route
                  exact
                  path='/menuColaborador/inventario'
                  component={inventario}
                />

                <Route
                  exact
                  path='/menuColaborador/cursosAdmin'
                  component={cursosAdmin}
                />

                <Route exact path='/menuColaborador/pagos' component={pagos} />
                <Route
                  exact
                  path='/menuColaborador/presupuesto'
                  component={presupuesto}
                />

                <Route
                  exact
                  path='/menuColaborador/contactos'
                  component={contactos}
                />
                <Route
                  exact
                  path='/menuColaborador/entregas'
                  component={entrega}
                />
                
                <Route
                  exact
                  path='/menuColaborador/mensajes'
                  component={mensajes }
                />
                <Route
                  exact
                  path='/menuColaborador/reportes'
                  component={reportes }
                />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}
