//models/typeDevice.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//objeto modelo de mongoose
var typeDeviceSchema = new Schema({
	id: {type: String, index: {unique: true, dropDups: true}},
	name: {type: String, index: {unique: true, dropDups: true}}
},{collection: 'typeDevices'});
//Indicamos que podremos cargarlo de otro lugar 
module.exports = mongoose.model('typeDevice', typeDeviceSchema);