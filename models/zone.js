//models/zone.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//objeto modelo de mongoose
var zoneSchema = new Schema({
 id: {type:String,index: {unique: true, dropDups: true}},
 nombre: String,
 descripcion: String,
 numero:  Number,
 cantDevices: Number
},{collection: 'zone'});

zoneSchema.methods.createId = function(){
	this.numero = Math.floor((Math.random() * 1000) + 1);
	this.id = 'Z'+ this.numero;
	this.cantDevices = 0;
	return this.id
}

//Indicamos que podremos cargarlo de otro lugar 
module.exports = mongoose.model('zone', zoneSchema);
