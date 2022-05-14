import React, { Component } from 'react'
/* import { Link } from "react-router-dom"; */
import './registrarBien.css'
import axios from 'axios'

export default class registrarBien extends Component {
  constructor (props) {
    super(props)
    this.state = {
      codigo: '',
      nombre: '',
      descripcion: '',
      cantidad: '',
      personaEnc: '',
      ubi: '',
      estado: ''
    }
  }

  getback = event => {
    event.preventDefault()
    this.props.history.goBack()
  }

  handleSubmit = event => {
    event.preventDefault()

    const data = this.state
  
    axios.post('/inventario', data).then(res => {
      if (res.status === 220) {
        alert('Guardado')
        this.setState({
            codigo: '',
            nombre: '',
            descripcion: '',
            cantidad: '',
            personaEnc: '',
            ubi: '',
            estado: ''
          })
      }
    })
  }
  entregas = event =>{
    this.props.history.push('/menuColaborador/entregas')
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
    const descripcion = this.state.descripcion
    const cantidad = this.state.cantidad
    const personaEnc = this.state.personaEnc
    const ubi = this.state.ubi
    const estado = this.state.estado

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
              <h3>Informacion del objeto</h3>
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
                Registrar
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
