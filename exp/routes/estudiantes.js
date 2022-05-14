var express = require('express')
var router = express.Router()
var datosUsuarios = require('../Estructuras JSON/usuario.json')
var student = datosUsuarios.estudiante


router.get('/', function(req, res, next) {
  
   res.send(student)
  });


module.exports = router