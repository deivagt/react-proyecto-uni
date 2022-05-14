import React, { Component } from 'react'
/* import { Link } from "react-router-dom"; */
import './entregas.css'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'



export default class entregas extends Component {
    
  constructor (props) {
    super(props)

    this.state = {
      estudiantes: [],
      tipoEntrega: 'cafe',
      nick: '',
      nombreEst: '',
      descripcion: '',
      cantidad: '1'
    }

    axios
      .get('/listaEstudiantes', { nick: window.localStorage.getItem('id') })
      .then(res => {
        this.setState({
          estudiantes: res.data
        })
      })

    this.getback.bind(this)
    this.handleSubmit.bind(this)
  }

  handleSubmit = event => {
    event.preventDefault()
    const data = this.state
    var control = false

    for (let i in this.state.estudiantes) {
      if (this.state.nick === this.state.estudiantes[i].nombreUsuario) {
        control = true

        this.state.nombreEst = this.state.estudiantes[i].nombre

        break
      }
    }
    if (control == true) {
      axios
        .post('/cafe', data)
        .then(res => {
          if (res.status === 220) {
            alert('Guardado')
            /*  this.props.history.goBack() */
          } else if(res.status ===221){
            alert('Ya no se pueden realizar mas entregas')
          }else{
              alert('Error')
          }
        })
        .catch(error => {})
    } else {
      alert('El estudiante no existe')
    }
  }

  getback = event => {
    event.preventDefault()
    this.props.history.goBack()
  }

  handleInputChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    const tipoEntrega = this.state.tipoEntrega
    const nick = this.state.nick
    const descripcion = this.state.descripcion
    const cantidad = this.state.cantidad
    var arr = this.state.estudiantes

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

        <div className='mushasCo'>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <h3>Entregas</h3>

            <label>Tipo de entrega</label>
            <br></br>
            <select
              name='tipoEntrega'
              value={tipoEntrega}
              onChange={this.handleInputChange}
            >
              <option selected disabled>
                Selecciona un tipo de cuenta...
              </option>
              <option value='cafe'>Coffee Break</option>
              <option value='insumo'>Insumo</option>
              <option value='almuerzo'>Almuerzo</option>
            </select>
           
           <div>
               <label></label>
               <label>Selecciona un estudiante</label>
            <Autocomplete
              id='combo-box-demo'
              options={arr}
              getOptionLabel={option => option.nombreUsuario}
              style={{ width: 400 }}
              autoSelect
              renderInput={params => (
                <TextField
                  {...params}
                  
                  id='hola'
                  label='Busca un Usuario'
                  variant='outlined'
                  onClick={this.handleInputChange}
                  name='nick'
                  value = {nick}
                  onChange={this.handleInputChange}
                  fullWidth
                />
              )}
            />
            </div>

            <div className='form-group'>
              <label>Descripcion</label>
              <input
                className='form-control'
                placeholder='Ingrese una descripcion'
                name='descripcion'
                value={descripcion}
                onChange={this.handleInputChange}
              />
            </div>

            <div className='form-group'>
              <label>Cantidad</label>
              <input
                className='form-control'
                placeholder='1'
                name='cantidad'
                value={cantidad}
                onChange={this.handleInputChange}
              />
            </div>
            

            <button type='submit' className='btn btn-primary btn-block'>
              Realizar entrega
            </button>
          </form>
        </div>
      </div>
    )
  }
}
