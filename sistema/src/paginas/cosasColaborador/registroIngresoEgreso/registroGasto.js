import React, { Component } from 'react'
import './registroIngreso.css'

import axios from 'axios'

export default class registroIngreso extends Component {
  constructor (props) {
    super(props)
    var f = new Date()

    var cod = Math.floor(Math.random() * (382000 - 300000)) + 300000
    var codFactura = cod.toString()

    this.state = {
      codigo: codFactura,
      descripcion: '',
      fecha: f.getDate() + '-' + (f.getMonth() + 1) + '-' + f.getFullYear(),
      monto: '',
      tipo: 'egreso'
    }
    this.handleInputChange.bind(this)
    this.handleSubmit.bind(this)
  }

  getback = event => {
    event.preventDefault()
    this.props.history.goBack()
  }

  handleSubmit = event => {
    event.preventDefault()

    const data = this.state
    console.log(data)
    axios
      .post('/ingresoEgreso', data)
      .then(res => {
        if (res.status === 220) {
          alert('Guardado')
          this.setState({
            descripcion: '',
            monto: ''
          })
        }
      })
      .catch(error => {
        alert('Algo Salio Mal')
      })
  }

  handleInputChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    const descripcion = this.state.descripcion
    const fecha = this.state.fecha
    const monto = this.state.monto

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

        <div className='estructuraRegistro'>
          <div>
            <form
              className='estructuraRegistro'
              onSubmit={this.handleSubmit.bind(this)}
            >
              <h3>Registro de Gasto</h3>
              <div className='form-group'>
                <label>Descripcion</label>
                <input
                  /*  id='codigo' */
                  className='form-control'
                  placeholder='Descripcion del Ingreso'
                  name='descripcion'
                  value={descripcion}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className='form-group'>
                <label>Fecha</label>
                <input
                  /*   id='bornDay' */
                  className='form-control'
                  disabled
                  placeholder='Fecha del ingreso'
                  name='fecha'
                  value={fecha}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className='form-group'>
                <label>Monto</label>
                <input
                  /*  id='tel' */
                  type='number'
                  className='form-control'
                  placeholder='Ingrese el Monto'
                  name='monto'
                  value={monto}
                  onChange={this.handleInputChange}
                />
              </div>
              <div>
                <button type='submit' className='btn btn-primary bt'>
                  Registrar Ingreso
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
