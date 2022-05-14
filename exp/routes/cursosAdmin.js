var express = require('express')
var router = express.Router()
var cursos = require('../Estructuras JSON/curso.json')
var datosUsuarios = require('../Estructuras JSON/usuario.json')
var cat = datosUsuarios.profesor

var fs = require('fs')

router.get('/', function (req, res) {
  const estado = true

  var b1 = req.query.busqueda1
  var b2 = req.query.busqueda2

  for (i in cursos) {
    if (
      b1 === cursos[i].codigo &&
      b2.toLowerCase() == cursos[i].seccion.toLowerCase()
    ) {
      res.send(cursos[i])
      estado = false
      break
    }
  }
})

router.put('/', function (req, res) {
  const datos = req.body
  var control = false
  console.log(datos.titular)
  for (let i in cat) {
    
    if (datos.titular === cat[i].nombre || datos.titular == '') {
      control = true
    }
    if(datos.titular === cat[i].nombreUsuario){
      control = true
      datos.titular = cat[i].nombre
    }
  }
  if (control === true) {
    for (let i in cursos) {
      if (
        datos.codigo === cursos[i].codigo &&
        datos.seccion === cursos[i].seccion
      ) {
        cursos[i].nombre = datos.nombre
        cursos[i].universidad = datos.universidad
        cursos[i].titular = datos.titular
        
        const gr = JSON.stringify(cursos)
        fs.writeFileSync('Estructuras JSON/curso.json', gr, 'utf-8')
        res.sendStatus(220)
      }
    }
  } else {
    res.sendStatus(221)
  }
})

router.delete('/', function (req, res) {
  const datos = req.body

  /*  for (let i in cursos) {
    if (
      datos.codigo === cursos[i].codigo &&
      datos.seccion === cursos[i].seccion
    ) {
      delete cursos[i]

      res.sendStatus(220)

      break
    }
  } */

  cursos = cursos.filter(co => {
    return co.codigo !== datos.codigo || co.seccion !== datos.seccion
  })
  const gr = JSON.stringify(cursos)
  fs.writeFileSync('Estructuras JSON/curso.json', gr, 'utf-8')
  res.sendStatus(220)
})

router.post('/', function (req, res, next) {
  var datos = req.body

  const control = false
  for (i in cat) {
    if (datos.titular === cat[i].nombre) {
      cursos.push(datos)
      const gr = JSON.stringify(cursos)
      fs.writeFileSync('Estructuras JSON/curso.json', gr, 'utf-8')
      res.sendStatus(220)
      control = true
      break
    }
  }

  if (control === false) {
    cursos.push(datos)
    const gr = JSON.stringify(cursos)
    fs.writeFileSync('Estructuras JSON/curso.json', gr, 'utf-8')
    res.sendStatus(220)
  }
})

module.exports = router
