'use strict';

/**
 * @ngdoc function
 * @name hBwebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hBwebApp
 */
angular.module('hBwebApp')
	.controller('NavBarCtrl',  ['$scope','$cookies','$state',function ($scope,$cookies,$state) {
	    var self = this;

	  	this.cookies = $cookies;
	  	this.state = $state;
	    this.checkAuth = function(){
	    	if(!this.cookies.get('token')){
		    	console.log('No existe TOKEN');
		    	this.state.go('login');
	    	}	
	    }
	    this.checkAuth();
	    this.logOut = function(){
	    	if(this.cookies.get('token')){
		    	this.cookies.remove('token');
		    }
	    	this.state.go('login');
	    }

	}]);