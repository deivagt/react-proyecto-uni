import React, { Component } from 'react'
import './usuarioAdmin.css'

import axios from 'axios'
const csv = require('csvtojson')
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
      tipo_cuenta: 'estudiante',
      oldnick: ''
    }
    this.handleInputChange.bind(this)
    this.handleSubmit.bind(this)
    this.searchUser.bind(this)
    this.getback.bind(this)
  }

  handleSubmit = event => {
    event.preventDefault()
    const data = this.state
    alert(data)

    axios.put('/registroUsuario', data).then(res => {alert('Hecho')})
  }
  onchangeFile (e) {
    let file = e.target.files

    let reader = new FileReader()
    reader.readAsText(file[0])

    reader.onload = e => {
      let info = e.target.result

      csv()
        .fromString(info)
        .then(jsonObj => {
          console.log(jsonObj)
          for (let i in jsonObj) {
            console.log(jsonObj[i])
            axios.post('/registroUsuario', jsonObj[i]).then(res => {})
          }
          alert('Hecho')
        })
    }
  }

  handleInputChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  getback = event => {
    event.preventDefault()
    this.props.history.push('/menuAdmin')
  }

  searchUser = event => {
    axios
      .get('/registroUsuario', {
        params: { nick: this.state.oldnick }
      })
      .then(res => {
        const info = res.data
        console.log(info)
        if (info.dpi === undefined && info.carne === undefined) {
          this.setState({
            nombre: info.nombre,
            carne: '',
            dpi: '',
            fechaNac: info.fechaNacimiento,
            cel: info.celular,
            correo: info.correo,
            nick: info.nombreUsuario,
            contra: info.contra,
            puesto: info.puesto,
            uni: '',
            nac: '',
            tipo_cuenta: info.tipo_cuenta
          })
        } else if (info.puesto === undefined && info.nac === undefined) {
          this.setState({
            nombre: info.nombre,
            carne: info.carne,
            dpi: info.dpi,
            fechaNac: info.fechaNacimiento,
            cel: info.celular,
            correo: info.correo,
            nick: info.nombreUsuario,
            contra: info.contra,
            puesto: '',
            uni: info.universidad,
            nac: '',
            tipo_cuenta: info.tipo_cuenta
          })
        } else if (info.puesto === undefined) {
          this.setState({
            nombre: info.nombre,
            carne: info.carne,
            dpi: info.dpi,
            fechaNac: info.fechaNacimiento,
            cel: info.celular,
            correo: info.correo,
            nick: info.nombreUsuario,
            contra: info.contra,
            puesto: '',
            uni: info.universidad,
            nac: info.nac,
            tipo_cuenta: info.tipo_cuenta
          })
        }
      })
  }

  handleAlter = event => {
    event.preventDefault()
    var id = { nick: this.state.oldnick }

    axios
      .delete('/registroUsuario', {
        data: id
      })
      .then(res => {
        if (res.status === 220) {
          console.log('hola')
          this.setState({
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
            tipo_cuenta: 'estudiante',
            oldnick: ''
          })
        }
      })
  }

  regUser = event => {
    this.props.history.push('/menuAdmin/registroUsuario')
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
    /* const nick = this.state.nick */
    var oldnick = this.state.oldnick
    const contra = this.state.contra
    const puesto = this.state.puesto
    const tipo_cuenta = this.state.tipo_cuenta

    return (
      <div className='cuerpo'>
        <div className='volver'>
          <button
            onClick={this.getback.bind(this)}
            className='btn btn-primary btn-block'
          >
            Regresar
          </button>
          <button
            onClick={this.regUser.bind(this)}
            className='btn btn-primary btn-block'
          >
            Registrar Usuario
          </button>

          <div className='form-group'>
            <label>Busca un usuario</label>
            <input
              id='busqueda'
              className='form-control'
              placeholder='Introduce un nickname'
              name='oldnick'
              value={oldnick}
              onChange={this.handleInputChange}
            />
          </div>
          <button
            onClick={this.searchUser.bind(this)}
            className='btn btn-primary btn-block'
          >
            Buscar
          </button>
          <div>
            <label>Carga de Archivo Inmediata</label>
            <input
              className='form-control'
              accept='.csv'
              type='file'
              id='fileBrowser'
              name='customFile'
              onChange={e => {
                this.onchangeFile(e)
              }}
            ></input>
          </div>
        </div>
        <div>
          <form className='estructura' onSubmit={this.handleSubmit.bind(this)}>
            <h3>Datos de Usuario</h3>

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
                className='form-control'
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

            <div className='form-group'>
              <label>Tipo de Cuenta</label>
              <br></br>
              <select
                name='tipo_cuenta'
                value={tipo_cuenta}
                onChange={this.handleInputChange}
              >
                <option disabled>Selecciona un tipo de cuenta...</option>
                <option value='estudiante'>Estudiante</option>
                <option value='profesor'>Profesor</option>
                <option value='colaborador'>Colaborador</option>
                <option value='administrador'>Administrador</option>
              </select>
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
      </div>
    )
  }
}
