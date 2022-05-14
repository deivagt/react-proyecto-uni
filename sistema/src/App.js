import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import login from './paginas/inicioSesion/inicioSesion'
import inicio from './paginas/inicio/inicio'
import registro from './paginas/regEstCat/regEstCat'
import menuAdmin from './paginas/menuAdmin/menuAdmin'
import menuColaborador from './paginas/menuColaborador/menuAdmin'
import menuCat from './paginas/menuCat/menuCat'
import menuEst from './paginas/menuEst/menuEst'

import { withCookies } from 'react-cookie'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { apiResponse: '' }
  }

  render () {
    return (
      <Router>
        <div className='App'>
          <div className='auth-wrapper'>
            <div className='auth-inner'>
              <Switch>
                <Route exact path='/' component={inicio} />
                <Route exact path='/inicioSesion' component={login} />
                <Route exact path='/registro' component={registro} />

                <Route exact path='/menuAdmin' component={menuAdmin} />
                <Route
                  exact
                  path='/menuColaborador'
                  component={menuColaborador}
                />
                <Route exact path='/menuCatedratico' component={menuCat} />
                <Route exact path='/menuEstudiante' component={menuEst} />

                <Route exact path='/menuAdmin/miperfil' component={menuAdmin} />
                <Route exact path='/menuAdmin/usuarios' component={menuAdmin} />
                <Route
                  exact
                  path='/menuAdmin/registroUsuario'
                  component={menuAdmin}
                />
                <Route
                  exact
                  path='/menuAdmin/inventario'
                  component={menuAdmin}
                />

                <Route
                  exact
                  path='/menuAdmin/registroBien'
                  component={menuAdmin}
                />

                <Route
                  exact
                  path='/menuAdmin/cursosAdmin'
                  component={menuAdmin}
                />

                <Route
                  exact
                  path='/menuAdmin/registroCurso'
                  component={menuAdmin}
                />

                <Route exact path='/menuAdmin/pagos' component={menuAdmin} />
                <Route
                  exact
                  path='/menuAdmin/presupuesto'
                  component={menuAdmin}
                />
                <Route
                  exact
                  path='/menuAdmin/registroIngreso'
                  component={menuAdmin}
                />
                <Route
                  exact
                  path='/menuAdmin/registroGasto'
                  component={menuAdmin}
                />
                <Route
                  exact
                  path='/menuAdmin/contactos'
                  component={menuAdmin}
                />
                <Route exact path='/menuAdmin/noticias' component={menuAdmin} />
                <Route exact path='/menuAdmin/entregas' component={menuAdmin} />

                <Route exact path='/menuAdmin/mensajes' component={menuAdmin} />
                <Route exact path='/menuAdmin/reportes' component={menuAdmin} />

                <Route
                  exact
                  path='/menuColaborador/miperfil'
                  component={menuColaborador}
                />

                <Route
                  exact
                  path='/menuColaborador/inventario'
                  component={menuColaborador}
                />

                <Route
                  exact
                  path='/menuColaborador/cursosAdmin'
                  component={menuColaborador}
                />

                <Route
                  exact
                  path='/menuColaborador/pagos'
                  component={menuColaborador}
                />
                <Route
                  exact
                  path='/menuColaborador/presupuesto'
                  component={menuColaborador}
                />
                <Route
                  exact
                  path='/menuColaborador/registroIngreso'
                  component={menuColaborador}
                />
                <Route
                  exact
                  path='/menuColaborador/registroGasto'
                  component={menuColaborador}
                />
                <Route
                  exact
                  path='/menuColaborador/contactos'
                  component={menuColaborador}
                />
                <Route
                  exact
                  path='/menuColaborador/entregas'
                  component={menuColaborador}
                />

                <Route
                  exact
                  path='/menuColaborador/mensajes'
                  component={menuColaborador}
                />
                <Route
                  exact
                  path='/menuColaborador/reportes'
                  component={menuColaborador}
                />

                <Route
                  exact
                  path='/menuCatedratico/miperfil'
                  component={menuCat}
                />

                <Route
                  exact
                  path='/menuCatedratico/cursos'
                  component={menuCat}
                />

                <Route
                  exact
                  path='/menuCatedratico/mensajes'
                  component={menuCat}
                />

                <Route exact path='/menuAdmin/mensajes' component={menuAdmin} />

               
                <Route exact path='/menuEstudiante' component={menuEst} />
                <Route exact path='/menuEstudiante/miperfil' component={menuEst} />
                <Route exact path='/menuEstudiante/cursos' component={menuEst} />
                <Route exact path='/menuEstudiante/mensajes' component={menuEst} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default withCookies(App)
