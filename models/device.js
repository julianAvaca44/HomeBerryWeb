//models/device.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Zone = require('./zone.js');//Agregamos el modelo
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

// on every save, add the date
deviceSchema.pre('save', function(next) {
  self = this;
  console.log("zona del device:" +this.idZona);
  Zone.findOne({nombre:this.idZona}, function(err, zone) {
        if (err) throw err;
        console.log(zone);
  		self.id = 'D'+ self.numero;
  		self.id = self.id +''+ zone.id;
  		next();
   });
  
});

//Indicamos que podremos cargarlo de otro lugar 
module.exports = mongoose.model('device', deviceSchema);