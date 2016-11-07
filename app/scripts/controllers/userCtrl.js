/* USER y PROFILES*/


angular.module('hBwebApp')
  .controller('UserCtrl', ["$scope","$http","$mdDialog","$mdMedia", function ($scope,$http,$mdDialog,$mdMedia) {
    this.entity = [];
    var self = this;
    console.log("estoy en User");

    this.status = '  ';
    this.customFullscreen = false;

    this.showAdvanced = function(ev , edit) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      $mdDialog.show({
        controller: DialogController,
        controllerAs: 'vmDialog',
        templateUrl: '../views/partials/user.create.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals:{
          selectedUser: this.selectedUser,
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

    function DialogController($scope, $mdDialog, selectedUser,put) {
    	var that = this;
      this.put = put;
      if(selectedUser !== undefined && this.put){
       this.entity = angular.copy(selectedUser);
      }else{
        this.entity = {};   
      }
    	
	    this.hide = function() {
	        $mdDialog.hide();
	    };
	      
	    this.cancel = function() {
	        console.log("cierro el dialog");
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
        $http.post('/user',this.entity).then(function(response){
            console.log(self);
            console.log("ok POST");
            $mdDialog.cancel();
            self.getUser();
          }, function(err){
            console.log("Err: POST");
            console.log(err);
            $mdDialog.cancel();
            self.getUser();
          });
      };

      this.saveUpdate = function(){
        $http.put('/user/'+this.entity.dni,this.entity).then(function(response){
            console.log(self);
            console.log("ok PUT");
            $mdDialog.cancel();
            selectedUser = undefined;
            self.getUser();
          }, function(err){
            console.log("Err: PUT");
            console.log(err);
            $mdDialog.cancel();
            self.getUser();
          });
      };

	    this.generateTc = function(){
	    	$http.get('/tc').then(function(response){
	          that.entity.tc = response.data;
	          console.log(response);
	        }, function(err){
	          console.log(err);
	        });
	    };

	    this.getRoles = function(){
	        $http.get('/roles').then(function(response){
	          that.roles = response.data;
	          console.log(response);
	        }, function(err){
	          console.log(err);
	        });  
	    };
	    this.getRoles();
    }

    this.deleteUser = function(user){
      $http.delete('/user/'+user.dni).then(function(response){
        console.log(response);
        self.selectedUser = undefined;
        self.getUser();
      }, function(err){
        console.log(err);
      });
    }

    this.getUser = function(){
      $http.get('/user').then(function(response){
        self.entity = response.data;
        console.log(response);
      }, function(err){
        console.log(err);
      });
      console.log("getUser");  
    };
    this.getUser(); 

    this.selectUser = function(user){
    	this.selectedUser = user;
    }
    
  }]);