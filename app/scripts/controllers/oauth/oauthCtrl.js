/*controller logIn*/

'use strict';

/**
 * @ngdoc function
 * @name hBwebApp.controller:OauhtCtrl
 * @description
 * # DevicesCtrl
 * Controller of the hBwebApp
 */
angular.module('hBwebApp')
  .controller('OauhtCtrl',["$scope","$state","$http","$mdDialog","$mdMedia","$cookies" ,function ($scope,$state,$http,$mdDialog,$mdMedia,$cookies) {
    this.entity = {};
    this.cookies = $cookies;
    this.http = $http;
    //
    var self = this;
    console.log("estoy en LOGIN");

    this.login = function(){
    	console.log(self.entity);
        self.errMsj = undefined;
		self.http.post('/oauth',self.entity).then(function(response){
			self.token = response.data;
			self.cookies.put('token', self.token);		
			console.log(response);
			$state.go('main.home');
		}, function(err){
	       console.log(err);
           if(err.status == 401){
                self.errMsj = err.data;
           }
		});  
    };
}]);