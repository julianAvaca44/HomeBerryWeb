/*Routes*/
var express = require('express');
var exec = require('child_process').exec;
var fs = require('fs');
var bodyParser = require('body-parser');
var router = express.Router();
var Zone = require('../models/zone.js');//Agregamos el modelo 
var User = require('../models/user.js');//Agregamos el modelo 
var Device = require('../models/device.js');//Agregamos el modelo 
var State = require('../models/state.js');//Agregamos el modelo 
var Rol = require('../models/rol.js');//Agregamos el modelo 
var TypeDevice = require('../models/typeDevice.js');//Agregamos el modelo 
var Oauth = require('../models/oauth.js');//Agregamos el modelo 
var nodemailer = require('nodemailer');

/*----- OAUTH -----*/
router.post('/oauth', function(req, res) {
    console.log("authentication : oauth");
    var authentication = new Oauth({
        usr:req.body.usr,
        pwd:req.body.pwd
    });
    console.log(authentication);
    Oauth.findOne({usr: authentication.usr, pwd: authentication.pwd }, function(err, user) {
      if (err) throw err;
      console.log("user found");
      var token = 'token-' ;
      for(i=10; i>=0;i--){
        token += String.fromCharCode(65 + i);
        token += Math.floor((Math.random() * 100920) + 1);
      }
      console.log('token:  '+token);
      console.log( user );
      user.token = token;
      user.save(function(err) {
        if (err) throw err;
        console.log("authentication successfully");
        res.send(token);
      });
    });
});

/*----- ROUTE ZONE INICIO -----*/
router.get('/zone', function(req, res) {
    console.log("GET : zone");
    Zone.find({}, function(err, zone) {
        if (err) throw err;
        console.log(zone);
        res.send(zone);
    });
});

router.post('/zone', function(req, res) {
    console.log("POST : zone");
    var newZone = new Zone({
        nombre:req.body.nombre,
        descripcion:req.body.descripcion
    });
    newZone.save(function(err) {
      if (err) throw err;
      res.send("successfully");
      console.log('Zone saved successfully!');
    });
});

router.put('/zone/:id', function(req, res) {
    console.log("PUT : zone/:%s",req.params.id);
    //TODO: falta hacer
    res.send("EN MANTENIMIENTO...");
});

router.delete('/zone/:id', function(req, res) {
    console.log("DELETE : zone/:%s",req.params.id);
    Zone.remove({ id: req.params.id }, function(err) {
      if (err) throw err;
      console.log('Zone successfully deleted!');
      res.send('Zone successfully deleted!');
    });   
});

router.get('/zone/:id', function(req, res) {
    console.log("GET : zone/:%s",req.params.id);
    Zone.find({ id: req.params.id }, function(err, zone) {
      if (err) throw err;
      console.log(zone);
      res.send(zone);
    });
});
/*----- ROUTE ZONE FIN -----*/

/*----- ROUTE USER INICIO -----*/
router.get('/user', function(req, res) {
    console.log("GET : user");
    User.find({}, function(err, user) {
        if (err) throw err;
        console.log(user);
        res.send(user);
    });

});

router.post('/user', function(req, res) {
    console.log("POST : User");
    console.log(req.body);
    var newUser = new User({
        dni:req.body.dni,
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        descripcion:req.body.descripcion,
        mail:req.body.mail,
        perfil:req.body.perfil,
        tc:{
            id:req.body.tc.id,
            values:req.body.tc.values},
        telefono:req.body.telefono
    });
    newUser.save(function(err) {
      if (err) throw err;
      console.log("function send mail");
      sendMail(newUser);

      res.send("successfully");
      console.log('User saved successfully!');
    });
});

router.put('/user/:dni', function(req, res) {
    console.log("PUT : user/:%s",req.params.dni);
    //TODO: falta hacer
    User.findOne({dni:req.params.dni}, function(err, user) {
        if (err) throw err;
        console.log(user);
        console.log()
        var newTc = false; 
        if (!(user.tc.id == req.body.tc.id)){
          newTc = true;
        }

        user.nombre = req.body.nombre;
        user.apellido = req.body.apellido;
        user.descripcion = req.body.descripcion;
        user.mail = req.body.mail;
        user.perfil = req.body.perfil;
        user.tc = {
            id:req.body.tc.id,
            values:req.body.tc.values};
        user.telefono = req.body.telefono;

        user.save(function(err) {
          if (err) throw err;
          
          if (newTc){
            console.log("function send mail");
            sendMail(user);  
          }
          res.send("successfully");
          console.log('User Update successfully!');
        });
    });
});

