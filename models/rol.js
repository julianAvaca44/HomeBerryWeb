//models/rol.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//objeto modelo de mongoose
var rolSchema = new Schema({
	id: {type: String, index: {unique: true, dropDups: true}},
	rol: {type: String, index: {unique: true, dropDups: true}}
},{collection: 'roles'});
//Indicamos que podremos cargarlo de otro lugar 
module.exports = mongoose.model('rol', rolSchema);