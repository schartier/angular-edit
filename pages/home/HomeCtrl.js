/**
*/

'use strict';

angular.module('myApp').controller('HomeCtrl', ['$scope', function($scope) {
        $scope.text = "";
        $scope.textArea = "";
        
        $scope.isInvalid = function(data){
          return data;
        };
        
        $scope.isValid = function(data) {
          return undefined;
        };
}]);