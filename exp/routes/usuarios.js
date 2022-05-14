var express = require('express')
var router = express.Router()

var usuarios = require('../Estructuras JSON/usuario.json')

router.get('/', function(req, res, next) {

    var todosUsuarios = []

    for(let i in usuarios.estudiante){
      
       todosUsuarios.push(usuarios.estudiante[i])
    }
    for(let i in usuarios.administrador){
      
        todosUsuarios.push(usuarios.administrador[i])
     }
     for(let i in usuarios.colaborador){
      
        todosUsuarios.push(usuarios.colaborador[i])
     }
     for(let i in usuarios.profesor){
      
        todosUsuarios.push(usuarios.profesor[i])
     }
     

    res.send(todosUsuarios);
});


module.exports = router