'use strict';

/**
 * @ngdoc function
 * @name hBwebApp.controller:AboutCtrl
 * @description
 * # DevicesCtrl
 * Controller of the hBwebApp
 */
angular.module('hBwebApp')
  .controller('DevicesCtrl',["$scope","$http","$mdDialog","$mdMedia", function ($scope,$http,$mdDialog,$mdMedia) {
    this.entity = [];
    var self = this;
    console.log("estoy en Devices");

    this.status = '  ';
    this.customFullscreen = false;

    this.addDevices = function(ev) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      $mdDialog.show({
        controller: DialogController,
        controllerAs: 'vmDialog',
        templateUrl: '../views/partials/devices.create.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      })
      .then(function(answer) {
        self.status = 'You said the information was "' + answer + '".';
      }, function() {
        self.status = 'You cancelled the dialog.';
      });
      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        self.customFullscreen = (wantsFullScreen === true);
      });
    };

    function DialogController($scope, $mdDialog) {
      this.entity = {};
      this.hide = function() {
        $mdDialog.hide();
      };
      
      this.cancel = function() {
        console.log("cierro el dialog");
        $mdDialog.cancel();
      };
      
      this.aceptar = function(answer) {
        //acaba el request con el post y recargar la lista
        $http.post('/devices',this.entity).then(function(response){
          console.log(self);
          console.log("ok POST");
          $mdDialog.cancel();
          self.getDevices();
        }, function(err){
          console.log("Err: POST");
          console.log(err);
          $mdDialog.cancel();
          self.getDevices();
        });
      };
    }

    this.deleteDevice = function(device){
      $http.delete('/devices/'+device.id).then(function(response){
        console.log(response);
        self.getDevices();
      }, function(err){
        console.log(err);
      });
    }

    this.getDevices = function(){
      $http.get('/devices').then(function(response){
      self.entity = response.data;
      console.log(response);
      }, function(err){
        console.log(err);
      });  
    }
    this.getDevices();
    
  }]);
