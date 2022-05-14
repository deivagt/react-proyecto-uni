var express = require('express')
var router = express.Router()
var cafe = require('../Estructuras JSON/cafe.json')
var entrega = require('../Estructuras JSON/entregas')
var datosUsuarios = require('../Estructuras JSON/usuario.json')
var student = datosUsuarios.estudiante

var fs = require('fs')

router.get('/', function (req, res) {
  res.send(cafe)
})

router.post('/', function (req, res, next) {
  var data = req.body
  var f = new Date()
  if (data.tipoEntrega === 'cafe') {
    for (let i in student) {
      if (data.nick === student[i].nombreUsuario) {
        if (student[i].cafe > 0) {
          control = false

          var dato = {
            tipoEntrega: data.tipoEntrega,
            nick: data.nick,
            nombreEst: data.nombreEst,
            descripcion: data.descripcion,
            cantidad: data.cantidad,
            fecha: f.getDate() + '-' + (f.getMonth() + 1) + '-' + f.getFullYear() +' | ' + f.getHours() + ':'+ f.getMinutes(),
          }
          entrega.push(dato)
          const gr = JSON.stringify(entrega)
          fs.writeFileSync('Estructuras JSON/entregas.json', gr, 'utf-8')

          datosUsuarios.estudiante[i].cafe = (
            datosUsuarios.estudiante[i].cafe - 1
          ).toString()
          const gr1 = JSON.stringify(datosUsuarios)
          fs.writeFileSync('Estructuras JSON/usuario.json', gr1, 'utf-8')

          cafe.cafe = cafe.cafe - 1
          if (cafe.cafe >= 0) {
            const gr2 = JSON.stringify(cafe)
            fs.writeFileSync('Estructuras JSON/cafe.json', gr2, 'utf-8')
            res.sendStatus(220)
          } else {
            res.sendStatus(222)
          }

          res.sendStatus(220)
          break
        } else {
          res.sendStatus(221)
          break
        }
      }
    }
  }
  if (data.tipoEntrega === 'almuerzo') {
    for (let i in student) {
      if (data.nick === student[i].nombreUsuario) {
        if (student[i].almuerzo > 0) {
          control = false
          var dato = {
            tipoEntrega: data.tipoEntrega,
            nick: data.nick,
            nombreEst: data.nombreEst,
            descripcion: data.descripcion,
            cantidad: data.cantidad
          }
          entrega.push(dato)
          const gr = JSON.stringify(entrega)
          fs.writeFileSync('Estructuras JSON/entregas.json', gr, 'utf-8')

          datosUsuarios.estudiante[i].almuerzo = (
            datosUsuarios.estudiante[i].almuerzo - 1
          ).toString()
          const gr1 = JSON.stringify(datosUsuarios)
          fs.writeFileSync('Estructuras JSON/usuario.json', gr1, 'utf-8')

          cafe.almuerzo = cafe.almuerzo - 1

          if (cafe.almuerzo >= 0) {
            const gr2 = JSON.stringify(cafe)
            fs.writeFileSync('Estructuras JSON/cafe.json', gr2, 'utf-8')
            res.sendStatus(220)
          } else {
            res.sendStatus(222)
          }

          res.sendStatus(220)
          break
        } else {
          res.sendStatus(221)
          break
        }
      }
    }
  }
  if (data.tipoEntrega === 'insumo') {
    for (let i in student) {
      if (data.nick === student[i].nombreUsuario) {
        if (student[i].insumo > 0) {
          control = false

          var dato = {
            tipoEntrega: data.tipoEntrega,
            nick: data.nick,
            nombreEst: data.nombreEst,
            descripcion: data.descripcion,
            cantidad: data.cantidad
          }
          entrega.push(dato)
          const gr = JSON.stringify(entrega)
          fs.writeFileSync('Estructuras JSON/entregas.json', gr, 'utf-8')

          datosUsuarios.estudiante[i].insumo = (
            datosUsuarios.estudiante[i].insumo - 1
          ).toString()
          const gr1 = JSON.stringify(datosUsuarios)
          fs.writeFileSync('Estructuras JSON/usuario.json', gr1, 'utf-8')

          cafe.insumo = cafe.insumo - 1
          if (cafe.insumo >= 0) {
            const gr2 = JSON.stringify(cafe)
            fs.writeFileSync('Estructuras JSON/cafe.json', gr2, 'utf-8')
            res.sendStatus(220)
          } else {
            res.sendStatus(222)
          }

          break
        } else {
          res.sendStatus(221)
          break
        }
      }
    }
  }

  console.log(data)
})

router.put('/', function (req, res, next) {
  var data = req.body

  if (data.tipoEntrega === 'cafe') {
    cafe.cafe = Number(data.cantidadEntrega)
    console.log(cafe)
    const gr2 = JSON.stringify(cafe)
    fs.writeFileSync('Estructuras JSON/cafe.json', gr2, 'utf-8')
    res.sendStatus(220)
  } else if (data.tipoEntrega === 'almuerzo') {
    cafe.almuerzo = Number(data.cantidadEntrega)
    console.log(cafe)
    const gr2 = JSON.stringify(cafe)
    fs.writeFileSync('Estructuras JSON/cafe.json', gr2, 'utf-8')
    res.sendStatus(220)
  } else if (data.tipoEntrega === 'insumo') {
    cafe.insumo = Number(data.cantidadEntrega)
    console.log(cafe)
    const gr2 = JSON.stringify(cafe)
    fs.writeFileSync('Estructuras JSON/cafe.json', gr2, 'utf-8')
    res.sendStatus(220)
  } else {
    res.sendStatus(221)
  }
})

router.delete('/', function (req, res) {})

module.exports = router
