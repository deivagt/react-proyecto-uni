import React, { Component } from 'react'
/* import { Link } from "react-router-dom"; */
import './contactos.css'
import { MDBDataTable } from 'mdbreact'
import Modal from 'react-modal'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

import axios from 'axios'

import {
  Table,
  TableCell,
  TableHeader,
  DataTableCell,
  TableBody
} from '@david.kucsai/react-pdf-table'
import CsvDownload from 'react-json-to-csv'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink
} from '@react-pdf/renderer'

const csv = require('csvtojson')

// Create styles
const styles = StyleSheet.create({
  page: {
   
  },
  tabla: {
    
  },
  section: { marginLeft: 30 ,
    marginRight: 30 ,
    marginTop: 10 ,
  }
})


// Create styles


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: 400,
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
      busqueda: '',
      nombre: '',
      telefono: '',
      correo: '',
      direccion: '',
      rol: '',
      oportunidades: '',
      encargado: '',
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
    /* this.setState({
        admin: this.state.admin,
        col: this.state.col
      })
      */

    /*  this.handleInputChange.bind(this);
        this.handleSubmit.bind(this);
        this.getback.bind(this) */
    this.openModal = this.openModal.bind(this)
    /*    this.afterOpenModal = this.afterOpenModal.bind(this); */
    this.closeModal = this.closeModal.bind(this)

    this.handleAlter.bind(this)
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
          for (let i in jsonObj) {
            /*   jsonObj[i].codigo = (
              Math.floor(Math.random() * (50000000 - 34000000)) + 34000000
            ).toString() */
            axios.post('/contactos', jsonObj[i]).then(res => {
              if (res.status === 220) {
                alert('Guardado')
                window.location.replace('')
              }
            })
          }
        })
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const data = this.state
    console.log(data)
    var control = false

    for (let i in this.state.admin) {
      if (this.state.encargado === this.state.admin[i].nombreUsuario) {
        control = true

        break
      }
    }

    for (let i in this.state.col) {
      if (this.state.encargado === this.state.col[i].nombreUsuario) {
        control = true
        break
      }
    }

    if (control == true) {
      axios
        .post('/contactos', data)
        .then(res => {
          if (res.status === 220) {
            alert('Guardado')
            window.location.replace('')
          }
        })
        .catch(error => {})
    } else {
      alert('El encargado no existe')
    }
  }

  getback = event => {
    event.preventDefault()
    this.props.history.push('/menuAdmin')
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

  onchangeFile (e) {
    let file = e.target.files

    let reader = new FileReader()
    reader.readAsText(file[0])

    reader.onload = e => {
      let info = e.target.result

      csv()
        .fromString(info)
        .then(jsonObj => {
          for (let i in jsonObj) {
            axios.post('/contactos', jsonObj[i]).then(res => {
              if (res.status === 220) {
                alert('Guardado')
                window.location.replace('')
              }
            })
          }
        })
    }
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

    const busqueda = this.state.busqueda

    const nombre = this.state.nombre
    const telefono = this.state.telefono
    const correo = this.state.correo
    const direccion = this.state.direccion
    const rol = this.state.rol
    const oportunidades = this.state.oportunidades
    const encargado = this.state.encargado

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
          <div>
            <div className='form-group'>
              <h3>Carga de Archivo Inmediata</h3>
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
              <CsvDownload data={arr} />
            </div>
            <h3>Eliminar contacto</h3>
            <div className='form-group'>
              <label>id del contacto</label>
              <input
                /*  id='codigo' */
                type='number'
                className='form-control'
                placeholder='Ingrese el id del contacto'
                name='busqueda'
                value={busqueda}
                onChange={this.handleInputChange}
              />
            </div>
            <button
              onClick={this.handleAlter.bind(this)}
              className='btn btn-primary bt'
            >
              Eliminar
            </button>

            <form
              className='mushasCosas'
              onSubmit={this.handleSubmit.bind(this)}
            >
              <h3>Crear nuevo contacto</h3>

              <div className='form-group'>
                <label>Nombre del contacto</label>
                <input
                  /*  id='codigo' */
                  /*  type='number' */
                  className='form-control'
                  placeholder='Nombre del contacto'
                  name='nombre'
                  value={nombre}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className='form-group'>
                <label>Telefono</label>
                <input
                  /*   id='bornDay' */
                  type='number'
                  className='form-control'
                  placeholder='Ingrese el Telefono del contacto'
                  name='telefono'
                  value={telefono}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className='form-group'>
                <label>Correo</label>
                <input
                  /*   id='bornDay' */
                  type='email'
                  className='form-control'
                  placeholder='Ingrese el correo'
                  name='correo'
                  value={correo}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className='form-group'>
                <label>direccion</label>
                <input
                  /*   id='bornDay' */
                  /* type='number' */
                  className='form-control'
                  placeholder='Ingrese la direccion'
                  name='direccion'
                  value={direccion}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className='form-group'>
                <label>rol</label>
                <input
                  /*   id='bornDay' */
                  /* type='number' */
                  className='form-control'
                  placeholder='Ingrese el rol'
                  name='rol'
                  value={rol}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className='form-group'>
                <label>Oportunidades</label>
                <input
                  /*   id='bornDay' */
                  /* type='number' */
                  className='form-control'
                  placeholder='Ingrese las oportunidades'
                  name='oportunidades'
                  value={oportunidades}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className='form-group'>
                <label>Encargado</label>
                <input
                  /*   id='bornDay' */
                  /* type='number' */
                  className='form-control'
                  placeholder='Ingrese el nickname del encargado'
                  name='encargado'
                  value={encargado}
                  onChange={this.handleInputChange}
                />
              </div>
              <button type='submit' className='btn btn-primary bt'>
                Registrar Contacto
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

            <br></br>
            <button onClick={this.openModal} className='btn btn-primary bt'>
              Buscar Informacion
            </button>
          </div>

          <div className='mushasCosas1'>
            <h3>Listado de Contactos</h3>
            <div className='tablaCA'>
              <MDBDataTable bordered data={data} />

              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel='Example Modal'
              >
                {arr.map(data => {
                  if (
                    !(data === null) &&
                    data.nombre === this.state.userInput
                  ) {
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
        </div>
      </div>
    )
  }
}
