'use strict';

/**
 * @ngdoc function
 * @name hBwebApp.controller:ConfigAlarmCtrl
 * @description
 * # ConfigAlarmCtrl
 * Controller of the hBwebApp
 */
angular.module('hBwebApp')
  .controller('ConfigAlarmCtrl', ['$scope','$http',function ($scope,$http) {
  		this.entity = {};
	    var self = this;
	    this.api = $http;
	    console.log("estoy en Contingencias");

   		 this.getUser = function(){
	      this.api.get('/user').then(function(response){
	        self.entityUsers = response.data;
	        console.log(response);
	      }, function(err){
	        console.log(err);
	      });
	      console.log("getUser");  
	    };
    	
    	this.getUser(); 

  }]);