/*Routes*/
var express = require('express');
var exec = require('child_process').exec;
var fs = require('fs');
var bodyParser = require('body-parser');
var router = express.Router();

/* GET home page. */
router.get('/listWifi', function(req, res) {
    console.log("GET : listWifi");
    var command = 'iwlist wlan0 scan';
     

     child = exec(command,
      function (error, stdout, stderr) {
        // nodejs error
        if (error !== null) {
          console.log('exec errosr: ' + error);
          res.send(error);
        }
        else {
          // save stdout to csv file
          fs.writeFile('example.csv', stdout, function (err) {
            if (err) {
              console.log(err);
              res.send(err);
            }
            else {
                var re = new RegExp('ESSID:"([a-zA-Z0-9]+)"',"gim");
                var match = {network:[]}; 
                var aux = re.exec(stdout);
                while(aux !== null){
                    console.log(match.network);
                    match.network.push(aux[1]);
                    aux = re.exec(stdout);
                }

                res.send(match);
                console.log('Saved!');
            }
          });
        }
      });     
});


router.post('/conect', function(req, res) {
    console.log("POST : conect");
    console.log(req.body);
    var password = req.body.password;
    var essid = req.body.essid;
    var command = 'sudo iwconfig wlan0 essid '+ essid +' key s:'+ password +'';
    
    child = exec(command,
      function (error, stdout, stderr) {
        // nodejs error
        if (error !== null) {
          console.log('exec errosr: ' + error);
          res.send(error);
        }
        else {
          // save stdout to csv file
          fs.writeFile('example.csv', stdout, function (err) {
            if (err) {
              console.log(err);
              res.send(err);
            }
            else {
                //que hago una vez q configura --- dhclient wlan0
                console.log("CONFIGURE VOY A PEDIR LA IP");
                child2 = exec('sudo dhclient wlan0', function (error, stdout, stderr) {
                    if (error !== null) {
                      console.log('exec errosr: ' + error);
                      res.send(error);
                    }
                });
            }
          });
        }
      });     
});



/* GET home page. */
router.get('/devices', function(req, res) {
    console.log("GET : devices");
    var db = req.db;
    var collection = db.get('devices');
    collection.find({},{},function(e,docs){
        res.send(docs);
    });
});

router.post('/devices', function(req, res) {
    console.log("POST : devices");
    
    getZone(req,res,postDevices);
});

router.get('/devices/:id', function(req, res) {
    console.log("GET : devices/:%s",req.params.id);
    var db = req.db;
    var collection = db.get('devices');
    collection.findOne({id:req.params.id},{},function(e,docs){
        console.log(req.params.id);
        res.send(docs);
    });
});

router.delete('/devices/:id', function(req, res) {
    console.log("DELETE : devices/:%s",req.params.id);
    var db = req.db;
    var collection = db.get('devices');
    var count = db.get('counterDevices'); 
    count.findOneAndUpdate(
            { id: "deviceId" },
            { $inc: { seq: -1 } },//estaba en menos uno pero genera bug gigante!!
            {},
            function (error, ret) {
                collection.remove({id:req.params.id},{},function(e,docs){
                    res.send(docs);
                });  
            });   
});

router.get('/typeDevices', function(req, res) {
    console.log("GET : typeDevices");
    var db = req.db;
    var collection = db.get('typeDevices');
    collection.find({},{},function(e,docs){
        res.send(docs);
    });
});

router.get('/zone', function(req, res) {
    console.log("GET : zone");
    var db = req.db;
    var collection = db.get('zone');
    collection.find({},{},function(e,docs){
        res.send(docs);
    });
});

router.post('/zone', function(req, res) {
    console.log("POST : zone");
    var db = req.db;
    var zoneName = req.body.name;
    var zoneDescription = req.body.description;
    var collection = db.get('zone');
    var count = db.get('counterZone'); 
    count.findOneAndUpdate(
            { id: "zoneId" },
            { $inc: { seq: 1 } },
            {},
            function (error, ret) {
        var zoneNumber = ret.seq;
        collection.insert({
            "id":"Z"+zoneNumber,
            "name" : zoneName,
            "description" : zoneDescription,
            "number": zoneNumber,
            "countOfDevices":0
        }, function (err, doc) {
                if (err) {
                    // If it failed, return error
                    res.send("There was a problem adding the information to the database.");
                    res.send(err);
                }
                else {
                    // Return the object created
                    res.send(doc);
                }
        });
    });    
});

router.put('/zone/:id', function(req, res) {
    console.log("PUT : zone/:%s",req.params.id);
});

router.delete('/zone/:id', function(req, res) {
    console.log("DELETE : zone/:%s",req.params.id);
    var db = req.db;
    var collection = db.get('zone');
    var count = db.get('counterZone'); 
    count.findOneAndUpdate(
            { id: "zoneId" },
            { $inc: { seq: 0 } },//estaba en menos uno pero genera bug gigante!!
            {},
            function (error, ret) {
                collection.remove({id:req.params.id},{},function(e,docs){
                    res.send(docs);
                });  
            });   
});

