import React, { Component } from 'react'
import './inicioSesion.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      nick: '',
      contra: ''
    }

    this.handleInputChange.bind(this)
    this.handleSubmit.bind(this)
  }
  handleSubmit = event => {
    event.preventDefault()

    const data = this.state

   

    axios.post('/login', data).then(res => {

      if (res.status === 221) {
        alert('administrador')
        window.localStorage.setItem('id', data.nick);
        window.localStorage.setItem('tipo', 'admin');
        
        this.props.history.push('/menuAdmin')
        
        /* console.log(window.localStorage.getItem('id')); */
      } else if (res.status === 222) {
        alert('colaborador')
        window.localStorage.setItem('id', data.nick);
        window.localStorage.setItem('tipo', 'col');
        this.props.history.push('/menuColaborador')
        /* console.log(window.localStorage.getItem('id')); */
      } else if (res.status === 223) {
        alert('estudiante')
        window.localStorage.setItem('id', data.nick);
        window.localStorage.setItem('tipo', 'est');
        this.props.history.push('/menuEstudiante')
        /* console.log(window.localStorage.getItem('id')); */
      } else if (res.status === 224) {
        alert('catedratico')
        window.localStorage.setItem('id', data.nick);
        window.localStorage.setItem('tipo', 'cat');
        this.props.history.push('/menuCatedratico')
      } else if (res.status === 220 || res.status === 500) {
        alert('datos incorrectos')
      }

    }    
    ).catch(err =>{
      alert('datos incorrectos')
    })

  }

  handleInputChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    const { nick } = this.state.nick
    const { contra } = this.state.contra

    return (
      <div className='cuerpo'>
        <nav className='navbar navbar-expand-lg navbar-light fixed-top'>
          <div className='container'>
            <div className='collapse navbar-collapse' id='navbarTogglerDemo02'>
              <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                  <Link className='nav-link' to={'/'}>
                    Inicio
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to={'/registro'}>
                    Registrarse
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div>
          <form className='mushasCosas' onSubmit={this.handleSubmit.bind(this)}>
            <h3>Iniciar Sesion</h3>

            <div className='form-group'>
              <label>Nickname</label>
              <input
                className='form-control'
                placeholder='Introduce tu nickname'
                name='nick'
                value={nick}
                onChange={this.handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label>Contraseña</label>
              <input
                type='password'
                className='form-control'
                placeholder='Introduce tu contraseña'
                name='contra'
                value={contra}
                onChange={this.handleInputChange}
              />
            </div>

            <button type='submit' className='btn btn-primary btn-block'>
              Iniciar Sesion
            </button>


          </form>
        </div>
      </div>
    )
  }
}
