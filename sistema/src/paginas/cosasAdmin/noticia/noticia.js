import React, { Component } from 'react'
/* import { Link } from "react-router-dom"; */
import './noticia.css'

import axios from 'axios'

export default class noticia extends Component {
  constructor (props) {
    super(props)

    this.state = {
      noticias: [],
      codigo: '',
      titulo: '',
      fecha: '',
      descripcion: ''
    }

    axios
      .get('/noticia', { nick: window.localStorage.getItem('id') })
      .then(res => {
        this.setState({
             noticias: res.data
        })
        console.log(this.state.noticias)
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
    var arr = this.state.noticias

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
            onClick={this.getback.bind(this)}
            className='btn btn-primary btn-block'
          >
            Crear Noticia
          </button>
        </div>
        
         
       
        <div className='noticiaAdmin'>
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
            <h3>Noticias</h3>

            {arr.map(data => {
              if (!(data === null)) {
                return (
                  <div>
                    
                    <h1>{data.titulo}</h1>
                    <p>{data.descripcion}</p>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </div>
    )
  }
}
