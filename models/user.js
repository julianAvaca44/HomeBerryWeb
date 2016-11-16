//models/user.js

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
	telegramId: { type: String, default: "" },
	descripcion: String,
	numero:  { type: Number, default: 0 },
	coordSolicitadas: { type: String, default: "" },
	ultimaSolicitudCoordenadas: { type: Number, default: 0 },
	tc:{
		id:String,
		values:{}
	}
},{collection: 'users'});

//Indicamos que podremos cargarlo de otro lugar 
module.exports = mongoose.model('user', userSchema);
