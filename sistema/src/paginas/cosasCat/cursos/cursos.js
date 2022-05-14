import React, { Component } from 'react'
/* import { Link } from "react-router-dom"; */
import './cursos.css'
import axios from 'axios'
import CsvDownload from 'react-json-to-csv'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

import {
  Table,
  TableCell,
  TableHeader,
  DataTableCell,
  TableBody
} from '@david.kucsai/react-pdf-table'

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink
} from '@react-pdf/renderer'

import Modal from 'react-modal'
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    width: 600,
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

const styles = StyleSheet.create({
  page: {},
  tabla: {},
  section: { marginLeft: 30, marginRight: 30, marginTop: 10 }
})

export default class cursosAdmin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cursos: [],
      estudiantes: [],
      asiganciones: [],
      arr1:[],
      codigo: '',
      seccionCurso: '',
      nombre: '',
      seccion: '',
      universidad: '',
      titular: '',
      modalIsOpen: false,
      userInput: ''
    }
    /*     this.searchItem.bind(this) */
    this.handleAlter.bind(this)
    /*  this.regCurso.bind(this) */
    this.openModal = this.openModal.bind(this)
    /*    this.afterOpenModal = this.afterOpenModal.bind(this); */
    this.closeModal = this.closeModal.bind(this)

    axios
      .get('/listaCursos', { nick: window.localStorage.getItem('id') })
      .then(res => {
        this.setState({
          cursos: res.data,
          nick: window.localStorage.getItem('id')
        })
      })
    axios
      .get('/listaEstudiantes', { nick: window.localStorage.getItem('id') })
      .then(res => {
        this.setState({
          estudiantes: res.data
        })
      })
    axios
      .get('/asignacionesCurso', { nick: window.localStorage.getItem('id') })
      .then(res => {
        this.setState({
          asiganciones: res.data
        })
      })
  }

  handleSubmit = event => {
    event.preventDefault()

    for (let i in this.state.cursos) {
      if (
        this.state.codigo === this.state.cursos[i].codigo &&
        this.state.seccionCurso === this.state.cursos[i].seccion
      ) {
        this.state.nombre = this.state.cursos[i].nombre
        this.state.universidad = this.state.cursos[i].universidad
        this.state.titular = window.localStorage.getItem('id')
        this.state.seccion = this.state.seccionCurso
      }
    }

    const data = this.state

    axios
      .put('/cursosAdmin', data)
      .then(res => {
        if (res.status === 220) {
          alert('Guardado')
          window.location.replace('')
        } else if (res.status === 225) {
          alert('El curso ya tiene un titular')
        }
      })
      .catch(error => {})
  }

  getback = event => {
    event.preventDefault()
    this.props.history.push('/menuColaborador')
  }

  handleInputChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleInputChange1 = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleAlter = event => {
    event.preventDefault()
    var id = { codigo: 'idAsignacion' }

    axios
      .delete('/asignacionCurso', {
        data: id
      })
      .then(res => {
        if (res.status === 220) {
          alert('Eliminado')
          window.location.replace('')
        }
      })
  }

  openModal () {
    this.setState({ modalIsOpen: true, userInput: '' })
  }

  closeModal () {
    this.setState({ modalIsOpen: false, userInput: '' })
  }
  
  genPDF = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
    var data = {
      nombreSeccion: '',
      nombreEst: '',
      carnet: ''
    }

    for(let i in this.state.asiganciones){
      if(this.state.seccionCurso === this.state.asiganciones[i].seccionCurso &&
        this.state.codigo === this.state.asiganciones[i].idCurso){
          data.nombreSeccion = this.state.codigo + " - " + this.state.seccionCurso

          for(let i in this.state.estudiantes){
            if(this.state.asiganciones[i].nick === this.state.estudiantes[i].nombreUsuario){
              data.carnet = this.state.estudiantes[i].carnet
              data.nombreEst = this.state.estudiantes[i].nombre
              break
            }
           
          }

          this.state.arr1.push(data)
          console.log(this.state.arr1)
          data.nombreSeccion = ''
          data.nombreEst = ''
          data.carnet = ''
          

          break
        }
    }
  }

  render () {
    var arr = this.state.cursos
var arr1 = []

console.log(arr1)
    var codigo = this.state.codigo
    var seccionCurso = this.state.seccionCurso

    return (
      <div>
        <div className='volver'>
          <div>
            <button
              onClick={this.getback.bind(this)}
              className='btn btn-primary btn-block'
            >
              Regresar
            </button>
            <br></br>
          </div>

          <div>
            <button onClick={this.openModal} className='btn btn-primary bt'>
              Buscar Informacion
            </button>
          </div>
        </div>

        <div className='estructura'>
          <div>
            <form
              className='estructura1'
              onSubmit={this.handleSubmit.bind(this)}
            >
              <h3>Titularse a un curso</h3>

              <div className='form-group'>
                <input
                  className='form-control'
                  placeholder='Codigo'
                  name='codigo'
                  value={codigo}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className='form-group'>
                <input
                  className='form-control'
                  placeholder='Seccion'
                  name='seccionCurso'
                  value={seccionCurso}
                  onChange={this.handleInputChange}
                />
              </div>
              <button type='submit' className='btn btn-primary btn-block'>
                Titular
              </button>
            </form>
          </div>

          <h3>Listado de Cursos</h3>

          <table className='table table-dark table-bordered'>
            <thead>
              <th>Codigo</th>
              <th>Nombre</th>
              <th>Seccion</th>
              <th>Universidad</th>
              <th>Titular</th>
            </thead>
            <tbody>
              {arr.map(data => {
                if (!(data === null)) {
                  return (
                    <tr key={data.codigo}>
                      <td>{data.codigo}</td>
                      <td>{data.nombre}</td>
                      <td>{data.seccion}</td>
                      <td>{data.universidad}</td>
                      <td>{data.titular}</td>
                    </tr>
                  )
                }
              })}
            </tbody>
          </table>
        </div>
        <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel='Example Modal'
          >
            <h3>hola</h3>
            <label>{this.state.userInput}</label>
            <Autocomplete
              id='combo-box-demo'
              options={arr}
              getOptionLabel={option => option.nombre + ', ' + option.seccion}
              style={{ width: 400 }}
              autoSelect
              renderInput={params => (
                <TextField
                  {...params}
                  id='hola'
                  label='Busca un Usuario'
                  variant='outlined'
                  onClick={this.genPDF}
                  name='userInput'
                  onChange={this.handleInputChange1}
                  fullWidth
                />
              )}
            />

            <PDFDownloadLink
              document={
                <Document>
                  <Page size='A4' style={styles.page}>
                    <View style={styles.section}>
                      <Text>REPORTE DE ESTUDIANTES ASIGNADOS</Text>
                    </View>
                    <View style={styles.section}>
                      
                        
                        <Table data={arr1}>
                          <TableHeader>
                            <TableCell>Nombre Y seccion del curso</TableCell>
                            <TableCell>Nombre del Estudiante</TableCell>
                            <TableCell>Carnet</TableCell>
                          </TableHeader>
                          <TableBody>
                            <DataTableCell getContent={r => r.userInput} />
                            
                          </TableBody>
                        </Table>
                      
                    </View>
                  </Page>
                </Document>
              }
              fileName='ReporteInventario.pdf'
              style={{
                textDecoration: 'none',
                padding: '10px',
                color: '#4a4a4a',
                backgroundColor: '#f2f2f2',
                border: '1px solid #4a4a4a'
              }}
            >
              {({ blob, url, loading, error }) =>
                loading ? 'Cargando Documento...' : 'Descargar Reporte'
              }
            </PDFDownloadLink>

            <button onClick={this.closeModal}>close</button>
          </Modal>
        </div>
      </div>
    )
  }
}
