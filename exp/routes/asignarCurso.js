var express = require('express')
var router = express.Router()
var asignacionCurso = require('../Estructuras JSON/asignacionCurso.json')
var fs = require('fs')

router.get('/', function (req, res, next) {
  const id = req.query

 console.log(asignacionCurso)
  var cursos = []
  for (i in asignacionCurso) {
    if (id.nick === asignacionCurso[i].nick) {
      cursos.push(asignacionCurso[i])
    }
  }
  if (!(cursos === null)) {
      console.log(cursos)
      res.send(cursos)
  }else{
      res.sendStatus(220)
  }
})

router.put('/', function (req, res, next) {
    var datos = req.body
    console.log(datos)
    var cod = Math.floor(Math.random() * (502000 - 400000)) + 400000
    var idAsig = cod.toString()
    var f = new Date()
    var nuevaAsig = {
      id: idAsig,
      idCurso: datos.codigo,
      nombreCurso: datos.nombreCurso,
      nick: datos.nick,
      seccionCurso: datos.seccionCurso
    }
  console.log(nuevaAsig)
    asignacionCurso.push(nuevaAsig)
    const gr = JSON.stringify(asignacionCurso)
    fs.writeFileSync('Estructuras JSON/asignacionCurso.json', gr, 'utf-8')
    res.sendStatus(220)
  })

module.exports = router
