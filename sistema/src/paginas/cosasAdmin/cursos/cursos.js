import React, { Component } from 'react'
/* import { Link } from "react-router-dom"; */
import './cursos.css'
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
  page: {},
  tabla: {},
  section: { marginLeft: 30, marginRight: 30, marginTop: 10 }
})

export default class cursosAdmin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cursos: [],
      busqueda1: '',
      busqueda2: '',
      codigo: '',
      nombre: '',
      seccion: '',
      universidad: '',
      titular: ''
    }
    this.searchItem.bind(this)
    this.handleAlter.bind(this)
    this.regCurso.bind(this)

    axios
      .get('/listaCursos', { nick: window.localStorage.getItem('id') })
      .then(res => {
        this.setState({
          cursos: res.data
        })
      })
  }

  handleSubmit = event => {
    event.preventDefault()

    const data = this.state

    axios
      .put('/cursosAdmin', data)
      .then(res => {
        if (res.status === 220) {
          alert('Guardado')
          window.location.replace('')
        } else {
          alert('El Catedratico no existe')
        }
      })
      .catch(error => {})
  }

  getback = event => {
    event.preventDefault()
    this.props.history.push('/menuAdmin')
  }

  searchItem = event => {
    console.log(this.state.busqueda)
    axios
      .get('/cursosAdmin', {
        params: {
          busqueda1: this.state.busqueda1,
          busqueda2: this.state.busqueda2
        }
      })
      .then(res => {
        const info = res.data
        this.setState({
          codigo: info.codigo,
          nombre: info.nombre,
          seccion: info.seccion,
          universidad: info.universidad,
          titular: info.titular
        })
        console.log(info)
      })
      .catch(error => {
        alert('Curso no encontrado')
      })
  }

  handleInputChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  regCurso = event => {
    this.props.history.push('/menuAdmin/registroCurso')
  }

  handleAlter = event => {
    event.preventDefault()
    var id = { codigo: this.state.codigo, seccion: this.state.seccion }

    axios
      .delete('/cursosAdmin', {
        data: id
      })
      .then(res => {
        if (res.status === 220) {
          alert('Eliminado')
          window.location.replace('')
        }
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
            axios.post('/cursosAdmin', jsonObj[i]).then(res => {
              if (res.status === 220) {
                alert('Guardado')
                window.location.replace('')
              }
            })
          }
        })
    }
  }

  render () {
    var arr = this.state.cursos
    const busqueda1 = this.state.busqueda1
    const busqueda2 = this.state.busqueda2
    const codigo = this.state.codigo
    const nombre = this.state.nombre
    const seccion = this.state.seccion
    const universidad = this.state.universidad
    const titular = this.state.titular

    return (
      <div>
        <div className='volver'>
          <button
            onClick={this.getback.bind(this)}
            className='btn btn-primary btn-block'
          >
            Regresar
          </button>
          <button
            onClick={this.regCurso.bind(this)}
            className='btn btn-primary btn-block'
          >
            Registrar Curso
          </button>

          <div className='form-group'>
            <label>Buscar un Curso </label>
            <input
              id='busqueda1'
              className='form-control'
              placeholder='Codigo Curso'
              name='busqueda1'
              value={busqueda1}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='form-group'>
            <input
              id='busqueda2'
              className='form-control'
              placeholder='seccion'
              name='busqueda2'
              value={busqueda2}
              onChange={this.handleInputChange}
            />
          </div>
          <button
            onClick={this.searchItem.bind(this)}
            className='btn btn-primary btn-block'
          >
            Buscar
          </button>
          <div className='form-group'>
            <label> </label>
            <label> </label>
            <label> </label>
            <label> </label>
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
            <div>
              <PDFDownloadLink
                document={
                  <Document>
                    <Page size='A4' style={styles.page}>
                      <View style={styles.section}>
                        <Text>REPORTE DE CURSOS</Text>
                      </View>
                      <View style={styles.section}>
                        <Table data={arr}>
                          <TableHeader>
                            <TableCell>Codigo</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Seccion</TableCell>
                            <TableCell>Universidad</TableCell>
                            <TableCell>Titular</TableCell>
                          </TableHeader>
                          <TableBody>
                            <DataTableCell getContent={r => r.codigo} />
                            <DataTableCell getContent={r => r.nombre} />
                            <DataTableCell getContent={r => r.seccion} />
                            <DataTableCell getContent={r => r.universidad} />
                            <DataTableCell getContent={r => r.titular} />
                          </TableBody>
                        </Table>
                      </View>
                    </Page>
                  </Document>
                }
                fileName='ReporteCursos.pdf'
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
            </div>
          </div>
        </div>

        <div className='estructura'>
          <div>
            <form
              className='estructura1'
              onSubmit={this.handleSubmit.bind(this)}
            >
              <h3>Informacion del Curso</h3>
              <div className='form-group'>
                <label>Codigo</label>
                <input
                  /*  id='codigo' */
                  className='form-control'
                  placeholder='Codigo del objeto'
                  name='codigo'
                  disabled
                  value={codigo}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className='form-group'>
                <label>Nombre</label>
                <input
                  /*   id='bornDay' */
                  className='form-control'
                  placeholder='Nombre del objeto'
                  name='nombre'
                  value={nombre}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className='form-group'>
                <label>Seccion</label>
                <input
                  /*  id='tel' */
                  disabled
                  className='form-control'
                  placeholder='Descripcion del objeto'
                  name='seccion'
                  value={seccion}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className='form-group'>
                <label>Universidad</label>
                <input
                  /* id='mail' */

                  className='form-control'
                  placeholder='Cantidad del objeto'
                  name='universidad'
                  value={universidad}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className='form-group'>
                <label>Titular</label>
                <input
                  /* id='mail' */

                  className='form-control'
                  placeholder='Cantidad del objeto'
                  name='titular'
                  value={titular}
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
      </div>
    )
  }
}
