import React, { Component } from 'react'
import './regUsr.css'

import axios from 'axios'


export default class registroEstCat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nombre: '',
      dpi: '',
      carne: '',
      fechaNac: '',
      cel: '',
      correo: '',
      uni: '',
      nac: '',
      nick: '',
      contra: '',
      puesto: '',
      tipo_cuenta: 'estudiante'
    }
    this.handleInputChange.bind(this)
    this.handleSubmit.bind(this)
    this.getback.bind(this)
  }

  getback = event => {
    event.preventDefault()
    this.props.history.goBack()
  }

  handleSubmit = event => {
    event.preventDefault()
    const data = this.state
    console.log(data)
    alert('Hecho')

    axios.post('/registroUsuario', data).then(res => {
      if (res.status === 220) {
        this.props.history.push('/menuAdmin')
      }
    })
  }

  handleInputChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  

  render () {
    const nombre = this.state.nombre
    const dpi = this.state.dpi
    const carne = this.state.carne
    const fechaNac = this.state.fechaNac
    const cel = this.state.cel
    const correo = this.state.correo
    const uni = this.state.uni
    const nac = this.state.nac
    const nick = this.state.nick
    const contra = this.state.contra
    const tipo_cuenta = this.state.tipo_cuenta
    const puesto = this.state.puesto

    return (
      <div className='cuerpo'>
        <div className='volver'>
            
          <button
            onClick={this.getback.bind(this)}
            className='btn btn-primary btn-block'
          >
            Regresar
          </button>
          
              
            
        </div>

        <form
          className='estructuraRegistro'
          onSubmit={this.handleSubmit.bind(this)}
        >
          <h3>Registro</h3>

          <div className='form-group'>
            <label>Nombre</label>
            <input
              id='name'
              className='form-control'
              placeholder='Introduce tu Nombre'
              name='nombre'
              value={nombre}
              onChange={this.handleInputChange}
            />
          </div>

          <div className='form-group'>
            <label>Dpi</label>
            <input
              type='number'
              className='form-control'
              placeholder='Introduce tu DPI '
              name='dpi'
              value={dpi}
              onChange={this.handleInputChange}
            />
          </div>

          <div className='form-group'>
            <label>Carne</label>
            <input
              id='carne'
              type='number'
              className='form-control'
              placeholder='Introduce tu Carne'
              name='carne'
              value={carne}
              onChange={this.handleInputChange}
            />
          </div>

          <div className='form-group'>
            <label>Fecha de Nacimiento</label>
            <input
              id='bornDay'
              type='date'
              className='form-control'
              name='fechaNac'
              value={fechaNac}
              onChange={this.handleInputChange}
            />
          </div>

          <div className='form-group'>
            <label>Tel??fono</label>
            <input
              id='tel'
              type='number'
              className='form-control'
              placeholder='Introduce tu tel??fono'
              name='cel'
              value={cel}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='form-group'>
            <label>Correo</label>
            <input
              id='mail'
              type='email'
              className='form-control'
              placeholder='Introduce tu correo'
              name='correo'
              value={correo}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='form-group'>
            <label>Universidad</label>
            <input
              id='Uni'
              className='form-control'
              placeholder='Introduce tu Universidad'
              name='uni'
              value={uni}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='form-group'>
            <label>Nacionalidad</label>
            <input
              id='nac'
              className='form-control'
              placeholder='Introduce tu nacionalidad'
              name='nac'
              value={nac}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='form-group'>
            <label>Nickname</label>
            <input
              id='nick'
              className='form-control'
              placeholder='Introduce tu Nickname'
              name='nick'
              value={nick}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='form-group'>
            <label>Contrase??a</label>
            <input
              id='pass'
              className='form-control'
              placeholder='Introduce tu Contrase??a'
              name='contra'
              value={contra}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='form-group'>
            <label>Puesto</label>
            <input
              id='pass'
              className='form-control'
              placeholder='Introduce tu Puesto'
              name='puesto'
              value={puesto}
              onChange={this.handleInputChange}
            />
          </div>

          <div className='form-group'>
            <label>Tipo de Cuenta</label>
            <br></br>
            <select
              name='tipo_cuenta'
              value={tipo_cuenta}
              onChange={this.handleInputChange}
            >
              <option selected disabled>
                Selecciona un tipo de cuenta...
              </option>
              <option value='estudiante'>Estudiante</option>
              <option value='profesor'>Profesor</option>
              <option value='adm'>Administrador</option>
              <option value='col'>Colaborador</option>
            </select>
          </div>

          <button type='submit' className='btn btn-primary btn-block'>
            Registrar
          </button>
        </form>
      </div>
    )
  }
}
