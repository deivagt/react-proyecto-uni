var express = require('express')
var router = express.Router()
var noticia = require('../Estructuras JSON/noticia.json')


router.get('/', function(req, res, next) {
    res.send(noticia);
});

module.exports = router
