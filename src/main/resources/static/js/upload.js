var myApp = angular.module('myApp');

myApp.controller("landingCtrl", landingCtrl);
landingCtrl.$inject = ["$scope", "$rootScope", "$location", "NgTableParams", 
	'vbDataFactory', "$timeout", "$interval", "$filter", 'store'];

function landingCtrl($scope, $rootScope, $location, NgTableParams, vbDataFactory, $timeout, $interval, $filter,store) {
    $scope.init = function() {
    	console.log("hi");
    }

   

}









