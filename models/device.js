//models/device.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//objeto modelo de mongoose
var deviceSchema = new Schema({
	id : {type:String,index: {unique: true, dropDups: true}},
	nombre : String,
	descripcion : String,
	numero : { type: Number, default: 0 },
	pin : Number,
	idZona : String,
	tipo : String,
	estado : { type: Number, default: 0 },
	Wifi:  { type: Boolean, default: false},
	accionadoSensor: { type: String, default: ""},
	nombreWifi: { type: String, default: ""},
},{collection: 'devices'});

deviceSchema.methods.createId = function(){
	this.numero = Math.floor((Math.random() * 1000) + 1);
	this.id = 'D'+ this.numero;
	return this.id
}

//Indicamos que podremos cargarlo de otro lugar 
module.exports = mongoose.model('device', deviceSchema);