import React, { Component } from 'react'
/* import { Link } from "react-router-dom"; */
import './miperfil.css'
import axios from 'axios'
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    width: 400,
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}
export default class miPerfil extends Component {
  constructor (props) {
    super(props)

    this.state = {
      asignaciones: [],
      nombre: '',
      carne: '',
      fechaNac: '',
      cel: '',
      correo: '',
      nick: '',
      contra: ''
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
          carne: info.carne
        })
        axios
          .get('/asignacionCurso', {
            params: id
          })
          .then(res => {
            const asig = res.data
            this.setState({
              asignaciones: asig
            })
          })
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
    const carne = this.state.carne
    const arr = this.state.asignaciones
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
        <div className='estructura'>
          <form onSubmit={this.handleSubmit.bind(this)}>
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
              <label>Carne</label>
              <input
                type='number'
                className='form-control'
                placeholder='Introduce tu carne'
                name='carne'
                value={carne}
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

          <h3>Cursos Asignados</h3>
          <table className='table table-dark table-bordered'>
            <thead>
              <th>id Asignacion</th>
              <th>Codigo del Curso</th>
              <th>Nombre del curso</th>
              <th>Seccion del Curso</th>
            </thead>
            <tbody>
              {arr.map(data => {
                if (!(data === null)) {
                  return (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.idCurso}</td>
                      <td>{data.nombreCurso}</td>
                      <td>{data.seccionCurso}</td>
                    </tr>
                  )
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