router.get('/zone/:id', function(req, res) {
    console.log("GET : zone/:id");
    getZone(req, res , function(req,res,docs){
        res.send(docs);
    });
});

router.get('/user', function(req, res) {
    var db = req.db;
    var collection = db.get('user');
    collection.find({},{},function(e,docs){
        res.send(docs);
    });
});

router.get('/user/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('user');
    collection.findOne({id:req.params.id},{},function(e,docs){
        console.log(req.params.id);
        res.send(docs);
    });
});

router.delete('/user/:id', function(req, res) {
    console.log("DELETE : user/:%s",req.params.id);
    var db = req.db;
    var collection = db.get('user');
    collection.remove({dni:req.params.id},{},function(e,docs){
        res.send(docs);
    });  
});

router.put('/user/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('user');
    collection.find({},{},function(e,docs){
        res.send(docs);
    });
});

router.post('/user', function(req, res) {
    var db = req.db;
    var userDni = req.body.dni;
    var userNombre = req.body.nombre;
    var userApellido = req.body.apellido;
    var userMail = req.body.mail;
    var userTelefono = req.body.telefono;
    var userPerfil = req.body.perfil;
    var userWifi = req.body.wifi;
    var userNombreWifi = req.body.nombreWifi;
    var userAccionadoSensor = req.body.accionadoSensor;
    var userTc = req.body.tc;
    var collection = db.get('user');
    
    collection.insert({
        "dni" : userDni,
        "nombre" : userNombre,
        "apellido" : userApellido,
        "mail" : userMail,
        "telefono": userTelefono,
        "perfil":userPerfil,
        "tc":userTc,
        "wifi": userWifi,
        "nombreWifi": userNombreWifi,
        "accionadoSensor": userAccionadoSensor
    }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
                res.send(err);
            }
            else {
                // Return the object created
                res.send(doc);
            }
    });
});


router.get('/tc', function(req, res) {
    var tc = {};
    tc.id = "tc - "+Math.floor((Math.random() * 100000) + 1);;
    tc.values = {};

    for(i=0; i<=8;i++){
        var letra = String.fromCharCode(65 + i);
        for(j=1;j<10;j++){
            var value = Math.floor((Math.random() * 100) + 1);
            tc.values[letra + j] = value;
        }
    }
    res.send(tc);
        
});

router.get('/roles', function(req, res) {
     console.log("GET : roles");
    var db = req.db;
    var collection = db.get('roles');
    collection.find({},{},function(e,docs){
        res.send(docs);
    }); 
});

router.get('/state', function(req, res) {
     console.log("GET : state");
    var db = req.db;
    var collection = db.get('state');
    collection.find({},{},function(e,docs){
        res.send(docs);
    }); 
});

router.delete('/state/:nombre', function(req, res) {
    console.log("DELETE : state/:%s",req.params.nombre);
    var db = req.db;
    var collection = db.get('state');
    collection.remove({nombre:req.params.nombre},{},function(e,docs){
        res.send(docs);
    });  
});

function getZone(req,res, callback){
    var db = req.db;
    var collection = db.get('zone');
    console.log(req.method);
    console.log("GET ZONE_ :ID:");
    var idZone;
    console.log(req.params.id);
    if(req.method === 'POST'){
        idZone = req.body.zone;
    }else{
        idZone = req.params.id;
    }

    collection.findOne({id:idZone},{},function(e,docs){
        if(callback !== undefined){
            callback(req,res,docs);
        }
        console.log("return");
        return docs;
    });
}

function postDevices(req,res,zone){
    console.log("postDevices!!");
    var db = req.db;
    var deviceZoneId = zone.id;
    var deviceZoneName = zone.name;
    var deviceName = req.body.name;
    var deviceType = req.body.type;
    var devicePin = req.body.pin;
    var deviceDescription = req.body.description;
    var collection = db.get('devices');
    var count = db.get('counterDevices'); 
    count.findOneAndUpdate(
            { id: "deviceId" },
            { $inc: { seq: 1 } },
            {},
            function (error, ret) {
        var deviceNumber = ret.seq;
        collection.insert({
            "id":deviceZoneId+"D"+deviceNumber,
            "name" : deviceName,
            "description" : deviceDescription,
            "number": deviceNumber,
            "pin":devicePin,
            "zone":deviceZoneName,
            "type":deviceType,
            "state":0
        }, function (err, doc) {
                if (err) {
                    // If it failed, return error
                    res.send("There was a problem adding the information to the database.");
                    res.send(err);
                }
                else {
                    // Return the object created
                    res.send(doc);
                }
        });
    }); 
}


module.exports = router;
