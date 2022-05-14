import React, { Component } from 'react'
/* import { Link } from "react-router-dom"; */
import './cursos.css'
import axios from 'axios'
import CsvDownload from 'react-json-to-csv'
export default class cursosAdmin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cursos: [],
      codigo: '',
      seccionCurso: '',
      nick: ''
    }
    /*     this.searchItem.bind(this) */
    this.handleAlter.bind(this)
    /*  this.regCurso.bind(this) */

    axios
      .get('/listaCursos', { nick: window.localStorage.getItem('id') })
      .then(res => {
        this.setState({
          cursos: res.data,
          nick: window.localStorage.getItem('id')
        })
      })
  }

  handleSubmit = event => {
    event.preventDefault()
    const arr = this.state.cursos
    var nombreCur = ''
    for (let i in arr) {
      if (this.state.codigo === arr[i].codigo) {
        nombreCur = arr[i].nombre
      }
    }

    const data = {
      codigo : this.state.codigo,
      seccionCurso : this.state.seccionCurso,
      nombreCurso : nombreCur,
      nick : this.state.nick
    }

    axios
      .put('/asignacionCurso', data)
      .then(res => {
        if (res.status === 220) {
          alert('Guardado')
          window.location.href = '/menuColaborador/miperfil'
        }
      })
      .catch(error => {
        alert('El Catedratico no existe')
      })

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

  handleAlter = event => {
    event.preventDefault()
    var id = { codigo: 'idAsignacion'}

    axios
      .delete('/asignacionCurso', {
        data: id
      })
      .then(res => {
        if (res.status === 220) {
          alert('Eliminado')
          window.location.replace('')
        }
      })
  }

  render () {
    var arr = this.state.cursos

    var codigo = this.state.codigo
    var seccionCurso = this.state.seccionCurso

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
              <h3>Asignarse a un curso</h3>

              <div className='form-group'>
                <input
                  className='form-control'
                  placeholder='Codigo'
                  name='codigo'
                  value={codigo}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className='form-group'>
                <input
                  className='form-control'
                  placeholder='Seccion'
                  name='seccionCurso'
                  value={seccionCurso}
                  onChange={this.handleInputChange}
                />
              </div>
              <button type='submit' className='btn btn-primary btn-block'>
                Asignar
              </button>
            </form>
          </div>
          <div>
            <h3>Exportar Informacion</h3>
            <CsvDownload data={arr} />
          </div>
          <h3>Listado de Cursos</h3>

          <table className='table table-dark table-bordered'>
            <thead>
              <th>Codigo</th>
              <th>Nombre</th>
              <th>Seccion</th>
              <th>Universidad</th>
              <th>Titular</th>
            </thead>
            <tbody>
              {arr.map(data => {
                if (!(data === null)) {
                  return (
                    <tr key={data.codigo}>
                      <td>{data.codigo}</td>
                      <td>{data.nombre}</td>
                      <td>{data.seccion}</td>
                      <td>{data.universidad}</td>
                      <td>{data.titular}</td>
                    </tr>
                  )
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
