var express = require('express')
var router = express.Router()
var cafe = require('../Estructuras JSON/cafe.json')
var entrega = require('../Estructuras JSON/entregas')
var fs = require('fs')


router.get('/', function (req, res) {
    res.send(entrega)
  })

module.exports = router
