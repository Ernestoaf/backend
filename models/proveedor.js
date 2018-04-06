var mongoose = require('mongoose');

// creamos la variables mongoose y creamos el objeto de la clase schema
var ProveedorSchema = new mongoose.Schema({
    // tambien se pueden tipar con tn ts
    nombre :String,
    cif: String,
    domicilio: String,
    cp: Number,
    localidad: String,
    provincia:String,
    telefono:String,
    email: String,
    contacto:String,
});

// para exportarlo
module.exports = mongoose.model('Proveedor', ProveedorSchema);