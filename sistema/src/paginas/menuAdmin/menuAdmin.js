import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './menuAdmin.css'

import { Link } from 'react-router-dom'

import miperfil from '../miperfil/miperfil'
import editUsr from '../usuarioAdmin/usuarioAdmin'
import regUsr from '../regUsr/regUsr'
import inventario from '../cosasAdmin/inventario/inventario'
import registrarBien from '../cosasAdmin/inventario/registrarBien'
import cursosAdmin from '../cosasAdmin/cursos/cursos'
import registroCurso from '../cosasAdmin/cursos/registrarCurso'
import pagos from '../cosasAdmin/pagos/pagos'
import presupuesto from '../cosasAdmin/presupuesto/presupuesto'
import registroIngreso from '../cosasAdmin/registroIngresoEgreso/registroIngreso'
import registroGasto from '../cosasAdmin/registroIngresoEgreso/registroGasto'
import contactos from '../cosasAdmin/contactos/contactos'
import noticias from '../cosasAdmin/noticia/noticia'
import entregas from '../cosasAdmin/entregas/entregas'
import mensajes from '../cosasAdmin/mensajes/mensajes'
import reportes from '../cosasAdmin/reportes/reportes'

export default class menuAdmin extends Component {
 
  componentDidMount(){
      if(window.localStorage.getItem('tipo') === 'admin'){

      }else if(window.localStorage.getItem('tipo') === 'col'){
        alert('pagina no disponible')
        window.location.href = '/'
      }
      else if(window.localStorage.getItem('tipo') === 'est'){
        alert('pagina no disponible')
        window.location.href = '/'
      }
      else if(window.localStorage.getItem('tipo') === 'cat'){
        alert('pagina no disponible')
        window.location.href = '/'
      }else{
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
                    <Link className='nav-link' to={'/menuAdmin/miperfil'}>
                      Mi Perfil
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to={'/menuAdmin/usuarios'}>
                      Usuarios
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to={'/menuAdmin/inventario'}>
                      Inventario
                    </Link>
                  </li>
                  
                  <li className='nav-item'>
                    <Link className='nav-link' to={'/menuAdmin/contactos'}>
                      Contactos
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to={'/menuAdmin/cursosAdmin'}>
                      Cursos
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to={'/menuAdmin/pagos'}>
                      Pagos
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to={'/menuAdmin/presupuesto'}>
                      Presupuesto
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to={'/menuAdmin/noticias'}>
                      Noticias
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link className='nav-link' to={'/menuAdmin/actividades'}>
                      Actividades
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link className='nav-link' to={'/menuAdmin/tareas'}>
                      Tareas
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link className='nav-link' to={'/menuAdmin/mensajes'}>
                      Mensajes
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to={'/menuAdmin/reportes'}>
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
                <Route exact path='/menuAdmin/miperfil' component={miperfil} />
                <Route exact path= '/menuAdmin/usuarios' component={editUsr}/>
                <Route exact path= '/menuAdmin/registroUsuario' component={regUsr}/>
                <Route exact path = '/menuAdmin/inventario' component={inventario}/>
                <Route exact path = '/menuAdmin/registroBien' component={registrarBien}/>
                <Route exact path = '/menuAdmin/cursosAdmin' component={cursosAdmin}/>
                <Route exact path = '/menuAdmin/registroCurso' component={registroCurso}/>
                <Route exact path = '/menuAdmin/pagos' component={pagos}/>
                <Route exact path = '/menuAdmin/presupuesto' component={presupuesto}/>
                <Route exact path = '/menuAdmin/registroIngreso' component={registroIngreso}/>
                <Route exact path = '/menuAdmin/registroGasto' component={registroGasto}/>
                <Route exact path = '/menuAdmin/contactos' component={contactos}/>
                <Route exact path = '/menuAdmin/noticias' component={noticias}/>
                <Route exact path = '/menuAdmin/entregas' component={entregas}/>
                <Route exact path = '/menuAdmin/mensajes' component={mensajes}/>
                <Route exact path = '/menuAdmin/reportes' component={reportes}/>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}
