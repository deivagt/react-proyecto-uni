var express = require('express')
var router = express.Router()

var datosUsuarios = require('../Estructuras JSON/usuario.json')

var ccafe = require('../Estructuras JSON/cafe.json')
var fs = require('fs')

var student = datosUsuarios.estudiante
var cat = datosUsuarios.profesor
var adm = datosUsuarios.administrador
var col = datosUsuarios.colaborador

router.get('/', function (req, res, next) {
  const datos = req.query

  var control = true

  if (control === true) {
    for (let i in col) {
      if (datos.nick === col[i].nombreUsuario) {
        control = false
        /* console.log(adm[i]) */
        res.send(col[i])
        break
      }
    }
  }
  if (control === true) {
    for (let i in adm) {
      if (datos.nick === adm[i].nombreUsuario) {
        control = false
        /* console.log(adm[i]) */
        res.send(adm[i])
        break
      }
    }
  }

  if (control === true) {
    for (let i in student) {
      if (datos.nick === student[i].nombreUsuario) {
        control = false
        res.send(student[i])
        break
      }
    }
  }
  if (control === true) {
    for (let i in cat) {
      if (datos.nick === cat[i].nombreUsuario) {
        control = false
        res.send(cat[i])
        break
      }
    }
  }

  if (control === true) {
    alert('no')
  }
})

router.post('/', function (req, res, next) {
  if (req.body.tipo_cuenta === 'estudiante') {
    const usr1 = {
      nombre: req.body.nombre,
      dpi: req.body.dpi,
      carne: req.body.carne,
      fechaNacimieno: req.body.fechaNac,
      celular: req.body.cel,
      correo: req.body.correo,
      universidad: req.body.uni,
      nac: req.body.nac,
      nombreUsuario: req.body.nick,
      contra: req.body.contra,
      tipo: req.body.tipo_cuenta,
      cafe: '2',
      almuerzo: '1',
      insumo: '1'
    }
    student.push(usr1)
    console.log(datosUsuarios)

    ccafe.cafe = ccafe.cafe + 2
    ccafe.almuerzo = ccafe.almuerzo + 1
    ccafe.insumo = ccafe.insumo +1
    const gr1 = JSON.stringify(ccafe)
    fs.writeFileSync('Estructuras JSON/cafe.json', gr1, 'utf-8')


    res.sendStatus(220)
  } else if (req.body.tipo_cuenta === 'profesor') {
    const usr = {
      nombre: req.body.nombre,
      dpi: req.body.dpi,
      carne: req.body.carne,
      fechaNacimieno: req.body.fechaNac,
      celular: req.body.cel,
      correo: req.body.correo,
      universidad: req.body.uni,
      nombreUsuario: req.body.nick,
      contra: req.body.contra,
      tipo: req.body.tipo_cuenta
    }
    cat.push(usr)
    console.log(datosUsuarios)
    res.sendStatus(220)
  } else if (req.body.tipo_cuenta === 'adm') {
    const usr = {
      nombre: req.body.nombre,

      fechaNacimieno: req.body.fechaNac,
      celular: req.body.cel,
      correo: req.body.correo,

      nombreUsuario: req.body.nick,
      contra: req.body.contra,
      puesto: req.body.puesto,
      tipo: req.body.tipo_cuenta
    }
    adm.push(usr)
    console.log(datosUsuarios)
    res.sendStatus(220)
  } else if (req.body.tipo_cuenta === 'col') {
    const usr = {
      nombre: req.body.nombre,
      carne: req.body.carne,
      fechaNacimieno: req.body.fechaNac,
      celular: req.body.cel,
      correo: req.body.correo,

      nombreUsuario: req.body.nick,
      contra: req.body.contra,
      tipo: req.body.tipo_cuenta
    }
    col.push(usr)
    console.log(datosUsuarios)

    ccafe.cafe = ccafe.cafe + 2
    const gr1 = JSON.stringify(ccafe)
    fs.writeFileSync('Estructuras JSON/cafe.json', gr1, 'utf-8')
    res.sendStatus(220)
  }

  const gr = JSON.stringify(datosUsuarios)
  fs.writeFileSync('Estructuras JSON/usuario.json', gr, 'utf-8')
})

