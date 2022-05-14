var express = require('express')
var router = express.Router()

var mensajes = require('../Estructuras JSON/mensaje.json')

var fs = require('fs')

router.get('/', function (req, res, next) {
  var mensajesS = []
  var usuario = req.query

  for (let i in mensajes) {
    if (
      usuario.nick === mensajes[i].destinatario ||
      usuario.nick === mensajes[i].envio || mensajes[i].destinatario ==="todosAdmin"||
       mensajes[i].destinatario === "todosCol"
    ) {
   
      mensajesS.push(mensajes[i])
    }
  }

  res.send(mensajesS)
})

router.post('/', function (req, res, next) {
  var data = req.body

  var nm = {
    idMensaje: (
      Math.floor(Math.random() * (700000 - 500000)) + 500000
    ).toString(),
    envio: data.envio,
    destinatario: data.destinatario,
    cuerpo: data.cuerpo
  }

  console.log(nm)
  mensajes.push(nm)
  const gr = JSON.stringify(mensajes)
  fs.writeFileSync('Estructuras JSON/mensaje.json', gr, 'utf-8')
  res.sendStatus(220)
})

module.exports = router
