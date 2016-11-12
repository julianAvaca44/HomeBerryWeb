//models/oauth.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//objeto modelo de mongoose
var oauthSchema = new Schema({
	usr: {type: String, index: {unique: true, dropDups: true}},
	pwd: String,
	token: { type: String, default: "" }
},{collection: 'oauth'});

//Indicamos que podremos cargarlo de otro lugar 
module.exports = mongoose.model('oauth', oauthSchema);
