import React, { Component } from 'react'
/* import { Link } from "react-router-dom"; */
import './reportes.css'

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
  page: {},
  tabla: {},
  section: { marginLeft: 30, marginRight: 30, marginTop: 10 }
})

export default class presupuesto extends Component {
  constructor (props) {
    super(props)

    this.state = {
      usr: [],
      uAsig: []
    }

    axios
      .get('/listaEstudiantes', {
        params: window.localStorage.getItem('id')
      })
      .then(res => {
        this.setState({
          usuarios: res.data
        })
      })

    axios
      .get('/pagos', {
        params: window.localStorage.getItem('id')
      })
      .then(res => {
        this.setState({
          uAsig: res.data
        })
      })
  }

  getback = event => {
    event.preventDefault()
    this.props.history.push('/menuAdmin')
  }

  handleInputChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  ordenarAsc (p_array_json, p_key) {
    p_array_json.sort(function (a, b) {
      return a[p_key] > b[p_key]
    })
  }

  render () {
    var arr = this.state.usuarios
    var arr1 = []
    var arr2 = []
    var arr3 = []
    var arr4 = []
    var arr5 = []

    var totalIngresosEntr = 0
    var totalEntradas = 0
    var totalIngresos = 0
    var totalGastos = 0

    var uAsig = this.state.uAsig
    for (let i in arr) {
      for (let j in uAsig) {
        if (arr[i].carne === uAsig[j].carne) {
          arr1.push(arr[i])
          break
        }
      }
    }

    for (let i in uAsig) {
      if (uAsig[i].carne !== undefined) {
        totalEntradas = totalEntradas + 1
        totalIngresosEntr = totalIngresosEntr + Number(uAsig[i].monto)
      }
      if (uAsig[i].tipo === 'ingreso') {
        arr2.push(uAsig[i])
        totalIngresos = totalIngresos + Number(uAsig[i].monto)
      }
      if (uAsig[i].tipo === 'egreso') {
        arr3.push(uAsig[i])
        totalGastos = totalGastos + Number(uAsig[i].monto)
      }
    }

    for(let i in arr1){
        arr4.push(arr1[i])
        arr5.push(arr1[i])
    }

    arr4.sort(function (a, b) {
      var textA = a.universidad
      var textB = b.universidad
      return textA < textB ? -1 : textA > textB ? 1 : 0
    })
    arr5.sort(function (a, b) {
        var textA = a.nac
        var textB = b.nac
        return textA < textB ? -1 : textA > textB ? 1 : 0
      })
    

    console.log(arr4)

    return (
      <div>
        <div className='volver'>
            <br></br>
          <button
            onClick={this.getback.bind(this)}
            className='btn btn-primary btn-block'
          >
            Regresar
          </button>
        </div>

        <div className='abc'>
          <div>
            {' '}
            <h3>Estudiantes registrados vs Asistentes</h3>
            <br></br>
            <PDFDownloadLink
              document={
                <Document>
                  <Page size='A4' style={styles.page}>
                    <View style={styles.section}>
                      <Text>REPORTE ESTUDIANTES REGISTRADOS VS ASISTENTES</Text>
                    </View>
                    <View style={styles.section}>
                      <Text>ESTUDIANTES REGISTRADOS</Text>
                      <Table data={arr}>
                        <TableHeader>
                          <TableCell>Nombre</TableCell>
                          <TableCell>Dpi</TableCell>
                          <TableCell>Carne</TableCell>
                          <TableCell>Correo</TableCell>
                          <TableCell>Universidad</TableCell>
                          <TableCell>Nacionalidad</TableCell>
                        </TableHeader>
                        <TableBody>
                          <DataTableCell getContent={r => r.nombre} />
                          <DataTableCell getContent={r => r.dpi} />
                          <DataTableCell getContent={r => r.carne} />
                          <DataTableCell getContent={r => r.correo} />
                          <DataTableCell getContent={r => r.universidad} />
                          <DataTableCell getContent={r => r.nac} />
                        </TableBody>
                      </Table>
                    </View>
                    <View style={styles.section}>
                      <Text>ASISTENTES</Text>
                      <Table data={arr1}>
                        <TableHeader>
                          <TableCell>Nombre</TableCell>
                          <TableCell>Dpi</TableCell>
                          <TableCell>Carne</TableCell>
                          <TableCell>Correo</TableCell>
                          <TableCell>Universidad</TableCell>
                          <TableCell>Nacionalidad</TableCell>
                        </TableHeader>
                        <TableBody>
                          <DataTableCell getContent={r => r.nombre} />
                          <DataTableCell getContent={r => r.dpi} />
                          <DataTableCell getContent={r => r.carne} />
                          <DataTableCell getContent={r => r.correo} />
                          <DataTableCell getContent={r => r.universidad} />
                          <DataTableCell getContent={r => r.nac} />
                        </TableBody>
                      </Table>
                    </View>
                  </Page>
                </Document>
              }
              fileName='ReporteRegistradorAsignados.pdf'
              style={{
                textDecoration: 'none',
                padding: '10px',
                color: '#4a4a4a',
                backgroundColor: '#f2f2f2',
                border: '1px solid #4a4a4a'
              }}
            >
              {({ blob, url, loading, error }) =>
                loading ? 'Cargando Documento...' : 'Descargar Reporte'
              }
            </PDFDownloadLink>
          </div>
          <br></br>
          <div>
            {' '}
            <h3>Ingresos por ventas de entradas</h3>
            <br></br>
            <PDFDownloadLink
              document={
                <Document>
                  <Page size='A4' style={styles.page}>
                    <View style={styles.section}>
                      <Text>TOTAL DE INGRESOS POR VENTAS DE ENTRADAS</Text>
                    </View>
                    <View style={styles.section}>
                      <Text>Ingresos: {totalIngresosEntr} Q</Text>
                    </View>
                    <View style={styles.section}>
                      <Text>Entradas Vendidas: {totalEntradas} </Text>
                    </View>
                  </Page>
                </Document>
              }
              fileName='ReporteEntradas.pdf'
              style={{
                textDecoration: 'none',
                padding: '10px',
                color: '#4a4a4a',
                backgroundColor: '#f2f2f2',
                border: '1px solid #4a4a4a'
              }}
            >
              {({ blob, url, loading, error }) =>
                loading ? 'Cargando Documento...' : 'Descargar Reporte'
              }
            </PDFDownloadLink>
          </div>
          <br></br>
          <div>
            {' '}
            <h3>Ingresos por ventas y actividades extra</h3>
            <br></br>
            <PDFDownloadLink
              document={
                <Document>
                  <Page size='A4' style={styles.page}>
                    <View style={styles.section}>
                      <Text>
                        TOTAL DE INGRESOS POR VENTAS Y ACTIVIDADES EXTRA
                      </Text>
                    </View>
                    <View style={styles.section}>
                      <Text>Ingresos: {totalIngresos} Q</Text>
                    </View>
                    <View style={styles.section}>
                      <Text>Ingresos Obtenidos</Text>
                      <Table data={arr2}>
                        <TableHeader>
                          <TableCell>Codigo</TableCell>
                          <TableCell>Descripcion</TableCell>
                          <TableCell>Monto</TableCell>
                          <TableCell>Fecha</TableCell>
                        </TableHeader>
                        <TableBody>
                          <DataTableCell getContent={r => r.codigo} />
                          <DataTableCell getContent={r => r.descripcion} />
                          <DataTableCell getContent={r => r.monto} />
                          <DataTableCell getContent={r => r.fecha} />
                        </TableBody>
                      </Table>
                    </View>
                  </Page>
                </Document>
              }
              fileName='ReporteIngresos.pdf'
              style={{
                textDecoration: 'none',
                padding: '10px',
                color: '#4a4a4a',
                backgroundColor: '#f2f2f2',
                border: '1px solid #4a4a4a'
              }}
            >
              {({ blob, url, loading, error }) =>
                loading ? 'Cargando Documento...' : 'Descargar Reporte'
              }
            </PDFDownloadLink>
          </div>
          <br></br>
          <div>
            {' '}
            <h3>Gastos totales</h3>
            <br></br>
            <PDFDownloadLink
              document={
                <Document>
                  <Page size='A4' style={styles.page}>
                    <View style={styles.section}>
                      <Text>REPORTE DE GASTOS TOTALES</Text>
                    </View>
                    <View style={styles.section}>
                      <Text>Gastos: {totalGastos} Q</Text>
                    </View>
                    <View style={styles.section}>
                      <Text>Gastos Realizados</Text>
                      <Table data={arr3}>
                        <TableHeader>
                          <TableCell>Codigo</TableCell>
                          <TableCell>Descripcion</TableCell>
                          <TableCell>Monto</TableCell>
                          <TableCell>Fecha</TableCell>
                        </TableHeader>
                        <TableBody>
                          <DataTableCell getContent={r => r.codigo} />
                          <DataTableCell getContent={r => r.descripcion} />
                          <DataTableCell getContent={r => r.monto} />
                          <DataTableCell getContent={r => r.fecha} />
                        </TableBody>
                      </Table>
                    </View>
                  </Page>
                </Document>
              }
              fileName='ReporteGastos.pdf'
              style={{
                textDecoration: 'none',
                padding: '10px',
                color: '#4a4a4a',
                backgroundColor: '#f2f2f2',
                border: '1px solid #4a4a4a'
              }}
            >
              {({ blob, url, loading, error }) =>
                loading ? 'Cargando Documento...' : 'Descargar Reporte'
              }
            </PDFDownloadLink>
          </div>
          <br></br>
          <div>
            {' '}
            <h3>Asistentes Ordenados por Nacionalidad</h3>
            <br></br>
            <PDFDownloadLink
              document={
                <Document>
                  <Page size='A4' style={styles.page}>
                    <View style={styles.section}>
                      <Text>
                        REPORTE DE ASISTENTES ORDENADOS POR NACIONALIDAD
                      </Text>
                    </View>

                    <View style={styles.section}>
                      <Text>Asistentes</Text>
                      <Table data={arr5}>
                        <TableHeader>
                          <TableCell>Nombre</TableCell>
                          <TableCell>Dpi</TableCell>
                          <TableCell>Carne</TableCell>
                          <TableCell>Correo</TableCell>
                          <TableCell>Universidad</TableCell>
                          <TableCell>Nacionalidad</TableCell>
                        </TableHeader>
                        <TableBody>
                          <DataTableCell getContent={r => r.nombre} />
                          <DataTableCell getContent={r => r.dpi} />
                          <DataTableCell getContent={r => r.carne} />
                          <DataTableCell getContent={r => r.correo} />
                          <DataTableCell getContent={r => r.universidad} />
                          <DataTableCell getContent={r => r.nac} />
                        </TableBody>
                      </Table>
                    </View>
                  </Page>
                </Document>
              }
              fileName='asistentesNacionalidad.pdf'
              style={{
                textDecoration: 'none',
                padding: '10px',
                color: '#4a4a4a',
                backgroundColor: '#f2f2f2',
                border: '1px solid #4a4a4a'
              }}
            >
              {({ blob, url, loading, error }) =>
                loading ? 'Cargando Documento...' : 'Descargar Reporte'
              }
            </PDFDownloadLink>
          </div>
          <br></br>
          <div>
            {' '}
            <h3>Asistentes Ordenados por Universidad</h3>
            <br></br>
            <PDFDownloadLink
              document={
                <Document>
                  <Page size='A4' style={styles.page}>
                    <View style={styles.section}>
                      <Text>
                        REPORTE DE ASISTENTES ORDENADOS POR UNIVERSIDAD
                      </Text>
                    </View>

                    <View style={styles.section}>
                      <Text>Asistentes</Text>
                      <Table data={arr4}>
                        <TableHeader>
                          <TableCell>Nombre</TableCell>
                          <TableCell>Dpi</TableCell>
                          <TableCell>Carne</TableCell>
                          <TableCell>Correo</TableCell>
                          <TableCell>Universidad</TableCell>
                          <TableCell>Nacionalidad</TableCell>
                        </TableHeader>
                        <TableBody>
                          <DataTableCell getContent={r => r.nombre} />
                          <DataTableCell getContent={r => r.dpi} />
                          <DataTableCell getContent={r => r.carne} />
                          <DataTableCell getContent={r => r.correo} />
                          <DataTableCell getContent={r => r.universidad} />
                          <DataTableCell getContent={r => r.nac} />
                        </TableBody>
                      </Table>
                    </View>
                  </Page>
                </Document>
              }
              fileName='asistentesUniversidad.pdf'
              style={{
                textDecoration: 'none',
                padding: '10px',
                color: '#4a4a4a',
                backgroundColor: '#f2f2f2',
                border: '1px solid #4a4a4a'
              }}
            >
              {({ blob, url, loading, error }) =>
                loading ? 'Cargando Documento...' : 'Descargar Reporte'
              }
            </PDFDownloadLink>
          </div>
          <br></br>
        </div>
      </div>
    )
  }
}
