// importar
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
//var monk = require('monk');
var mongoose = require('mongoose');
//var db = monk('mongodb://localhost:27017/homeBerryDB');
var db = mongoose.connect('mongodb://localhost:27017/homeBerryDB');
var routes = require('./routes/index.js');
// instanciar
var app = express();


app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+ '/app'));
app.use('/bower_components',express.static(__dirname+ '/bower_components'));
// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});
app.use('/', routes);


console.log(express.static(__dirname));  

// escuchar
app.listen(9003, function(){
	console.log("Servidor Express escuchando 9003");
	console.log("Servidor Express escuchando en modo %s", app.settings.env);
	}); 

module.exports = app;
