'use strict';

/**
 * @ngdoc function
 * @name hBwebApp.controller:AboutCtrl
 * @description
 * # DevicesCtrl
 * Controller of the hBwebApp
 */
angular.module('hBwebApp')
  .controller('DevicesCtrl',["$scope","$http", function ($scope,$http) {
    this.entity = [];
    var self = this;
    console.log("estoy en Devices");
    $http.get('/devices').then(function(response){
			self.entity = response.data;
			console.log(response);
		}, function(err){
			console.log(err);
		});
  }]);
