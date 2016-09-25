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

router.get('/devices/:id', function(req, res) {
    console.log("GET : devices/:%s",req.params.id);
    var db = req.db;
    var collection = db.get('devices');
    collection.findOne({id:req.params.id},{},function(e,docs){
        console.log(req.params.id);
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

router.delete('/zone/:id', function(req, res) {
    console.log("DELETE : zone/:%s",req.params.id);
    var db = req.db;
    var collection = db.get('zone');
    var count = db.get('counterZone'); 
    count.findOneAndUpdate(
            { id: "zoneId" },
            { $inc: { seq: -1 } },
            {},
            function (error, ret) {
                collection.remove({id:req.params.id},{},function(e,docs){
                    res.send(docs);
                });  
            });   
});

router.get('/zone/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('zone');
    collection.find({id:req.params.id},{},function(e,docs){
        res.send(docs);
    });
});

module.exports = router;