router.delete('/user/:dni', function(req, res) {
    console.log("DELETE : user/:%s",req.params.dni);
    User.remove({ dni: req.params.dni }, function(err) {
      if (err) throw err;
      console.log('User successfully deleted!');
      res.send('User successfully deleted!');
    });   
});

router.get('/user/:dni', function(req, res) {
    console.log("GET : user/:%s",req.params.dni);
    User.find({ dni: req.params.dni }, function(err, user) {
      if (err) throw err;
      console.log(user);
      res.send(user);
    });
});
/*----- ROUTE USER FIN -----*/


/*----- ROUTE DEVICE INICIO -----*/
router.get('/devices', function(req, res) {
    console.log("GET : devices");
    Device.find({}, function(err, device) {
        if (err) throw err;
        console.log(device);
        res.send(device);
    });

});

router.post('/devices', function(req, res) {
    console.log("POST : Device");
    console.log(req.body);
    var newDevice = new Device({
        nombre : req.body.nombre,
        descripcion : req.body.descripcion,
        Wifi : req.body.Wifi,
        idZona : req.body.idZona,
        tipo : req.body.tipo

    });
    if(!req.body.Wifi){
      newDevice.pin = req.body.pin;
    }else{
      newDevice.nombreWifi = req.body.nombreWifi;
    }

    Device.find({idZona:newDevice.idZona,tipo:newDevice.tipo}, function(err, devices) { 
        if (err) throw err;
        var number = 1;
         
        console.log(devices); 
        while(devices.find(function(devices){
              return devices.numero == number
            })){
          number++;
          console.log(number);
        }
        newDevice.numero = number;
        newDevice.save(function(err) {
          if (err) throw err;
          res.send("Device saved successfully!");
          console.log('Device saved successfully!');
        });
    });
    
});

router.put('/devices/:id', function(req, res) {
    console.log("PUT : devices/:%s",req.params.id);
    Device.findOne({id:req.params.id}, function(err, device) {
        if (err) throw err;
        console.log(device);
        device.nombre = req.body.nombre;
        device.descripcion = req.body.descripcion;
        device.idZona = req.body.idZona;
        device.pin = req.body.pin;
        device.tipo = req.body.tipo;

        device.save(function(err) {
          if (err) throw err;
          res.send("successfully");
          console.log('Device Update successfully!');
        });
    });
});

router.delete('/devices/:id', function(req, res) {
    console.log("DELETE : devices/:%s",req.params.id);
    Device.remove({ id: req.params.id }, function(err) {
      if (err) throw err;
      console.log('Device successfully deleted!');
      res.send('Device successfully deleted!');
    });   
});

router.get('/devices/:id', function(req, res) {
    console.log("GET : device/:%s",req.params.id);
    Device.find({ id: req.params.id }, function(err, device) {
      if (err) throw err;
      console.log(device);
      res.send(device);
    });
});

router.get('/devicesForZona/:zona', function(req, res) {
    console.log("GET : devicesForZona/: %s",req.params.zona);
    Device.find({ idZona: req.params.zona }, function(err, device) {
      if (err) throw err;
      console.log(device);
      res.send(device);
    });
});

/*----- ROUTE DEVICE FIN -----*/

/*----- ROUTE STATE INICIO -----*/
router.get('/state', function(req, res) {
    console.log("GET : state");
    State.find({}, function(err, state) {
        if (err) throw err;
        console.log(state);
        res.send(state);
    });
});

router.post('/state', function(req, res) {
    console.log("POST : State");
    console.log(req.body);
    var newState = new State({
        nombre : req.body.nombre,
        descripcion: req.body.descripcion,
        configEstado:  [],
        cantDevices: req.body.configEstado.length
    });

    req.body.configEstado.forEach(function(element,index,array){
        newState.configEstado.push(element);
    });

    newState.save(function(err) {
      if (err) throw err;
      res.send("State saved successfully!");
      console.log('State saved successfully!');
    });
});

