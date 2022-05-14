var express = require('express')
var router = express.Router()
var inventario = require('../Estructuras JSON/bien.json')

router.get('/', function(req,res){
    const estado = true;
    console.log(req.query.busqueda)
    for(i in inventario){
        if(req.query.busqueda === inventario[i].codigo  ){
            console.log(i)
            res.send(inventario[i])
            estado = false;
        }
    }
    if(estado = true){
        res.sendStatus(500)
    }


    
})

module.exports = router;