var express = require('express')
var router = express.Router()
var ingresoEgreso = require('../Estructuras JSON/ingresoEgreso.json')
var pago = require('../Estructuras JSON/ordenPago.json')
var fs = require('fs')

router.get('/', function (req, res) {
  res.send(ingresoEgreso)
})

router.post('/', function (req, res, next) {
  console.log('hola')
  var datos = req.body
  var control = false
  ingresoEgreso.push(datos)
  const gr = JSON.stringify(ingresoEgreso)
  fs.writeFileSync('Estructuras JSON/ingresoEgreso.json', gr, 'utf-8')
  res.sendStatus(220)

  control = true

  if ((control = true)) {
  }
})

router.delete('/', function (req, res) {
  const datos = req.body

  /* for (let i in ingresoEgreso) {
    if (datos.codigo == ingresoEgreso[i].codigo) {
      delete ingresoEgreso[i]
    
      res.sendStatus(220)

      break
    }
  } */

  ingresoEgreso = ingresoEgreso.filter(co => co.codigo !== datos.codigo)
  const gr = JSON.stringify(ingresoEgreso)
  fs.writeFileSync('Estructuras JSON/ingresoEgreso.json', gr, 'utf-8')

  pago = pago.filter(co => co.codigo !== datos.codigo)
  const gr1 = JSON.stringify(pago)
  fs.writeFileSync('Estructuras JSON/ordenPago.json', gr1, 'utf-8')
  res.sendStatus(220)

  /* for (let i in pago) {
    if (datos.codigo == pago[i].codigo) {
      delete pago[i]

      res.sendStatus(220)

      break
    }
  } */


})

module.exports = router
