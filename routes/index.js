/*Routes*/
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/devices', function(req, res) {
    var db = req.db;
    var collection = db.get('devices');
    collection.find({},{},function(e,docs){
        res.send(docs);
    });
});

router.get('/devices/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('devices');
    collection.findOne({id:req.params.id},{},function(e,docs){
        console.log(req.params.id);
        res.send(docs);
    });
});

router.get('/zone', function(req, res) {
    var db = req.db;
    var collection = db.get('zone');
    collection.find({},{},function(e,docs){
        res.send(docs);
    });
});

router.post('/zone', function(req, res) {
    var db = req.db;
    console.log(req.data);
    //console.log(req);
    console.log("**********************************");
    var zoneName = res.data.name;
    var zoneDescription = res.data.description;
    var collection = db.get('zone');
    var zoneNumber = collection.count();
    console.log({
        "id":"Z"+zoneNumber+1,
        "name" : zoneName,
        "description" : zoneDescription,
        "number": zoneNumber,
        "countOfDevices":0
    });
    console.log("------------------------------------------");
    collection.insert({
        "id":"Z"+zoneNumber+1,
        "name" : zoneName,
        "description" : zoneDescription,
        "number": zoneNumber,
        "countOfDevices":0
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            console.log(req.body);
            res.send("There was a problem adding the information to the database.");
            res.send(req);
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
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
