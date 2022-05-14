var express = require('express')
var router = express.Router()
var contactos = require('../Estructuras JSON/contactos.json')

var fs = require('fs')

router.put('/', function (req, res, next) {
    
    var datos = req.body
   
    for (let i in contactos){
        if(datos.idContacto === contactos[i].idContacto){
           
            contactos[i].encargado = datos.nick
            
        }
    }
    const gr = JSON.stringify(contactos)
    fs.writeFileSync('Estructuras JSON/contactos.json', gr, 'utf-8')
    res.sendStatus(220)
  })

module.exports = router