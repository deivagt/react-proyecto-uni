var express = require('express')
var router = express.Router()
var inventario = require('../Estructuras JSON/bien.json')
var cafe = require('../Estructuras JSON/cafe.json')
var fs = require('fs')

router.get('/', function (req, res) {
var envio = {
  inventario :'',
  cafe: ''
}

envio.inventario = inventario
envio.cafe = cafe
  console.log(envio)
  res.send(envio)
  
})

router.post('/', function (req, res, next) {
    var data = req.body
    inventario.push(data)
    const gr = JSON.stringify(inventario)
    fs.writeFileSync('Estructuras JSON/bien.json', gr, 'utf-8')
    res.sendStatus(220)
})

router.put('/', function (req, res) {
  const datos = req.body
 
  var control = true

  for (let i in inventario) {
    if (datos.codigo === inventario[i].codigo) {
      inventario[i].nombre = datos.nombre
      inventario[i].descripcion = datos.descripcion
      inventario[i].cantidad = datos.cantidad
      inventario[i].personaEnc = datos.personaEnc
      inventario[i].ubi = datos.ubi
      inventario[i].estado = datos.estado
      res.sendStatus(220)
      break
    }
  }
  const gr = JSON.stringify(inventario)
  fs.writeFileSync('Estructuras JSON/bien.json', gr, 'utf-8')
  
})

router.delete('/', function (req, res) {
  const datos = req.body


  /* for (let i in inventario) {
    if (datos.codigo === inventario[i].codigo) {
      delete inventario[i]

      res.sendStatus(220)
      
      break
    }
  } */

  inventario = inventario.filter(
    co => co.codigo !== datos.codigo
  )
  const gr = JSON.stringify(inventario)
  fs.writeFileSync('Estructuras JSON/bien.json', gr, 'utf-8')
  res.sendStatus(220)
})

module.exports = router
