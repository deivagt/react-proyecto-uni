var express = require('express')
var router = express.Router()
var datosUsuarios = require('../Estructuras JSON/usuario.json')
var admin = datosUsuarios.administrador

router.get('/', function(req, res, next) {
  console.log(admin)
    res.send(admin)
   });
 


module.exports = router