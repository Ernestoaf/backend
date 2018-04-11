var express = require('express');
var bodyParser = require('body-parser');

var proveedor = require('./routes/proveedor');

// objeto del propio servidor
var app = express();

var mongoose = require('mongoose');
// una promesa es parecido a un observable, esta esperando que se propduzcan cambios
mongoose.Promise = require('bluebird');

// vamos a poner un metodo para conectar con la base de datos
// el metodo recibe en primer lugar la ubicacion de la base de datos,
// y en segundo ligar le pasamos un obejto
mongoose.connect('mongodb://localhost:27017/erp', {
        promiseLibrary: require('bluebird')
    })
    // Si funciona la conexion
    .then(() => {
        console.log('Conectado a la DB')
    })
    // si no funciona la conexion
    .catch((err) => {
        console.error(err)
    });


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type,Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    next();
})

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({
    'extended': false
}));

// aqui vamos en el segundo parametro a proveedor routes (o eso creo)
app.use('/proveedor', proveedor);

app.listen(3000, function () {
    console.log("servidor ok on port 3000")
});