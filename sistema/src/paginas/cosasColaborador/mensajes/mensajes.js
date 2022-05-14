import React, { Component } from 'react'
/* import { Link } from "react-router-dom"; */
import './mensajes.css'
import Modal from 'react-modal'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: 700,
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

export default class mensajes extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mensajes: [],
      usuarios: [],
      modalIsOpen: false,
      envio: window.localStorage.getItem('id'),
      destinatario: '',
      cuerpo: ''
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleSubmit.bind(this)

    var id = {
      nick: window.localStorage.getItem('id')
    }

    axios
      .get('/mensajes', {
        params: id
      })
      .then(res => {
        this.setState({
          mensajes: res.data
        })
      })

    axios
      .get('/listaUsuarios', {
        params: id
      })
      .then(res => {
        this.setState({
          usuarios: res.data
        })
     
      })
  }

  handleSubmit = event => {
    event.preventDefault()

    var nm = this.state

    axios
    .post('/mensajes', nm)
    .then(res => {
      if (res.status === 220) {
        alert('Enviado')
        window.location.replace('')
      }
    })
    .catch(error => {})
  }

  getback = event => {
    event.preventDefault()
    this.props.history.push('/menuColaborado')
  }

  handleInputChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  openModal () {
    this.setState({ modalIsOpen: true })
    var td = {
      nombreUsuario: 'todosAdmin'
    }
    var tdc = { nombreUsuario: 'todosCol' }

    this.state.usuarios.push(td)
    this.state.usuarios.push(tdc)
  }

  closeModal () {
    this.setState({ modalIsOpen: false })
  }

  render () {
    var arr = this.state.mensajes
    var arr1 = this.state.usuarios
    var cuerpo = this.state.cuerpo
    return (
      <div>
        <div className='volver'>
          <button
            onClick={this.getback.bind(this)}
            className='btn btn-primary btn-block'
          >
            Regresar
          </button>
          <button onClick={this.openModal} className='btn btn-primary bt'>
            Enviar Mensaje
          </button>
        </div>

        <div className='tablaMensajes'>
          <div className='entrada'>
            <h3>Entrada</h3>
            {arr.map(data => {
          
              if (
                !(data === null) &&
                data.destinatario === window.localStorage.getItem('id') || data.destinatario === "todosCol"
              ) {
                return (
                  <div>
                    <h1>Mensaje de: {data.envio}</h1>
                    <p className='codigo'>Codigo: {data.idMensaje}</p>
                    <p className='men'>Mensaje:</p>
                    <p className='cuerpo'>{data.cuerpo}</p>
                    <label>---------------------------</label>
                  </div>
                )
              }
            })}
          </div>
          <div className='salida'>
            <h3>Salida</h3>
            {arr.map(data => {
              if (
                !(data === null) &&
                data.envio === window.localStorage.getItem('id')
              ) {
                return (
                  <div>
                    <h1>Mensaje para: {data.destinatario}</h1>
                    <p className='codigo'>Codigo: {data.idMensaje}</p>
                    <p className='men'>Mensaje:</p>
                    <p className='cuerpo'>{data.cuerpo}</p>
                    <label>---------------------------</label>
                  </div>
                )
              }
            })}
          </div>
        </div>

        <div className='tablaCA'>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel='Example Modal'
          >
            <div>
              <h3>Envia un mensaje</h3>
              <div>
                <label>Elige un destinatario</label>
                <Autocomplete
                  id='combo-box-demo'
                  options={arr1}
                  getOptionLabel={option => option.nombreUsuario}
                  style={{ width: 300 }}
                  autoSelect
                  renderInput={params => (
                    <TextField
                      {...params}
                      id='hola'
                      label='Busca un Usuario'
                      variant='outlined'
                      onClick={this.handleInputChange}
                      name='destinatario'
                      onChange={this.handleInputChange}
                      fullWidth
                    />
                  )}
                />
              </div>
              <br></br>
              <div>
                <label>Cuerpo</label>
                <textarea
                  className='form-control'
                  placeholder='Ingresa un cuerpo'
                  name='cuerpo'
                  value={cuerpo}
                  onChange={this.handleInputChange}
                />
              </div>
              <br></br>
            </div>
            <br></br>
            <div>
              <button
                onClick={this.handleSubmit.bind(this)}
                className='btn btn-primary bt'
              >
                Enviar Mensaje
              </button>
            </div>
            <br></br>

            <button onClick={this.closeModal}>close</button>
          </Modal>
        </div>
      </div>
    )
  }
}
