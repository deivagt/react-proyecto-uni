import React, { Component } from 'react'
/* import { Link } from "react-router-dom"; */
import './inventario.css'
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

// Create Document Component
/*  MyDocument = () => (
  
) */

export default class inventario extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bienes: [],

      cafe: '',
      almuerzo: '',
      insumo: '',
      busqueda: '',
      codigo: '',
      nombre: '',
      descripcion: '',
      cantidad: '',
      personaEnc: '',
      ubi: '',
      estado: '',
      tipoEntrega: '',
      cantidadEntrega: ''
    }
    this.searchItem.bind(this)
    this.handleAlter.bind(this)
    this.regBien.bind(this)

    axios
      .get('/inventario', { nick: window.localStorage.getItem('id') })
      .then(res => {
        this.setState({
          bienes: res.data.inventario,
          cafe: res.data.cafe.cafe.toString(),
          almuerzo: res.data.cafe.almuerzo.toString(),
          insumo: res.data.cafe.insumo.toString()
        })
      })
  }

  handleSubmit = event => {
    event.preventDefault()

    const data = this.state

    axios.put('/inventario', data).then(res => {
      if (res.status === 220) {
        alert('Guardado')
        window.location.replace('')
      }
    })
  }

  guardarEntrega = event => {
    event.preventDefault()

    const data = this.state

    axios.put('/cafe', data).then(res => {
      if (res.status === 220) {
        alert('Listo')
        window.location.replace('')
      } else if (res.status === 221) {
        alert('Debes seleccionar un entregable')
      }
    })
  }

  getback = event => {
    event.preventDefault()
    this.props.history.push('/menuAdmin')
  }

  searchItem = event => {
    console.log(this.state.busqueda)
    axios
      .get('/bien', {
        params: { busqueda: this.state.busqueda }
      })
      .then(res => {
        const info = res.data
        this.setState({
          codigo: info.codigo,
          nombre: info.nombre,
          descripcion: info.descripcion,
          cantidad: info.cantidad,
          personaEnc: info.personaEnc,
          ubi: info.ubi,
          estado: info.estado
        })
        console.log(info)
      })
      .catch(error => {
        alert('Objeto no encontrado')
      })
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
    axios
      .get('/cafe', { nick: window.localStorage.getItem('id') })
      .then(res => {
        const datosCafe = res.data
        console.log(datosCafe)
        if (this.state.tipoEntrega === 'cafe') {
          this.setState({
            cantidadEntrega: datosCafe.cafe.toString()
          })
        } else if (this.state.tipoEntrega === 'almuerzo') {
          this.setState({
            cantidadEntrega: datosCafe.almuerzo.toString()
          })
        } else if (this.state.tipoEntrega === 'insumo') {
          this.setState({
            cantidadEntrega: datosCafe.insumo.toString()
          })
        }
      })
  }

  regBien = event => {
    this.props.history.push('/menuAdmin/registroBien')
  }
  entregas = event => {
    this.props.history.push('/menuAdmin/entregas')
  }

  handleAlter = event => {
    event.preventDefault()
    var id = { codigo: this.state.codigo }

    axios
      .delete('/inventario', {
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
            jsonObj[i].codigo = (
              Math.floor(Math.random() * (50000000 - 34000000)) + 34000000
            ).toString()
            axios.post('/inventario', jsonObj[i]).then(res => {
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
    var arr = this.state.bienes
    const busqueda = this.state.busqueda
    const codigo = this.state.codigo
    const nombre = this.state.nombre
    const descripcion = this.state.descripcion
    const cantidad = this.state.cantidad
    const personaEnc = this.state.personaEnc
    const ubi = this.state.ubi
    const estado = this.state.estado
    const cafe1 = this.state.cafe
    const alm = this.state.almuerzo
    const ins = this.state.insumo
    const tipoEntrega = this.state.tipoEntrega
    const cantidadEntrega = this.state.cantidadEntrega

    return (
      <div>
        <div className='hola'>
          <div className='volver'>
            <button
              onClick={this.getback.bind(this)}
              className='btn btn-primary btn-block'
            >
              Regresar
            </button>
            <button
              onClick={this.regBien.bind(this)}
              className='btn btn-primary btn-block'
            >
              Registrar Objeto
            </button>
            <button
              onClick={this.entregas.bind(this)}
              className='btn btn-primary btn-block'
            >
              Entregas...
            </button>

            <div className='form-group'>
              <label>Buscar un objeto</label>
              <input
                id='busqueda'
                className='form-control'
                placeholder='Introduce un Codigo'
                type='number'
                name='busqueda'
                value={busqueda}
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
              <label>Editar Entregables</label>

              <select
                name='tipoEntrega'
                value={tipoEntrega}
                onChange={this.handleInputChange1}
              >
                <option selected>Selecciona un tipo de cuenta...</option>
                <option value='cafe'>Coffee Break</option>
                <option value='insumo'>Insumo</option>
                <option value='almuerzo'>Almuerzo</option>
              </select>

              <input
                id='busqueda'
                className='form-control'
                placeholder='Introduce un Codigo'
                name='cantidadEntrega'
                value={cantidadEntrega}
                onChange={this.handleInputChange}
              />
            </div>
            <button
              onClick={this.guardarEntrega.bind(this)}
              className='btn btn-primary btn-block'
            >
              Guardar
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
            </div>
          </div>
        </div>

        <div className='estructura'>
          <div>
            <form
              className='estructura1'
              onSubmit={this.handleSubmit.bind(this)}
            >
              <h3>Informacion del objeto</h3>
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
                <label>Descripcion</label>
                <input
                  /*  id='tel' */

                  className='form-control'
                  placeholder='Descripcion del objeto'
                  name='descripcion'
                  value={descripcion}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className='form-group'>
                <label>Cantidad</label>
                <input
                  /* id='mail' */

                  className='form-control'
                  placeholder='Cantidad del objeto'
                  name='cantidad'
                  value={cantidad}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className='form-group'>
                <label>Persona Encargada</label>
                <input
                  /*  id='pass' */
                  className='form-control'
                  placeholder='Nick persona encargada del objeto'
                  name='personaEnc'
                  value={personaEnc}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className='form-group'>
                <label>Ubicacion</label>
                <input
                  /*  id='puesto' */
                  className='form-control'
                  placeholder='Ubicacion del objeto'
                  name='ubi'
                  value={ubi}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className='form-group'>
                <label>Estado</label>
                <input
                  /*  id='puesto' */
                  className='form-control'
                  placeholder='Estado del objeto'
                  name='estado'
                  value={estado}
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
          <div>
            <h3>Descarga de Informacion</h3>
            <PDFDownloadLink
              document={
                <Document>
                  <Page size='A4' style={styles.page}>
                    <View style={styles.section}>
                      <Text>REPORTE DE INVENTARIO</Text>
                    </View>
                    <View style={styles.section}>
                      <Table data={arr}>
                        <TableHeader>
                          <TableCell>Codigo</TableCell>
                          <TableCell>Nombre</TableCell>
                          <TableCell>Descripcion</TableCell>
                          <TableCell>Cantidad</TableCell>
                          <TableCell>Encargado</TableCell>
                          <TableCell>Ubicacion</TableCell>
                          <TableCell>Estado</TableCell>
                        </TableHeader>
                        <TableBody>
                          <DataTableCell getContent={r => r.codigo} />
                          <DataTableCell getContent={r => r.nombre} />
                          <DataTableCell getContent={r => r.descripcion} />
                          <DataTableCell getContent={r => r.cantidad} />
                          <DataTableCell getContent={r => r.personaEnc} />
                          <DataTableCell getContent={r => r.ubi} />
                          <DataTableCell getContent={r => r.estado} />
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
            <CsvDownload data={arr} />
          </div>
          <div>
            <h3>Listado de Bienes</h3>
          </div>
          <div className='centerTable'>
            <table className='table table-dark table-bordered'>
              <thead>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Cantidad</th>
                <th>Encargado</th>
                <th>Ubicacion</th>
                <th>Estado</th>
              </thead>
              <tbody>
                {
                  <tr>
                    <td>----</td>
                    <td>Coffee Break</td>
                    <td>Coffee Break Restantes</td>
                    <td>{cafe1}</td>
                    <td>----</td>
                    <td>----</td>
                    <td>----</td>
                  </tr>
                }
                {
                  <tr>
                    <td>----</td>
                    <td>Insumos</td>
                    <td>Insumos Restantes</td>
                    <td>{ins}</td>
                    <td>----</td>
                    <td>----</td>
                    <td>----</td>
                  </tr>
                }
                {
                  <tr>
                    <td>----</td>
                    <td>Almuerzos</td>
                    <td>Almuerzos restantes</td>
                    <td>{alm}</td>
                    <td>----</td>
                    <td>----</td>
                    <td>----</td>
                  </tr>
                }
                {arr.map(data => {
                  if (!(data === null)) {
                    return (
                      <tr key={data.codigo}>
                        <td>{data.codigo}</td>
                        <td>{data.nombre}</td>
                        <td>{data.descripcion}</td>
                        <td>{data.cantidad}</td>
                        <td>{data.personaEnc}</td>
                        <td>{data.ubi}</td>
                        <td>{data.estado}</td>
                      </tr>
                    )
                  }
                })}
              </tbody>
            </table>
            
          </div>
        </div>
      </div>
    )
  }
}
