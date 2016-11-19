'use strict';

/**
 * @ngdoc function
 * @name hBwebApp.controller:ContingenciaCtrl
 * @description
 * # ContingenciaCtrl
 * Controller of the hBwebApp
 */
angular.module('hBwebApp')
  .controller('ContingenciasCtrl', ['$scope','$http',function ($scope,$http) {
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

    	this.getDevices = function(){
	      this.api.get('/devices').then(function(response){
	      self.entityDevices = response.data;
	      console.log(response);
	      }, function(err){
	        console.log(err);
	      });  
	    }
	    this.getDevices(); 
  }]);