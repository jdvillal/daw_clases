var express = require('express');
var router = express.Router();
const cors = require('cors');

const Producto = require('../models').producto;

// CORS is enabled for the selected origins
let corsOptions = {
    origin: [ 'http://localhost:4200', 'http://localhost:3000' ]
};

/* GET users listing. */

router.get('/', function(req, res, next) {
    res.send('respond with a api resource');
});

router.get('/productos',cors(corsOptions), function(req, res, next) {
    Producto.findAll({  
        attributes: { exclude: ["updatedAt"] }  
    })  
    .then(productos => {  
        res.json(productos); 
    })  
    .catch(error => res.status(400).send(error))
});

router.get('/productosr/:id',cors(corsOptions), function(req, res, next) {
    let producto_id = parseInt(req.params.id);
    Producto.findOne({ where: { id: producto_id } })
    .then(producto =>{
        res.json(producto);
    });

});

module.exports = router;