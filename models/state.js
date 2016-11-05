//models/state.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//objeto modelo de mongoose
var stateSchema = new Schema({
	nombre: {type:String,index: {unique: true, dropDups: true}},
	descripcion: String,
	configEstado:  [{
		device: String,
		estado: Boolean,
		zona: String
	}],
	cantDevices: Number
},{collection: 'states'});


//Indicamos que podremos cargarlo de otro lugar 
module.exports = mongoose.model('state', stateSchema);
