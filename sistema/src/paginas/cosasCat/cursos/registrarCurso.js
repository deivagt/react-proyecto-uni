import React, { Component } from 'react'
/* import { Link } from "react-router-dom"; */
import './registrarCurso.css'
import axios from 'axios'

export default class registrarCurso extends Component {
  constructor (props) {
    super(props)
    this.state = {
      codigo: '',
      nombre: '',
      seccion: '',
      universidad: '',
      titular: ''
    }
  }

  getback = event => {
    event.preventDefault()
    this.props.history.goBack()
  }

  handleSubmit = event => {
    event.preventDefault()

    const data = this.state

    axios.post('/cursosAdmin', data).then(res => {
      if (res.status === 220) {
        alert('Guardado')
        this.setState({
            codigo: '',
            nombre: '',
            seccion: '',
            universidad: '',
            titular: ''
        })
      } 
    }).catch(error => {
        alert('El catedratico no existe')
      })
  }

  handleInputChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render () {
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
                Registrar Curso
              </button>

            
            </form>
          </div>
         
        </div>
      </div>
    )
  }
}
