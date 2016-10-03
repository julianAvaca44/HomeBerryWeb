/*Routes*/
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

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
