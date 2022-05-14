import React, { Component } from 'react'
/* import { Link } from "react-router-dom"; */
import './miperfil.css'
import axios from 'axios'

export default class miPerfil extends Component {
  constructor (props) {
    super(props)

    this.state = {
      nombre: '',
      fechaNac: '',
      cel: '',
      correo: '',
      nick: '',
      contra: '',
      puesto: ''
    }
    this.handleInputChange.bind(this)
    this.handleSubmit.bind(this)
    this.handleAlter.bind(this)
    this.getback.bind(this)
  }

  componentDidMount () {
    var id = {
      nick: window.localStorage.getItem('id')
    }

    axios
      .get('/registroUsuario', {
        params: id
      })
      .then(res => {
        const info = res.data
        this.setState({
          nombre: info.nombre,
          fechaNac: info.fechaNacimiento,
          cel: info.celular,
          correo: info.correo,
          nick: info.nombreUsuario,
          contra: info.contra,
          puesto: info.puesto,
          tipo: window.localStorage.getItem('tipo')
        })
        console.group(info)
      })

  }

  handleSubmit = event => {
    event.preventDefault()
    const data = this.state

    axios.put('/registroUsuario', data).then(res => {
      alert('guardado')
    })
  }

  handleAlter = event => {
    event.preventDefault()
    var id = { nick: window.localStorage.getItem('id') }

    axios
      .delete('/registroUsuario', {
        data: id
      })
      .then(res => {
        alert('Usuario Borrado')
        window.localStorage.removeItem('id')
        window.location.href = '/'
      })
  }

  getback = event => {
    event.preventDefault()
    this.props.history.push('/menuAdmin')
  }

  handleInputChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    const nombre = this.state.nombre
    const fechaNac = this.state.fechaNac
    const cel = this.state.cel
    const correo = this.state.correo
    const contra = this.state.contra
    const puesto = this.state.puesto

    return (
      <div>
        <div className='volver'>
          <button
            onClick={this.getback.bind(this)}
            className='btn btn-primary btn-block'
          >
            Regresar
          </button>
        </div>
        <form className='estructura' onSubmit={this.handleSubmit.bind(this)}>
          <h3>Tu Informacion</h3>
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
            <label>Fecha de Nacimiento</label>
            <input
              id='bornDay'
              className='form-control'
              placeholder='dd-MM-YYYY'
              name='fechaNac'
              value={fechaNac}
              onChange={this.handleInputChange}
            />
          </div>

          <div className='form-group'>
            <label>Teléfono</label>
            <input
              id='tel'
              type='number'
              className='form-control'
              placeholder='Introduce tu teléfono'
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
            <label>Contraseña</label>
            <input
              id='pass'
              className='form-control'
              placeholder='Introduce tu Contraseña'
              name='contra'
              value={contra}
              onChange={this.handleInputChange}
            />
          </div>

          <div className='form-group'>
            <label>Puesto</label>
            <input
              id='puesto'
              className='form-control'
              placeholder='Introduce tu puesto'
              name='puesto'
              value={puesto}
              onChange={this.handleInputChange}
            />
          </div>

          <button type='submit' className='btn btn-primary bt'>
            Guardar
          </button>

          <button
            onClick={this.handleAlter.bind(this)}
            className='btn btn-secondary bt'
          >
            Eliminar
          </button>
        </form>
      </div>
    )
  }
}