router.put('/state/:nombre', function(req, res) {
    console.log("PUT : state/:%s",req.params.nombre);
    //TODO: falta hacer
    res.send("EN MANTENIMIENTO...");
});

router.delete('/state/:nombre', function(req, res) {
    console.log("DELETE : state/:%s",req.params.nombre);
    State.remove({ nombre: req.params.nombre }, function(err) {
      if (err) throw err;
      console.log('State successfully deleted!');
      res.send('State successfully deleted!');
    });   
});

router.get('/state/:nombre', function(req, res) {
    console.log("GET : state/:%s",req.params.nombre);
    State.find({ nombre: req.params.nombre }, function(err, state) {
      if (err) throw err;
      console.log(state);
      res.send(state);
    });
});
/*----- ROUTE DEVICE FIN -----*/




/*----- ROUTE LISTS AND OHTERS FUNCTIONS INICIO -----*/
router.get('/typeDevices', function(req, res) {
    console.log("GET : typeDevices");
    TypeDevice.find({}, function(err, typeDevice) {
        if (err) throw err;
        console.log(typeDevice);
        res.send(typeDevice);
    });
});

router.get('/tc', function(req, res) {
    var tc = {};
    tc.id = "tc - "+Math.floor((Math.random() * 100000) + 1);
    tc.values = {};
    for(i=8; i>=0;i--){
        var letra = String.fromCharCode(65 + i);
        for(j=9;j>0;j--){
            var value = Math.floor((Math.random() * 89) + 10);
            tc.values[letra + j] = value;
        }
    }
    res.send(tc);
});

router.get('/roles', function(req, res) {
    console.log("GET : rol");
    Rol.find({}, function(err, rol) {
        if (err) throw err;
        console.log(rol);
        res.send(rol);
    });
});

function sendMail(user){

  console.log("----- USER : "+user.dni);
  console.log("send Mail");
  console.log("transporter");
  var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'homeberry.ar@gmail.com', // Your email id
          pass: 'proyecto2016' // Your password
      }
  });

  console.log(templateMail(user));  
  console.log("mailOptions");
  var mailOptions = {
    from: '<homeberry.ar@gmail.com>', // sender address
    to: user.mail, // list of receivers
    subject: 'Nueva Tarjeta de coordenadas', // Subject line
    html: templateMail(user)//templateMail(user)
  // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
  };

   console.log("mail sending");
  
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log("---ERROR :");
        console.log(error);
        return error;
    }else{
        console.log('Message sent: ' + info.response);
        return info;
    };
  });              
}


function templateMail(user){
  console.log("***------- TC -------****\n\n");
  console.log(user.tc);
  var template = '<div><span><b>' + user.nombre + ' '+ user.apellido + ' tiene una nueva tarjeta de coordenadas: </b></span></div>';
  var tableTc = '<table style="border-collapse: collapse;"><thead><tr><td></td>';///tr><thead><tbody><tr></tr><tbody></table>';
  var tableHead = '';
  for(i=0; i<=8;i++){
        var letra = String.fromCharCode(65 + i);
        tableHead += '<td>' + letra + '</td>'
  }
  tableTc +=tableHead+ '</tr></thead><tbody style="color:white;">';        
  var tableRow = '';
  
  for(j=1;j<10;j++){
        if(j%2 == 0){
          tableRow +='<tr style="background-color:black;"><td style="background-color:white;color:black;border: 1px solid #438bca;">' + j + '</td>';
        }else{
          tableRow +='<tr style="background-color:#438bca;"><td style="background-color:white;color:black;border: 1px solid #438bca;">' + j + '</td>';  
        }
        //tableRow +='<tr><td>' + j + '</td>';
        for(i=0; i<=8;i++){
          var letra = String.fromCharCode(65 + i);          
          tableRow +='<td style="border: 1px solid #438bca;">' + user.tc.values[letra + j] + '</td>'
        }
        tableRow +='</tr>'
    }

  template += tableTc + tableRow + '</tbody></table>'   
  console.log("\n\n");
  return template;
}

module.exports = router;

//✔