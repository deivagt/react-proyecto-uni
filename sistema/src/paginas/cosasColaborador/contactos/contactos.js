import React, { Component } from 'react'
/* import { Link } from "react-router-dom"; */
import './contactos.css'
import { MDBDataTable } from 'mdbreact'
import Modal from 'react-modal'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

import axios from 'axios'
import CsvDownload from 'react-json-to-csv'
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

export default class contactos extends Component {
  constructor (props) {
    super(props)
    this.state = {
      contactos: [],
      admin: [],
      col: [],
      idContacto: '',

      userInput: '',

      modalIsOpen: false
    }

    axios
      .get('/contactos', { nick: window.localStorage.getItem('id') })
      .then(res => {
        this.setState({
          contactos: res.data
        })
        this.setState({
          contactos: this.state.contactos
        })
      })

    axios
      .get('/administrador', { nick: window.localStorage.getItem('id') })
      .then(res => {
        console.log(res.data)
        this.setState({
          admin: res.data
        })
      })

    axios
      .get('/colaborador', { nick: window.localStorage.getItem('id') })
      .then(res => {
        this.setState({
          col: res.data
        })
        console.log(this.state.col)
      })
    this.openModal = this.openModal.bind(this)
    /*    this.afterOpenModal = this.afterOpenModal.bind(this); */
    this.closeModal = this.closeModal.bind(this)

    this.handleAlter.bind(this)
  }

  handleSubmit = event => {
    event.preventDefault()
    const data = {
      nick: window.localStorage.getItem('id'),
      idContacto: this.state.idContacto
    }
    console.log(data)

    axios
      .put('/asignacionEncargado', data)
      .then(res => {
        if (res.status === 220) {
          alert('Hecho')
          window.location.replace('')
        } else {
          alert('Error')
        }
      })
      .catch(error => {})
  }

  getback = event => {
    event.preventDefault()
    this.props.history.push('/menuColaborador')
  }

  handleAlter = event => {
    event.preventDefault()
    var id = { idContacto: this.state.busqueda }

    axios
      .delete('/contactos', {
        data: id
      })
      .then(res => {
        if (res.status === 220) {
          alert('Eliminado')
          window.location.replace('')
        }
      })
  }

  handleInputChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  openModal () {
    this.setState({ modalIsOpen: true })
  }

  closeModal () {
    this.setState({ modalIsOpen: false })
  }

  render () {
    const data = {
      columns: [
        {
          label: 'iD',
          field: 'idContacto',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Nombre',
          field: 'nombre',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Telefono',
          field: 'telefono',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Correo',
          field: 'correo',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Direccion',
          field: 'direccion',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Rol',
          field: 'rol',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Oportunidad',
          field: 'oportunidades',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Encargado',
          field: 'encargado',
          sort: 'asc',
          width: 100
        }
      ],
      rows: this.state.contactos
    }

    var arr = this.state.contactos

    const idContacto = this.state.idContacto

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

        <div className='mushasCosas1'>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className='form-group'>
              <h3>Encargate de un contacto</h3>
              <label>id del contacto</label>
              <input
                id='codigo'
                className='form-control'
                type='number'
                placeholder='Codigo del objeto'
                name='idContacto'
                value={idContacto}
                onChange={this.handleInputChange}
              />
            </div>
            <button type='submit' className='btn btn-primary bt'>
              Yo me encargo
            </button>
          </form>

          <label>{this.state.userInput}</label>
          <Autocomplete
            id='combo-box-demo'
            options={arr}
            getOptionLabel={option => option.nombre}
            style={{ width: 400 }}
            autoSelect
            renderInput={params => (
              <TextField
                {...params}
                id='hola'
                label='Busca un Usuario'
                variant='outlined'
                onClick={this.handleInputChange}
                name='userInput'
                onChange={this.handleInputChange}
                fullWidth
              />
            )}
          />
          <button onClick={this.openModal} className='btn btn-primary bt'>
            Buscar Informacion
          </button>
          <div>
            <h3>Exportar Informacion</h3>
          <CsvDownload data={arr} />
          </div>
          <br></br>

      
        </div>

        <div className='mushasCosas1'>
        <h3>Listado de Contactos</h3>
          <MDBDataTable data={data} bordered className='ajiojiojio' />

          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel='Example Modal'
          >
            {arr.map(data => {
              if (!(data === null) && data.nombre === this.state.userInput) {
                return (
                  <div>
                    <h1>Id del contacto</h1>
                    <label>{data.idContacto}</label>
                    <h1>Nombre del Contacto</h1>
                    <label>{data.nombre}</label>
                    <h1>Telefono del contacto</h1>
                    <label>{data.telefono}</label>
                    <h1>Correo</h1>
                    <label>{data.correo}</label>
                    <h1>Direccion</h1>
                    <label>{data.direccion}</label>
                    <h1>Rol</h1>
                    <label>{data.rol}</label>
                    <h1>Oportunidades</h1>
                    <label>{data.oportunidades}</label>
                    <h1>Encargado Actual</h1>
                    <label>{data.encargado}</label>
                  </div>
                )
              }
            })}
            <button onClick={this.closeModal}>close</button>
          </Modal>
        </div>
      </div>
    )
  }
}
