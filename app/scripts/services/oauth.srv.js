'use strict';

/**
 * @ngdoc function
 * @name hBwebApp.services:OauthSrv
 * @description
 * # OauthSrv
 * Service of the hBwebApp
 */
angular.module('hBwebApp').
	service('OauthSrv',function($scope) {
		return {
		
		logIn : function(){
			conole.log('logIn');
		},

		saveToken : function(){
			conole.log('saveToken');
		},

		getToken : function(){
			conole.log('getToken');
		},

		reDirectLogIn : function(){
			conole.log('reDirectLogIn');
		},

		logOut : function(){},
		};
		

	});




