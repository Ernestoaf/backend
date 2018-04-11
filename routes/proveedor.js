var express = require('express');

var mongoose = require('mongoose');

// llamamos a la exportacion del modelo
var Proveedor = require('../models/proveedor.js');

var app = express();

// de momento ponemos las barras vacias, se podria decir que la ruta completa 
// viene del archivo app, en app.use('/proveedor', proveedor)

app.get('/', (req,res,next)=>{
    // buscaremos todos los proveedores
    Proveedor.find({}).exec((err,proveedores)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                mensaje:'Error de acceso a la BD',
                errores:err
            })
        }//fin if
        res.status(200).json({
            ok:true,
            proveedores:proveedores,
        });
    })
});
// metodo get para actualizar un solo proveedor
app.get('/:id', function(req,res,next){
    
    // var id=req.params.id;
    // coge el id que estamos pasando como aprametro en req.params.id y con el metodo findById bucaremos
    //  con ese id en proveedores, por lo que solo nos `puede devolver un proveedor
    Proveedor.findById(req.params.id,(err,proveedor)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                mensaje:'Error de acceso a DB',
                errores:err
            })
        }
        res.status(200).json({
            ok:true,
            proveedor:proveedor
        })
    })
})

//  le ponemos la ruta raiz ya que en el backend le añadiremos el archivo principal
// y le introducimos la funcion flecha que recibira req, res
app.post('/', (req, res) => {

    //almacenamos el cuerpo del mensaje
    var body = req.body;

    // creamos un objeto de la clase Proveedor
    var proveedor = new Proveedor({
        nombre: body.nombre,
        cif: body.cif,
        domicilio: body.domicilio,
        cp: body.cp,
        localidad: body.localidad,
        provincia: body.provincia,
        telefono: body.telefono,
        email: body.email,
        contacto: body.contacto,
    });

    // a este objeto le aplicamos el metodo de mongoose para guardar el obj en la bd
    // y llevara el primer parametro de error y el segundo el obejto guaradado
    proveedor.save((err, proveedorGuardado) => {

        if (err) {
            // si tenemos error al enviar el proveedor nos devolverar estas 3 variables de con datos del error
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el proveedor',
                errores: err
            });
        }// fin del if
        // si no hay error
        res.status(200).json({
            ok: true,
            proveedor: proveedorGuardado,
        });
    });
});

// Método put, actualizar contenido
app.put('/:id', function(req, res, next) {
    // Buscar por id y actualiza
    Proveedor.findByIdAndUpdate(req.params.id, req.body, function(err, datos) {
        // Si hay error
        if (err) return next(err);
        // Si no hay error
        res.status(201).json({
            ok: true,
            mensaje: 'Proveedor actualizado'
        });
    });
});

// Método delete, borrar contenido
app.delete('/:id', function(req, res, error) {
    // Buscar por id y borrar
    Proveedor.findByIdAndRemove(req.params.id, function(err, datos) {
        if (err) return next(err);
        res.status(201).json({
            ok: true,
            mensaje: 'Proveedor eliminado'
        });
    });
});

module.exports = app;