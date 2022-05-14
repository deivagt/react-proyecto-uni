var express = require('express')
var router = express.Router()

var datosUsuarios = require('../Estructuras JSON/usuario.json')
var student = datosUsuarios.estudiante
var cat = datosUsuarios.profesor
var adm = datosUsuarios.administrador
var col = datosUsuarios.colaborador

/* GET users listing. */

router.post('/', function (req, res, next) {
  const datos = { nick: req.body.nick, contra: req.body.contra }

  console.log(datos)
  var control = true

  if (control === true) {
    for (let i in adm) {
      if (
        datos.nick === adm[i].nombreUsuario &&
        datos.contra === adm[i].contra
      ) {
        control = false
        res.sendStatus(221)
        break
      }
    }
  }

  if (control === true) {
    for (let i in col) {
      if (
        datos.nick === col[i].nombreUsuario &&
        datos.contra === col[i].contra
      ) {
        control = false
        res.sendStatus(222)
        break
      }
    }
  }

  if (control === true) {
    for (let i in student) {
      if (
        datos.nick === student[i].nombreUsuario &&
        datos.contra === student[i].contra
      ) {
        control = false
        res.sendStatus(223)
        break
      }
    }
  }
  if (control === true) {
    for (let i in cat) {
      if (
        datos.nick === cat[i].nombreUsuario &&
        datos.contra === cat[i].contra
      ) {
        control = false
        res.sendStatus(224)
        break
      }
    }
  }

  if (control === true) {
    res.sendStatus(220)
  }
})

module.exports = router
