import React, { Component } from 'react'
/* import { Link } from "react-router-dom"; */
import './presupuesto.css'
import CsvDownload from 'react-json-to-csv'
import axios from 'axios'
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

export default class presupuesto extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ingresoEgreso: [],
      subtotal: 0,
      meta: 0,
      busqueda: ''
    }

    axios
      .get('/pagos', { nick: window.localStorage.getItem('id') })
      .then(res => {
        this.setState({
          ingresoEgreso: res.data
        })

        for (let i in this.state.ingresoEgreso) {
          if (this.state.ingresoEgreso[i].tipo === 'ingreso') {
            this.state.subtotal =
              this.state.subtotal + Number(this.state.ingresoEgreso[i].monto)
          } else {
            this.state.subtotal =
              this.state.subtotal - Number(this.state.ingresoEgreso[i].monto)
          }
        }
        this.setState({
          subtotal: this.state.subtotal
        })

        axios.get('/meta', { nick: window.localStorage.getItem('id') }).then(
          this.setState({
            meta: res.data
          })
        )
      })
  }

  getback = event => {
    event.preventDefault()
    this.props.history.push('/menuAdmin')
  }

  regIngreso = event => {
    this.props.history.push('/menuAdmin/registroIngreso')
  }

  regGas = event => {
    this.props.history.push('/menuAdmin/registroGasto')
  }

  handle = event => {
    event.preventDefault()
    console.log(this.state.busqueda)
    const id = { codigo: this.state.busqueda }

    axios
      .delete('/ingresoEgreso', {
        data: id
      })
      .then(res => {
        if (res.status === 220) {
          alert('Eliminado')
          window.location.replace('')
        } else {
          alert('error')
        }
      })
      .catch(error => {})
  }

  handleInputChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    var arr = this.state.ingresoEgreso
    console.log(arr)
    var arr1 = []
    var subtotal = this.state.subtotal
    var meta = this.state.meta
    var busqueda = this.state.codigo

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
            onClick={this.regIngreso.bind(this)}
            className='btn btn-primary btn-block'
          >
            Registrar Ingreso
          </button>
          <button
            onClick={this.regGas.bind(this)}
            className='btn btn-primary btn-block'
          >
            Registrar Gasto
          </button>
          <div>
          
            <CsvDownload data={arr} />
          </div>
        </div>

        <div className='abc'>
          <div className='form-group'>
            <label>Monto Total</label>
            <input
              /*  id='codigo' */
              type='number'
              className='form-control'
              disabled
              placeholder='Carne del estudiante'
              name='subtotal'
              value={subtotal}
              onChange={this.handleInputChange}
            />
          </div>

          <div className='form-group'>
            <label>Meta</label>
            <input
              /*  id='codigo' */
              type='number'
              className='form-control'
              disabled
              placeholder='85000'
              name='meta'
              value={meta}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='form-group'>
            <label>Borrar un ingreso o pago</label>
            <input
              /*  id='codigo' */
              type='number'
              className='form-control'
              placeholder='Ingrese el codigo del ingreso o pago'
              name='busqueda'
              value={busqueda}
              onChange={this.handleInputChange}
            />
          </div>
          <button
            onClick={this.handle.bind(this)}
            className='btn btn-primary btn-block'
          >
            Borrar
          </button>

          <div className='mushasCosas1'>
            <h3>Listado de Transacciones</h3>
            <table className='table table-dark table-bordered'>
              <thead>
                <th>Codigo</th>
                <th>Descripcion</th>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Monto</th>
              </thead>
              {}
              <tbody>
                {arr.map(data => {
                  if (!(data === null)) {
                    return (
                      <tr key={data.codigo}>
                        <td>{data.codigo}</td>
                        <td>{data.descripcion}</td>
                        <td>{data.fecha}</td>
                        <td>{data.tipo}</td>
                        <td>{data.monto}</td>
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
