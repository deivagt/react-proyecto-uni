var express = require('express')
var router = express.Router()
var asignacionCurso = require('../Estructuras JSON/asignacionCurso.json')
var fs = require('fs')

router.get('/', function (req, res, next) {
  res.send(asignacionCurso)
})

module.exports = router
