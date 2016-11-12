'use strict';

/**
 * @ngdoc overview
 * @name hBwebApp
 * @description
 * # hBwebApp
 *
 * Main module of the application.
 */
angular
  .module('hBwebApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngMaterial',
    'ui.router'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/HomeBerry");
    $stateProvider
        .state('main', {
            abstract: true,
            url: "/HomeBerry",
            views:{
                "navBar":{
                  templateUrl: "../views/navBar.html",
                  controller: "NavBarCtrl"
                },
                "":{
                  templateUrl: "../views/main.html",
                  controller: "MainCtrl"
                },
                "footer": {
                  templateUrl: "../views/footer.html"
                }
            } 
        })
        .state('login', {
            url: "/login",
            views:{
                "":{
                  templateUrl: "../views/oauth/logIn.html",
                  controller: "OauhtCtrl",
                  controllerAs: "vm"
                }
            } 
        })
        .state('main.home', {
          url: '',
          views: {
              '@main': {
                  templateUrl: "../views/home.html",
                  controller: "HomeCtrl",
                  controllerAs: "vm"
              }
            }
          })
        .state('main.devices', {
          url: '/devices',
          views: {
              '@main': {
                  templateUrl: "../views/devices.html",
                  controller: "DevicesCtrl",
                  controllerAs: "vm"
              }
            }
          })
        .state('main.user', {
          url: '/user',
          views: {
              '@main': {
                  templateUrl: "../views/user.html",
                  controller: "UserCtrl",
                  controllerAs: "vm"
              }
            }
          })
        .state('main.config', {
          url: '/config',
          views: {
              '@main': {
                  templateUrl: "../views/config.html",
                  controller: "ConfigCtrl",
                  controllerAs: "vm"
              }
            }
          })
        .state('main.state', {
          url: '/state',
          views: {
              '@main': {
                  templateUrl: "../views/state.html",
                  controller: "StateCtrl",
                  controllerAs: "vm"
              }
            }
          })
        .state('main.zone', {
          url: '/zones',
          views: {
              '@main': {
                  templateUrl: "../views/zone.html",
                  controller: "ZonesCtrl",
                  controllerAs: "vm"
              }
            }
          })
        .state('main.manual', {
          url: '/manual',
          views: {
              '@main': {
                  templateUrl: "../views/manual.html",
                  controller: "ManualCtrl",
                  controllerAs: "vm"
              }
            }
          })
        .state('main.about', {
          url: '/acercade',
          views: {
              '@main': {
                  templateUrl: "../views/about.html",
                  controller: "AboutCtrl",
                  controllerAs: "vm"
              }
            }
          });
  });
