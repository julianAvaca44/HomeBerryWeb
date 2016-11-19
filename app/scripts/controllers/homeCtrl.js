'use strict';

/**
 * @ngdoc function
 * @name hBwebApp.controller:AboutCtrl
 * @description
 * # HomeCtrl
 * Controller of the hBwebApp
 */
angular.module('hBwebApp')
  .controller('HomeCtrl', ['$scope','$cookies','$state',function ($scope,$cookies,$state) {
  	var self = this;
  	this.cookies = $cookies;
  	this.state = $state;
    if(!this.cookies.get('token')){
    	console.log('No existe TOKEN');
    	this.state.go('login');
    }

  }]);
