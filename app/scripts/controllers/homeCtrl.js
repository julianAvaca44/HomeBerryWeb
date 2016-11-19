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
  }]);
