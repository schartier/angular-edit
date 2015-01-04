/**
 @toc
 1. setup - whitelist, appPath, html5Mode
 */

'use strict';

angular.module('myApp', [
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngAnimate',
    'sc.edit'])
        .config(['$routeProvider', '$locationProvider', '$compileProvider',
            function ($routeProvider) {
                $routeProvider.when('/', {
                    templateUrl: '/pages/home/home.html'
                }).otherwise({
                    redirectTo: '/'
                });
            }]);