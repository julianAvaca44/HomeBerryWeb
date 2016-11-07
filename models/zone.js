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

//Indicamos que podremos cargarlo de otro lugar 
var zoneModel = mongoose.model('zone', zoneSchema);
module.exports = zoneModel;

zoneSchema.pre('save', function(next) {
	console.log(this);
	var self = this;
	zoneModel.find({}, function(err, zone) {
		if (err) throw err;
        var number = 1;
        console.log(zone); 
        while(zone.find(function(zone){
              return zone.numero == number
            })){
          number++;
          console.log(number);
        }
        self.numero = number;
        self.id = 'Z'+ self.numero;
        next();
	});
});

