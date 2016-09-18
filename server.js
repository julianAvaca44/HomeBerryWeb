// importar
var express = require('express');
var path = require('path');

var mongoClient = require('mongodb').MongoClient;
var monk = require('monk');
var db = monk('mongodb://localhost:27017/homeBerryDB');

// instanciar
var app = express();
app.use(express.static(__dirname+ '/app'));
app.use('/bower_components',express.static(__dirname+ '/bower_components'));
var routes = require('./routes/index.js');

console.log(express.static(__dirname)); 
 
// escuchar
app.listen(9003, function(){
	console.log("Servidor Express escuchando en modo %s", app.settings.env);
	}); 
 
// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});


app.use('/', routes);

module.exports = app;
