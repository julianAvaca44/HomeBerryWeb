//models/zone.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//objeto modelo de mongoose
var zoneSchema = new Schema({
 id: {type:String,index: {unique: true, dropDups: true}},
 nombre:{type: String,lowercase: true,index: {unique: true, dropDups: true} },
 descripcion: String,
 numero:  Number,
 cantDevices: { type: Number, default: 0 }
},{collection: 'zone'});

zoneSchema.methods.createId = function(){
	this.numero = Math.floor((Math.random() * 1000) + 1);
	this.id = 'Z'+ this.numero;
	return this.id
}

//Indicamos que podremos cargarlo de otro lugar 
module.exports = mongoose.model('zone', zoneSchema);
