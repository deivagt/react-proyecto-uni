import React, { Component } from 'react'
/* import { Link } from "react-router-dom"; */
import './pagos.css'
import {CsvDownload} from 'react-json-to-csv'

import axios from 'axios'

export default class pagos extends Component {
  constructor (props) {
    super(props)
    this.state = {
      estudiantes: [],
      carne: '',
      descripcion:'Congreso Estandar',
      monto: ''
    }

    axios
      .get('/listaEstudiantes', { nick: window.localStorage.getItem('id') })
      .then(res => {
        this.setState({
          estudiantes: res.data
        })
      })

    /*  this.handleInputChange.bind(this);
        this.handleSubmit.bind(this);
        this.getback.bind(this) */
  }

  handleSubmit = event => {
    event.preventDefault()
    const data = this.state
    var control = false

    for (let i in this.state.estudiantes) {
      if (this.state.carne === this.state.estudiantes[i].carne) {
        control = true
        console.log(control)
        break
      }
    }
    if (control == true) {
      axios
        .put('/pagos', data)
        .then(res => {
          if (res.status === 220) {
            alert('Guardado')
            window.location.replace('')
          }else if (res.status === 221){
            alert('Ya se a realizado el pago')
          }
        })
        .catch(error => {})
    } else {
      alert('El usuario no existe')
    }
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

  regUser = event => {
    this.props.history.push('/menuAdmin/registroUsuario')
  }

  render () {
    var arr = this.state.estudiantes
    const carne = this.state.carne
    const monto = this.state.monto
    const descripcion = this.state.descripcion

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
            <form
              className='mushasCosas'
              onSubmit={this.handleSubmit.bind(this)}
            >
              <h3>Registro de Pago</h3>
              <div className='form-group'>
                <label>Carne del estudiante</label>
                <input
                  /*  id='codigo' */
                  type='number'
                  className='form-control'
                  placeholder='Carne del estudiante'
                  name='carne'
                  value={carne}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className='form-group'>
                <label>Descripcion</label>
                <input
                  /*   id='bornDay' */
                 
                  className='form-control'
                  placeholder='Ingrese la descripcion'
                  name='descripcion'
                  value={descripcion}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className='form-group'>
                <label>Monto</label>
                <input
                  /*   id='bornDay' */
                  type='number'
                  className='form-control'
                  placeholder='Ingrese el monto'
                  name='monto'
                  value={monto}
                  onChange={this.handleInputChange}
                />
              </div>

              <button type='submit' className='btn btn-primary bt'>
                Registrar Monto
              </button>
            </form>
          </div>

          <div className='mushasCosas1'>
            <h3>Listado de Estudiantes</h3>
            <table className='table table-dark table-bordered'>
              <thead>
                <th>Carne</th>
                <th>Nombre</th>
                <th>Dpi</th>
                <th>Universidad</th>
              </thead>
              <tbody>
                {arr.map(data => {
                  if (!(data === null)) {
                    return (
                      <tr key={data.carne}>
                        <td>{data.carne}</td>
                        <td>{data.nombre}</td>
                        <td>{data.dpi}</td>
                        <td>{data.universidad}</td>
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
