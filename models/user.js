//models/zone.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//objeto modelo de mongoose
var userSchema = new Schema({
	dni: {type: String, index: {unique: true, dropDups: true}},
	nombre: String,
	apellido: String,
	mail: String,
	telefono: Number,
	perfil: String,
	wifi: Boolean,
	descripcion: String,
	numero:  Number,
	cantDevices: Number,
	accionadoSensor: String,
	nombreWifi: String,
	coordSolicitadas: Number,
	ultimaSolicitudCoordenadas: String
},{collection: 'users'});

//Indicamos que podremos cargarlo de otro lugar 
module.exports = mongoose.model('user', userSchema);
