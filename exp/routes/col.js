var express = require('express')
var router = express.Router()
var datosUsuarios = require('../Estructuras JSON/usuario.json')
var col = datosUsuarios.colaborador

router.get('/', function(req, res, next) {
  console.log(col)
    res.send(col)
   });
 


module.exports = router