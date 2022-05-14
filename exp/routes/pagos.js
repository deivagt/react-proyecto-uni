var express = require('express')
var router = express.Router()
var pago = require('../Estructuras JSON/ordenPago.json')
var ingresoEgreso = require('../Estructuras JSON/ingresoEgreso.json')
var fs = require('fs')

router.put('/', function (req, res, next) {
  var datos = req.body
  var cod = Math.floor(Math.random() * (382000 - 300000)) + 300000
  var codFactura = cod.toString()
  var f = new Date()
  var control = true
  for(let i in pago){
    if(pago[i].carne === datos.carne){
      control = false
    }
  }
  if(control === true){
    var nuevoPago = {
      carne: datos.carne,
      monto: datos.monto,
      codigo: codFactura,
      fecha: f.getDate() + '-' + (f.getMonth() + 1) + '-' + f.getFullYear(),
      tipo: 'ingreso',
      descripcion: datos.descripcion
    }
  
    pago.push(nuevoPago)
    const gr = JSON.stringify(pago)
    fs.writeFileSync('Estructuras JSON/ordenPago.json', gr, 'utf-8')
    res.sendStatus(220)
  }else{
    res.sendStatus(221)
  }
  
})

router.get('/', function (req, res) {
  var pagos = []
  for (let i in pago) {
    pagos.push(pago[i])
    
      
  }

  for (let i in ingresoEgreso) {
    pagos.push(ingresoEgreso[i])
  }
  console.log(pagos)
  res.send(pagos)
})

module.exports = router
