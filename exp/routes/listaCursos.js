var express = require('express');
var router = express.Router();
var cursos = require('../Estructuras JSON/curso.json')

router.get('/', function (req, res) {
 
    res.send(cursos)
  })

module.exports = router