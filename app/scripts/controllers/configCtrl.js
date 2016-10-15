/*config Ctrl*/
angular.module('hBwebApp')
  .controller('ConfigCtrl', ["$scope","$http","$mdDialog","$mdMedia", function ($scope,$http,$mdDialog,$mdMedia) {
    this.entity = {};
    var self = this;
    console.log("estoy en Config");
    this.getListWifi = function(){
    	$http.get('/listWifi').then(function(response){
	      self.net = response.data;
	      console.log(response);
	    }, function(err){
	        console.log(err);
	    });  
    }
    this.getListWifi();

    this.conect = function(){
    	console.log("CONECTATE ...")
    	console.log(this.entity);
    	$http.post('/conect',this.entity).then(function(response){
	          console.log(self);
	        }, function(err){
	          console.log("Err: POST");
	          console.log(err);
	        });
    }
    
  }]);