var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

// creamos la variables mongoose y creamos el objeto de la clase schema
var ProveedorSchema = new mongoose.Schema({
    // tambien se pueden tipar con tn ts
    nombre :String,
    cif: {type: String, unique: true},
    domicilio: String,
    cp: Number,
    localidad: String,
    provincia:String,
    telefono:String,
    email: String,
    contacto:String,
});

ProveedorSchema.plugin(unique, {message: 'El CIF introducido ya existe'});
// para exportarlo
module.exports = mongoose.model('Proveedor', ProveedorSchema);