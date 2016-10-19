/*ESTADOS*/
'use strict';

/**
 * @ngdoc function
 * @name hBwebApp.controller:StateCtrl
 * @description
 * # StateCtrl configuracion de estados
 * Controller of the hBwebApp
 */
angular.module('hBwebApp')
  .controller('StateCtrl',["$scope","$http","$mdDialog","$mdMedia", function ($scope,$http,$mdDialog,$mdMedia) {
    this.entity = [];
    var self = this;
    console.log("estoy en Zone");

    this.status = '  ';
    this.customFullscreen = false;

    this.showAdvanced = function(ev) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      $mdDialog.show({
        controller: DialogController,
        controllerAs: 'vmDialog',
        templateUrl: '../views/partials/state.create.html',
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

    this.getState = function(){
    	$http.get('/state').then(function(response){
        self.entity = response.data;
        console.log(response);
      }, function(err){
        console.log(err);
      });
    }
    this.getState();
    this.deleteState = function(state){
      $http.delete('/state/'+state.nombre).then(function(response){
        console.log(response);
        self.getState();
      }, function(err){
        console.log(err);
      });
    }

    function DialogController($scope, $mdDialog) {
    	var that = this;
      this.hide = function() {
        $mdDialog.hide();
      };
      
      this.cancel = function() {
        console.log("cierro el dialog");
        $mdDialog.cancel();
      };
      
      this.aceptar = function(answer) {
        //acaba el request con el post y recargar la lista
         $http.post('/state',this.entity).then(function(response){
          console.log(self);
          console.log("ok POST");
          $mdDialog.cancel();
          self.getState();
        }, function(err){
          console.log("Err: POST");
          console.log(err);
          $mdDialog.cancel();
          self.getState();
        });
      };

      this.getZone = function(){
        $http.get('/zone').then(function(response){
          that.areas = response.data;
          console.log(response);
        }, function(err){
          console.log(err);
        });  
      };
      this.getZone();

      this.getDevicesForZona = function(){
      	console.log(that.entity.zona);
      	$http.get('/devicesForZona/'+that.entity.zona).then(function(response){
          that.devicesForZona = response.data;
          console.log(response);
        }, function(err){
          console.log(err);
        });
      }

    }


  }]);