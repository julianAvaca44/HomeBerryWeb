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

router.get('/zone/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('zone');
    collection.find({id:req.params.id},{},function(e,docs){
        res.send(docs);
    });
});


module.exports = router;
