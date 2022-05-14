import React, { Component } from 'react'
/* import { Link } from "react-router-dom"; */
import './presupuesto.css'
import CsvDownload from 'react-json-to-csv'
import axios from 'axios'

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
    this.props.history.push('/menuColaborador')
  }

  regIngreso = event => {
    this.props.history.push('/menuColaborador/registroIngreso')
  }

  regGas = event => {
    this.props.history.push('/menuAdmin/registroGasto')
  }

  handle = event => {
    event.preventDefault()
    const data = this.state
    console.log('hola')

    axios
      .delete('/ingresoEgreso', data.codigo)
      .then(res => {
        if (res.status === 220) {
          alert('Guardado')
          window.location.replace('')
        }
      })
      .catch(error => {})
  }

  componentDidMount () {}

  render () {
    var arr = this.state.ingresoEgreso
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
          <div>
            <h3>Exportar Informacion</h3>
            <CsvDownload data={arr} />
          </div>
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