router.put('/', function (req, res, next) {
  const datos = req.body

  var control = true

  if (control === true) {
    for (let i in adm) {
      if (datos.nick === adm[i].nombreUsuario) {
        control = false
        console.log(adm[i])

        adm[i].nombre = datos.nombre
        adm[i].fechaNacimiento = datos.fechaNac
        adm[i].celular = datos.cel
        adm[i].correo = datos.correo
        adm[i].nombreUsuario = datos.nick
        adm[i].contra = datos.contra
        adm[i].puesto = datos.puesto
        adm[i].tipo = datos.tipo

        break
      }
    }
  }

  if (control === true) {
    for (let i in student) {
      if (datos.nick === student[i].nombreUsuario) {
        console.log(student[i])

        student[i].nombre = req.body.nombre
        student[i].dpi = req.body.dpi
        student[i].carne = req.body.carne
        student[i].fechaNacimieno = req.body.fechaNac
        student[i].celular = req.body.cel
        student[i].correo = req.body.correo
        student[i].universidad = req.body.uni
        student[i].nac = req.body.nac
        student[i].nombreUsuario = req.body.nick
        student[i].contra = req.body.contra
        student[i].tipo = req.body.tipo

        break
      }
    }
  }
  if (control === true) {
    for (let i in cat) {
      if (datos.nick === cat[i].nombreUsuario) {
        control = false
        console.log(cat[i])

        student[i].nombre = req.body.nombre
        student[i].dpi = req.body.dpi
        student[i].carne = req.body.carne
        student[i].fechaNacimieno = req.body.fechaNac
        student[i].celular = req.body.cel
        student[i].correo = req.body.correo
        student[i].universidad = req.body.uni

        student[i].nombreUsuario = req.body.nick
        student[i].contra = req.body.contra
        student[i].tipo = req.body.tipo

        break
      }
    }
  }

  if (control === true) {
    for (let i in col) {
      if (datos.nick === col[i].nombreUsuario) {
        control = false

        col[i].nombre = req.body.nombre
        col[i].dpi = req.body.dpi
        col[i].carne = req.body.carne
        col[i].fechaNacimieno = req.body.fechaNac
        col[i].celular = req.body.cel
        col[i].correo = req.body.correo
        col[i].universidad = req.body.uni
        col[i].nombreUsuario = req.body.nick
        col[i].contra = req.body.contra
        col[i].tipo = req.body.tipo

        break
      }
    }
  }

  const gr = JSON.stringify(datosUsuarios)
  fs.writeFileSync('Estructuras JSON/usuario.json', gr, 'utf-8')
  res.sendStatus(220)
})

router.delete('/', function (req, res, next) {
  const datos = req.body

  var control = true

  datosUsuarios.administrador = datosUsuarios.administrador.filter(
    co => co.nombreUsuario !== datos.nick
  )
  console.log(datosUsuarios.administrador)

  datosUsuarios.colaborador = datosUsuarios.colaborador.filter(
    co => co.nombreUsuario !== datos.nick
  )
  console.log(datosUsuarios.colaborador)

  datosUsuarios.estudiante = datosUsuarios.estudiante.filter(
    co => co.nombreUsuario !== datos.nick
  )
  console.log(datosUsuarios.estudiante)

  datosUsuarios.profesor = datosUsuarios.profesor.filter(
    co => co.nombreUsuario !== datos.nick
  )
  console.log(datosUsuarios.profesor)

  const gr = JSON.stringify(datosUsuarios)
  fs.writeFileSync('Estructuras JSON/usuario.json', gr, 'utf-8')
  if (control === true) {
    res.sendStatus(220)
  }
})

module.exports = router
