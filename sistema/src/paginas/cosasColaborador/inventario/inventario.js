import React, { Component } from 'react'
/* import { Link } from "react-router-dom"; */
import './inventario.css'
import axios from 'axios'
import CsvDownload from 'react-json-to-csv'
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
      estado: ''
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

  getback = event => {
    event.preventDefault()
    this.props.history.push('/menuColaborador')
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
  regBien = event => {
    this.props.history.push('/menuAdmin/registroBien')
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

  entregas = event => {
    this.props.history.push('/menuColaborador/entregas')
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
                  disabled
                  value={nombre}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className='form-group'>
                <label>Descripcion</label>
                <input
                  /*  id='tel' */
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
                  name='estado'
                  value={estado}
                  onChange={this.handleInputChange}
                />
              </div>
            </form>
          </div>
          <div>
            <h3>Exportar Informacion</h3>
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
