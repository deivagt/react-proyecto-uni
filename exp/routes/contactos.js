var express = require('express')
var router = express.Router()

var contactos = require('../Estructuras JSON/contactos.json')


var fs = require('fs')

router.get('/', function (req, res) {
    res.send(contactos)
    console.log(contactos)
  })


  router.post('/', function (req, res, next) {
    var data = req.body

    var cod = Math.floor(Math.random() * (700000-240000 )) + 240000
    var codCont = cod.toString()


    var datos = {
        idContacto : codCont,
        nombre : data.nombre,
        telefono : data.telefono,
        correo : data.correo,
        direccion : data.direccion,
        rol : data.rol,
        oportunidades : data.oportunidades,
        encargado :data.encargado
    }

    contactos.push(datos)
    
    const gr = JSON.stringify(contactos)
    fs.writeFileSync('Estructuras JSON/contactos.json', gr, 'utf-8')
    res.sendStatus(220)
})
  
router.delete('/', function (req, res) {
    
    const datos = req.body

  
  
    /* for (let i in contactos) {
      if (datos.idContacto === contactos[i].idContacto) {
        delete contactos[i]
  
        res.sendStatus(220)
        
        break
      }
    } */ 
    contactos = contactos.filter(
      co => co.idContacto !== datos.idContacto
    )
    const gr = JSON.stringify(contactos)
    fs.writeFileSync('Estructuras JSON/contactos.json', gr, 'utf-8')
    res.sendStatus(220)
    
   
  })

module.exports = router;