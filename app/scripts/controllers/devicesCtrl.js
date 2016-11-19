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

    this.addDevices = function(ev,edit) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      $mdDialog.show({
        controller: DialogController,
        controllerAs: 'vmDialog',
        templateUrl: '../views/partials/devices.create.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals:{
          selectedDevice: this.selectedDevice,
          put: edit
        },
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

    this.deleteDevice = function(device){
      $http.delete('/devices/'+device.id).then(function(response){
        console.log(response);
        self.selectedDevice = undefined;
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
    /*
    *
    *Controller para el model Dialog
    */
    function DialogController($scope, $mdDialog,selectedDevice,put) {
      var that = this; 
      this.put = put;
      if(selectedDevice !== undefined && this.put){
       this.entity = angular.copy(selectedDevice);
      }else{
        this.entity = {};   
      }
      
      this.hide = function() {
        $mdDialog.hide();
      };
      
      this.cancel = function(deviceForm) {
        console.log("cierro el dialog");
        console.log(deviceForm);
        this.entity = {};
        $mdDialog.cancel();
      };
      
      this.aceptar = function(answer) {
          //acaba el request con el post y recargar la lista
          this.save();
          console.log("btn Acpetar");
      };

      this.save = function(){
        if (this.put){
          this.saveUpdate();
        }else{
          this.saveCreate();
        }
      };

      this.saveCreate = function(){
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

      this.saveUpdate = function(){
        $http.put('/devices/'+this.entity.id,this.entity).then(function(response){
            console.log(self);
            console.log("ok PUT");
            $mdDialog.cancel();
            selectedDevice = undefined;
            self.getDevices();
          }, function(err){
            console.log("Err: PUT");
            console.log(err);
            $mdDialog.cancel();
            self.getDevices();
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

      this.getTypeDevices = function(){
        $http.get('/typeDevices').then(function(response){
          that.tipoDevices = response.data;
          console.log(response);
        }, function(err){
          console.log(err);
        });  
      };
      this.getTypeDevices();

      this.clearInput = function(){
          if(this.entity.Wifi){
            this.entity.pin = undefined;
          }else{
            this.entity.nombreWifi = undefined;
          }
      }

    }

    this.selectDevice = function(device){
      this.selectedDevice = device;
    }

  }]);
